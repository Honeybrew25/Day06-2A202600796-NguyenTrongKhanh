# Thin SPEC — MyVinpearl AI Trip Package Advisor

> Bản cam kết để build ngay Day 06. Mục tiêu chấm: LEVEL 3 (working prototype, input → AI → output, demo live).

## 1. Track, product/app và user

**Track:** Travel & Hospitality
**Product/app thật:** MyVinpearl / Vinpearl booking (`vinpearl.com`, `booking.vinpearl.com`)
**User cụ thể:** Khách lần đầu lên kế hoạch nghỉ dưỡng Vinpearl, biết đại khái muốn đi nhưng chưa biết chọn điểm đến/resort/combo nào, ngân sách khoảng X.
**Nhóm có phải user thật không?** Gần đúng — là người dùng tiềm năng, đã tự dùng app/web. Khác: chưa từng đặt & ở thật full chu kỳ, nên dựa thêm review ngoài nhóm.

## 2. Evidence summary

| Evidence | Nguồn | User/pain nói lên điều gì? | SPEC phải đổi gì? |
|---|---|---|---|
| Form chỉ hỏi điểm đến/ngày/phòng/khách | Self-use `image.png` | User mơ hồ không được dẫn dắt | Slice = thêm bước hỏi nhu cầu |
| Nhiều ưu đãi/combo, giá khó so sánh (dịch vụ ngoài gói bị tính thêm) | Self-use `image-1/2/3.png` + E4 | Decision fatigue, mất trust | AI phải giải thích lý do & giá |
| "Check in online Load mãi không xong. Chịu luôn" — MunJun.777, 3★ | App Store, screenshot `image-5.png` (E2) | Thao tác lỗi giữa chừng, recovery kém | Thêm failure path + fallback |

## 3. Pain statement

```text
Khách lần đầu đi Vinpearl đang gặp khó ở bước chọn gói/resort/combo,
vì hệ thống chỉ yêu cầu nhập thông tin cứng (điểm đến, ngày, phòng, khách) thay vì hỏi nhu cầu ra quyết định,
dẫn tới phải tự đọc nhiều gói, overload, chọn sai hoặc bỏ dở booking.
Bằng chứng chính là self-use (form không hỏi nhu cầu) + E4 (Static vs Package Rate khó hiểu) + E2 (review App Store check-in lỗi) + E3 (Tripadvisor không hủy được phòng).
```

## 4. Build slice

```text
Cho khách lần đầu đi Vinpearl đang ở bước chọn gói nghỉ dưỡng,
prototype sẽ dùng AI để augment: hỏi 3-4 câu (đi với ai, ngân sách, mục đích, ràng buộc),
tạo ra 2-3 gợi ý gói kèm lý do phù hợp, quyền lợi chính và điều kiện cần lưu ý,
và xử lý failure mode (nhu cầu mâu thuẫn / ngân sách quá thấp / deal không khả dụng)
bằng cách hỏi lại hoặc gợi ý gói thay thế cùng tầm, không bịa.
```

## 5. Auto/Aug decision

- [x] **Augmentation:** AI gợi ý/draft/phân loại, user quyết cuối.

**Lý do chọn:** Liên quan tiền + đặt phòng + thông tin giá/tồn thật → AI sai sẽ gây hậu quả tài chính & mất niềm tin. AI chỉ tư vấn, user bấm quyết.
**Human role:** decider (user là người chọn & đặt cuối).

## 6. Four paths

| Path | Prototype phải thể hiện gì? |
|---|---|
| **Happy** | User trả lời 4 câu (gia đình 4 người, ~6tr, nghỉ dưỡng + vui chơi, có trẻ em) → AI trả 3 gói có lý do rõ → user chọn 1 |
| **Low-confidence** | User trả lời mơ hồ ("chưa biết ngân sách", "đi đâu cũng được") → AI hỏi lại 1 câu chốt thay vì gợi ý bừa |
| **Failure** | Ngân sách quá thấp / yêu cầu mâu thuẫn (muốn 5★ + giá rẻ nhất + gần mọi nơi) → AI nói rõ "chưa khớp gói nào", đề xuất nới tiêu chí; hoặc deal không khả dụng → gợi ý gói thay thế cùng tầm |
| **Correction** | User sửa tiêu chí ("rẻ hơn", "thêm Safari", "ít di chuyển") → AI cập nhật gợi ý + giải thích vì sao gói mới hợp hơn |

## 7. Failure mode nguy hiểm nhất

```text
Nếu user nhập tiêu chí mơ hồ/mâu thuẫn (vd "5 sao nhưng rẻ nhất, gần tất cả"),
AI có thể bịa một gói không tồn tại hoặc gợi ý tự tin nhưng sai giá/quyền lợi,
hậu quả là user đặt nhầm, mất tiền và mất niềm tin vào Vinpearl.
Prototype sẽ xử lý bằng: chỉ chọn từ danh sách gói cho trước (không bịa), nếu không khớp thì nói rõ + hỏi lại / nới tiêu chí (ask again + fallback), và luôn hiện điều kiện gói.
Owner kiểm thử path này là Nguyễn Trọng Khánh.
```

## 8. Owner plan cho sáng Day 06

| Thành viên | Việc phụ trách | Bằng chứng cần có trong repo |
|---|---|---|
| Nguyễn Trọng Khánh | Research / evidence | `02-group-spec/evidence-pack.md` + 2 review thật có link |
| Nguyễn Trọng Khánh | SPEC | `02-group-spec/thin-spec.md` (file này) |
| Nguyễn Trọng Khánh | Prototype | `03-prototype/` chạy được input → AI → output |
| Nguyễn Trọng Khánh | Test / failure path | Ảnh/log demo 4 paths, đặc biệt Failure |
| Nguyễn Trọng Khánh | Demo script / repo | `03-prototype/README.md` + narrative demo |
