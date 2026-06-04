# Synthesis — Từ Evidence Đến Build Slice

> Dựa trên evidence-pack.md. Mục tiêu: chốt 1 build slice đủ nhỏ để build LEVEL 3 trong Day 06.

## 1. Gom evidence thành cụm (theo workflow/pain)

- **"Không biết chọn gói/resort nào"** ← self-use (form chỉ hỏi điểm đến/ngày). ⭐ pain chính
- **"Không hiểu gói gồm gì / vì sao chênh giá"** ← self-use + E1 (mua All-inclusive vẫn bị tính phí, Trish28 1★) + E4 (dịch vụ ngoài gói bị tính thêm / áp Published Price) + E5 (value gói). ⭐ củng cố pain chính
- **"Thao tác lỗi giữa chừng (check-in/điểm thưởng)"** ← E2 (check-in "Load mãi không xong", MunJun.777 3★), E6 (VPoint lỗi). → failure path.
- **"Đặt rồi mới biết không hủy được / dịch vụ không khớp"** ← E3 (không hủy được), E7 (đưa đón & tên booking lỗi, shafizahs2017 2★), E6 (VPoint) → trust/recovery, cần nói rõ điều kiện TRƯỚC khi quyết.
- **"Online check-in lỗi, vẫn phải chờ"** ← E2. → backlog (ngoài slice chọn gói).

## 2. Insight

```text
User lần đầu lên kế hoạch nghỉ dưỡng Vinpearl không chỉ cần danh sách khách sạn/ưu đãi.
Họ thật ra cần hỗ trợ ra quyết định có thể tin được — biết gói nào hợp nhu cầu và vì sao,
vì cả self-use lẫn review đều cho thấy họ phải tự đọc nhiều gói, dễ overload và bỏ dở booking.
```

## 3. Opportunity

```text
Cơ hội là dùng AI để augment bước chọn gói:
hỏi nhanh 3-4 câu (đi với ai, ngân sách, mục đích, ràng buộc) rồi gợi ý 2-3 gói phù hợp kèm lý do,
giúp user quyết nhanh và tự tin,
trong khi vẫn để user là người quyết cuối (không tự đặt/thanh toán) và xử lý case AI không chắc.
```

## 4. Build slice — qua 5 câu hỏi

| Câu hỏi | Đạt? | Cụ thể |
|---|---|---|
| User cụ thể chưa? | ✅ | Khách lần đầu đi Vinpearl, nhu cầu mơ hồ, đang ở bước chọn gói |
| Task đủ hẹp chưa? | ✅ | Chỉ làm "intake → gợi ý gói", demo 3-5 phút |
| AI decision rõ chưa? | ✅ | AI xếp hạng & giải thích 2-3 gói từ tiêu chí user nhập |
| Failure path rõ chưa? | ✅ | Khi nhu cầu mâu thuẫn/ngân sách quá thấp → AI nói "chưa chắc", hỏi lại, không bịa gói |
| Có evidence không? | ✅ | Self-use + review + competitor pattern |

## 5. Quyết định: giữ / giảm scope / đổi hướng

→ **Giữ domain, cắt xuống một flow** (intake → gợi ý gói). Vì dính tiền + booking → chọn **Augmentation** (không tự đặt). Backlog phần thanh toán, check-in, lịch trình.

## 6. Câu chốt

```text
Dựa trên self-use (form không hỏi nhu cầu) + review (khó chọn gói, deal lỗi) + competitor (Booking/Hopper hỏi tiêu chí trước),
nhóm sẽ build prototype "AI gợi ý gói nghỉ dưỡng có giải thích",
cho khách lần đầu đi Vinpearl với nhu cầu mơ hồ,
để giải quyết pain "không biết chọn gói nào và vì sao",
bằng cách AI augment: hỏi 3-4 câu rồi đề xuất 2-3 gói kèm lý do,
và sẽ test failure path: nhu cầu mâu thuẫn / ngân sách quá thấp / deal không khả dụng.
```

## 7. Backlog (KHÔNG build Day 06)

- Thanh toán & đặt phòng thật.
- Online check-in, quản lý lịch trình.
- Tích hợp dữ liệu giá/tồn phòng real-time của Vinpearl.
- Đa ngôn ngữ, tài khoản VinClub.
