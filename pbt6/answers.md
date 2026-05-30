# PHẦN A + C — Bootstrap 5 (Track A)

---

## PHẦN A — ĐỌC HIỂU

### Câu A1 (10đ) — Grid System

**Bảng layout ở 3 kích thước:**

| Kích thước | < 768px | 768px – 991px | ≥ 992px |
|---|---|---|---|
| Class áp dụng | `col-12` | `col-md-6` | `col-lg-3` |
| Số cột mỗi box chiếm | 12/12 | 6/12 | 3/12 |
| Box layout | 1 cột (xếp dọc) | 2 cột (2 hàng × 2 box) | 4 cột (1 hàng) |

**`col-md-6` nghĩa là gì?**

`col-md-6` có nghĩa là: từ breakpoint `md` (≥ 768px) trở lên, mỗi element chiếm 6 trong tổng 12 cột của Bootstrap Grid → 2 element mỗi hàng.

Bootstrap Grid là hệ thống 12 cột. `6/12 = 50%` chiều rộng.

**Tại sao không cần viết `col-sm-12`?**

Bootstrap 5 dùng triết lý **mobile-first**:
- `col-12` nghĩa là chiếm 12 cột ở **mọi** kích thước (mặc định)
- `col-md-6` sẽ **ghi đè** lên từ `md` trở lên
- Viết thêm `col-sm-12` là thừa vì `col-12` đã bao phủ màn hình nhỏ rồi

---

### Câu A2 (10đ) — Utilities & Components

**1. `d-none d-md-block` — hiển thị khi nào, ẩn khi nào?**

- `d-none` → `display: none` áp dụng cho mọi kích thước (ẩn hoàn toàn)
- `d-md-block` → từ breakpoint `md` (≥ 768px) trở lên: `display: block`

**Kết quả:**
- Màn hình < 768px (mobile): **ẩn**
- Màn hình ≥ 768px (tablet, desktop): **hiện**

Ứng dụng thực tế: ẩn menu ngang trên mobile, chỉ hiện hamburger button.

---

**2. 5 spacing utilities:**

| Class | CSS tương đương | Giải thích |
|---|---|---|
| `mt-3` | `margin-top: 1rem` | Khoảng cách trên, size 3 = 1rem = 16px |
| `px-4` | `padding-left + padding-right: 1.5rem` | Padding ngang (x-axis), size 4 = 1.5rem |
| `mb-auto` | `margin-bottom: auto` | Đẩy element xuống cuối, thường dùng trong flexbox |
| `py-2` | `padding-top + padding-bottom: 0.5rem` | Padding dọc (y-axis), size 2 = 0.5rem |
| `ms-3` | `margin-left: 1rem` | Margin phía start (trái), `s` = start (tương thích RTL) |

**Quy tắc đặt tên:**
- Chữ đầu: `m` (margin) hoặc `p` (padding)
- Chữ sau: `t` top, `b` bottom, `s` start/left, `e` end/right, `x` ngang, `y` dọc
- Con số: `0`=0px, `1`=4px, `2`=8px, `3`=16px, `4`=24px, `5`=48px

---

**3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`:**

| Class | Hành vi | Khi nào dùng |
|---|---|---|
| `.container` | Có `max-width` theo từng breakpoint (576/768/992/1200/1400px), căn giữa với margin auto | Layout thông thường, không muốn nội dung quá rộng |
| `.container-fluid` | Luôn `width: 100%`, không có max-width | Full-width layouts, hero sections, backgrounds |
| `.container-md` | `width: 100%` dưới 768px, có `max-width` từ 768px trở lên | Muốn full-width trên mobile, có giới hạn trên desktop |

---

## PHẦN C — PHÂN TÍCH

### Câu C1 (10đ) — Tùy biến Bootstrap

**1. Đổi màu `$primary` sang `#E63946` — Quy trình:**

Cần dùng **SASS/SCSS** (Node.js + npm):

```
Bước 1: Cài đặt
npm install bootstrap sass

Bước 2: Tạo file custom.scss
// Override TRƯỚC khi import Bootstrap
$primary: #E63946;
$primary-hover: #c1121f;

// Import Bootstrap sau
@import "node_modules/bootstrap/scss/bootstrap";

Bước 3: Compile
sass custom.scss custom.css

Bước 4: Dùng file custom.css thay vì bootstrap.min.css
```

Bootstrap sẽ tự động tính toán lại tất cả màu liên quan (hover, focus, text contrast...).

---

**2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }`?**

| Vấn đề | Override CSS thường | Dùng SASS variables |
|---|---|---|
| Hover state | Phải tự ghi `.btn-primary:hover` | Bootstrap tự tính |
| Focus ring | Phải tự ghi `:focus` | Bootstrap tự tính |
| Disabled state | Phải tự ghi `:disabled` | Bootstrap tự tính |
| Text contrast | Phải tự kiểm tra | Bootstrap tự chọn chữ trắng/đen |
| Components khác | Alert, Badge, Progress... không đổi | Toàn bộ ecosystem đổi theo |
| Specificity wars | Có thể bị ghi đè lại | Compile ra CSS gốc, không conflict |

Kết luận: Override CSS thường chỉ đổi **một chỗ**, còn SASS variable đổi **toàn bộ hệ thống** nhất quán.

---

### Câu C2 (10đ) — So sánh CSS thuần vs Bootstrap

**Navbar responsive:**

| Tiêu chí | CSS thuần | Bootstrap |
|---|---|---|
| Số dòng CSS | ~80–120 dòng | 0 dòng (dùng class) |
| Số dòng HTML | ~20 dòng | ~25 dòng (thêm classes) |
| Thời gian viết | ~30–45 phút | ~10 phút |
| Hamburger menu JS | Phải tự viết | Có sẵn với `data-bs-toggle` |

**Product card:**

| Tiêu chí | CSS thuần | Bootstrap |
|---|---|---|
| Số dòng CSS | ~40–60 dòng | 0–5 dòng (chỉ custom màu/ảnh) |
| Hover effect | Phải tự viết transition | `shadow-sm` + custom hover |
| Thời gian viết | ~20 phút | ~5 phút |

---

**Khả năng tùy biến:**

- **CSS thuần:** Tùy biến 100%, không bị ràng buộc bởi convention
- **Bootstrap:** Tùy biến tốt nếu dùng SASS, khó nếu chỉ override CSS

---

**Khi nào NÊN dùng Bootstrap?**

✅ Dự án cần ra nhanh (MVP, prototype, hackathon)
✅ Team không có designer chuyên nghiệp
✅ Dashboard/admin panel nội bộ
✅ Dự án nhiều form, table, modal phức tạp

**Khi nào KHÔNG NÊN dùng Bootstrap?**

❌ Landing page cần thiết kế riêng biệt, độc đáo
❌ Dự án cần file CSS rất nhỏ (Bootstrap ~30KB gzipped)
❌ Khi design system công ty đã có sẵn
❌ Muốn học CSS để hiểu sâu — Bootstrap ẩn quá nhiều thứ
