---
marp: true
theme: default
paginate: true
size: 16:9
header: 'MyVinpearl · AI Trip Package Advisor'
footer: 'Nguyễn Trọng Khánh · 2A202600796 · Track Travel & Hospitality'
style: |
  section { font-size: 26px; }
  h1 { color: #065d50; }
  h2 { color: #0a7d6b; }
  strong { color: #b4621a; }
  table { font-size: 22px; }
  code { background: #eef5f3; }
---

<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 🌴 MyVinpearl — AI Gợi Ý Gói Nghỉ Dưỡng

### Augment bước chọn gói cho khách lần đầu đi Vinpearl

**Nguyễn Trọng Khánh · 2A202600796**
Track: Travel & Hospitality
App mổ: MyVinpearl / `vinpearl.com` / `booking.vinpearl.com`

<!-- Chào, giới thiệu 1 câu: "Em mổ MyVinpearl và build một slice AI giúp khách chọn đúng gói nghỉ dưỡng." -->

---

## Vấn đề: khách mơ hồ không biết chọn gói nào

- Form booking chỉ hỏi **điểm đến / ngày / phòng / khách** — không hỏi *mục đích, ngân sách, nhóm đi*.
- Khách lần đầu đi Vinpearl bị **đẩy hàng chục gói/ưu đãi**, tự đọc, tự so sánh.
- Hậu quả: **decision fatigue → chọn sai gói hoặc bỏ dở booking**, và *mất niềm tin* khi giá/quyền lợi không như tưởng.

> Đây không phải lỗi UI đẹp/xấu — là thiếu **hỗ trợ ra quyết định**.

<!-- Nhấn: pain là decision support + trust, không phải thẩm mỹ. -->

---

## Evidence thật (không phải giả định)

| # | Bằng chứng | Nguồn |
|---|---|---|
| E1 | Mua gói "All-inclusive" **vẫn bị tính phí mọi thứ** (Trish28, 1★, 12/2025) | Tripadvisor |
| E2 | "Check in online **Load mãi không xong**. Chịu luôn" (MunJun.777, 3★) | App Store |
| E3 | "**Không hủy được** booking, không hoàn tiền" (Артем Г, 2★) | Tripadvisor |
| E4 | Dịch vụ **ngoài Room Package bị tính thêm** / áp Published Price | Vinpearl T&C |
| E7 | Đưa đón & **tên booking lỗi** ở sân bay (shafizahs2017, 2★) | Tripadvisor |

→ Khách **không hiểu gói gồm gì & vì sao giá đổi**.

<!-- 4/7 evidence có quote verbatim + screenshot thật. -->

---

## Insight & Cơ hội

**Insight**
> Khách không chỉ cần *danh sách gói*. Họ cần **hỗ trợ ra quyết định tin được** — biết gói nào hợp nhu cầu và *vì sao*.

**Opportunity**
> Dùng AI để **augment**: hỏi nhanh 3–4 câu → gợi ý 2–3 gói kèm lý do, quyền lợi, điều kiện — thu hẹp quyết định thay vì bắt khách tự đọc tất cả.

---

## Quyết định thiết kế: Augmentation

- ✅ **Augmentation** — AI tư vấn, **khách quyết cuối** (không tự đặt/thanh toán).
- Lý do: dính **tiền + booking + giá/tồn thật** → AI sai gây hậu quả tài chính & mất niềm tin.
- Human role: **decider**.

**Chống bịa**: AI chỉ được chọn `package_id` từ **catalog cho sẵn** → không bao giờ bịa gói/giá.

---

## 4 Paths

| Path | Prototype thể hiện |
|---|---|
| **Happy** | 4 câu rõ → AI gợi ý 2–3 gói + lý do + % phù hợp |
| **Low-confidence** | Input mơ hồ → AI **hỏi lại 1 câu chốt**, không đoán bừa |
| **Failure** | Yêu cầu bất khả thi (5★ + <2tr) → AI báo **chưa khớp** + cách nới |
| **Correction** | Bấm "rẻ hơn / thêm Safari" → AI cập nhật + giải thích |

---

## DEMO LIVE 🎬

**Mở `03-prototype/index.html` → dán key → bấm 4 preset:**

1. 👨‍👩‍👧‍👦 Gia đình Phú Quốc → **Happy** (PQ-FAM, NHA-FAM)
2. 🤔 Mơ hồ → **Low-confidence** (AI hỏi ngân sách)
3. ⚠️ Mâu thuẫn → **Failure** (no_match, không bịa)
4. 💸 Tiết kiệm → **recommend** + chip "rẻ hơn" → **Correction**

<!-- Đây là phần chính ~3–4 phút. Chạy thật, đừng chỉ nói. Nếu mạng lỗi, có ảnh chụp dự phòng. -->

---

## Failure mode nguy hiểm nhất & cách xử lý

> Nếu khách nhập tiêu chí **mơ hồ/mâu thuẫn**, AI có thể **bịa gói** hoặc gợi ý sai giá → khách đặt nhầm, mất tiền, mất niềm tin.

**Mitigation đã build & test:**
- Chỉ chọn từ catalog cố định (forced tool use) → **0 ID bịa**.
- Không khớp → nói rõ + hỏi lại / nới tiêu chí.
- Lệch nhẹ → vẫn gợi ý gói gần nhất **kèm cảnh báo** (giống Booking).

---

## Bằng chứng prototype chạy thật

`test-api.mjs` gọi OpenAI API thật cho cả 4 kịch bản:

```
✔ 6 gói, 4 preset, tool="present_advice"
Happy          → recommend (PQ-FAM, NHA-FAM)  ✅
Low-confidence → ask_followup                 ✅
Failure        → no_match                     ✅
Tiết kiệm      → recommend (NT-ECO, NT-FAM)   ✅
=== 4 PASS, 0 cần xem ===
```

**Mọi `package_id` đều hợp lệ — không bịa.**

---

## Backlog (không build trong 1 ngày)

- Nối **giá/tồn phòng real-time** của Vinpearl.
- Thanh toán & đặt phòng thật, online check-in, quản lý lịch trình.
- Tài khoản VinClub / VPoint, đa ngôn ngữ.
- Đưa key ra **backend proxy** (production không để lộ key ở browser).

---

<!-- _paginate: false -->

# Tóm lại

Dựa trên **evidence thật** (review + T&C Vinpearl),
build slice **AI hỏi nhu cầu → gợi ý gói có lý do**,
cho **khách lần đầu đi Vinpearl**,
giải quyết pain **"không biết chọn gói nào & vì sao"**,
bằng **Augmentation** (khách quyết cuối),
test **failure path: chống bịa + nới tiêu chí**.

### Cảm ơn — Q&A 🙏
