### Câu A1 — 3 Cách Nhúng CSS

#### 1. Inline CSS (CSS nội tuyến)

* Ví dụ:

```html
<p style="color: red; font-size: 16px;">
    Hello World
</p>
```

* Ưu điểm:

  * Viết nhanh và đơn giản
  * Áp dụng trực tiếp lên phần tử
  * Có độ ưu tiên cao

* Nhược điểm:

  * Khó bảo trì khi dự án lớn
  * Không thể tái sử dụng
  * Làm code HTML khó đọc

* Khi nào nên dùng:

  * Test nhanh giao diện
  * Dùng JavaScript thay đổi style động
  * Chỉnh sửa tạm thời một phần tử

---

#### 2. Internal CSS (CSS nội bộ)

* Ví dụ:

```html
<head>
    <style>
        p {
            color: blue;
        }
    </style>
</head>
```

* Ưu điểm:

  * Quản lý CSS tập trung trong cùng file HTML
  * Có thể dùng selectors để style nhiều phần tử
  * Dễ viết hơn inline CSS

* Nhược điểm:

  * Không tái sử dụng được cho nhiều trang
  * File HTML sẽ dài hơn nếu CSS nhiều

* Khi nào nên dùng:

  * Website chỉ có 1 trang
  * Demo giao diện nhanh
  * Landing page đơn giản

---

#### 3. External CSS (CSS bên ngoài)

* Ví dụ:

```html
<link rel="stylesheet" href="style.css">
```

* Ưu điểm:

  * Tách riêng HTML và CSS
  * Dễ bảo trì và chỉnh sửa
  * Có thể tái sử dụng cho nhiều trang
  * Trình duyệt có thể cache giúp tải nhanh hơn

* Nhược điểm:

  * Cần tải thêm file CSS riêng
  * Nếu file CSS lỗi thì giao diện có thể bị mất style

* Khi nào nên dùng:

  * Hầu hết các dự án thực tế
  * Website nhiều trang
  * Dự án cần bảo trì lâu dài

---

### Câu hỏi thêm

Nếu cùng một phần tử có cả Inline CSS, Internal CSS và External CSS cùng áp dụng thì:

**Inline CSS sẽ được ưu tiên cao nhất.**

Ví dụ:

```html
<p style="color: red;">Hello</p>
```

```css
p {
    color: blue;
}
```

Kết quả cuối cùng chữ sẽ có màu đỏ.

Lý do:
Inline CSS được áp dụng trực tiếp lên phần tử HTML nên có specificity cao hơn Internal CSS và External CSS.
