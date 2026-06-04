// Test harness cho prototype — gọi OpenAI API thật, dùng ĐÚNG SYSTEM_PROMPT/CATALOG/TOOL
// trích từ index.html (không sao chép tay → không lệch).
// Chạy:  $env:OPENAI_API_KEY="sk-..."; node test-api.mjs
// Không in/log API key.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error("❌ Chưa set OPENAI_API_KEY trong môi trường."); process.exit(1); }
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// --- Trích CATALOG, PRESETS, SYSTEM_PROMPT, TOOL từ index.html ---
const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
// Stub DOM để phần code top-level (getElementById, forEach...) chạy được trong Node.
const stubEl = () => new Proxy({ value: "", style: {} }, {
  get: (t, k) => k in t ? t[k] : (() => {}),
  set: (t, k, v) => (t[k] = v, true),
});
const sandbox = {
  document: { getElementById: stubEl, createElement: stubEl },
  localStorage: { getItem: () => null, setItem: () => {} },
  alert: () => {},
  console,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(script + "\n;globalThis.__x={CATALOG,PRESETS,SYSTEM_PROMPT,TOOL};", sandbox);
const { CATALOG, PRESETS, SYSTEM_PROMPT, TOOL } = sandbox.__x;
console.log(`✔ Trích được: ${CATALOG.length} gói, ${PRESETS.length} preset, tool="${TOOL.function.name}"\n`);

// --- Gọi API giống hệt callOpenAI() trong trang ---
async function callOpenAI(c) {
  const userMsg = `Nhu cầu khách:\n- Đi với ai: ${c.who||"(trống)"}\n- Ngân sách: ${c.budget||"(trống)"}\n- Mục đích: ${c.purpose||"(trống)"}\n- Ràng buộc: ${c.constraint||"(trống)"}`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": "Bearer " + KEY },
    body: JSON.stringify({
      model: MODEL, max_tokens: 1200,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: userMsg }],
      tools: [TOOL], tool_choice: { type: "function", function: { name: "present_advice" } },
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const call = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("Không có tool_call trong response");
  return JSON.parse(call.function.arguments);
}

// --- Kỳ vọng mode theo từng preset (theo nhãn) ---
const expect = { "happy": "recommend", "low-confidence": "ask_followup", "failure": "no_match", "Tiết kiệm": "recommend" };
const expectedFor = (label) => Object.entries(expect).find(([k]) => label.includes(k))?.[1] || null;

let pass = 0, fail = 0;
for (const p of PRESETS) {
  const exp = expectedFor(p.label);
  process.stdout.write(`▶ ${p.label}\n`);
  try {
    const out = await callOpenAI(p);
    const ids = (out.recommendations || []).map(r => r.package_id);
    const validIds = ids.every(id => CATALOG.some(c => c.id === id));
    let line = `   mode=${out.mode}`;
    if (out.mode === "recommend") line += ` · gói: ${ids.join(", ")}` + (validIds ? " ✔ hợp lệ" : " ❌ CÓ ID BỊA");
    if (out.mode === "ask_followup") line += ` · hỏi: "${out.followup_question}"`;
    if (out.mode === "no_match") line += ` · "${out.no_match_message}"`;
    const ok = (!exp || out.mode === exp) && validIds;
    console.log(line);
    console.log(`   kỳ vọng=${exp||"(bất kỳ)"} → ${ok ? "PASS ✅" : "CHECK ⚠️"}\n`);
    ok ? pass++ : fail++;
  } catch (e) {
    console.log(`   ❌ Lỗi: ${e.message}\n`);
    fail++;
  }
}
console.log(`=== Kết quả: ${pass} PASS, ${fail} cần xem (trên ${PRESETS.length} kịch bản) ===`);
