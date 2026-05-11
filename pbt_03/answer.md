# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — 3 cách nhúng CSS

## 1. Inline CSS

Ví dụ:

```html
<p style="color: red;">Hello World</p>
Ưu điểm
Viết nhanh
Test nhanh style
Nhược điểm
Khó bảo trì
Không tái sử dụng được
HTML bị rối
Khi dùng
Test nhanh
Override tạm thời
2. Internal CSS

Ví dụ:

<head>
    <style>
        p {
            color: blue;
        }
    </style>
</head>
Ưu điểm
Dễ quản lý hơn inline
Không cần file riêng
Nhược điểm
Chỉ dùng cho 1 trang
HTML dài hơn
Khi dùng
Demo nhỏ
Bài tập đơn giản
3. External CSS

Ví dụ:

<link rel="stylesheet" href="style.css">
p {
    color: green;
}
Ưu điểm
Chuyên nghiệp
Dễ bảo trì
Tái sử dụng nhiều trang
Nhược điểm
Cần file riêng
Khi dùng
Website thật
Project lớn
Câu hỏi thêm

Nếu cùng 1 element có cả inline, internal và external CSS thì:

Thứ tự ưu tiên:
Inline CSS
Internal / External CSS
Browser default

Ví dụ:

<p style="color:red;">Hello</p>
p {
    color: blue;
}

Kết quả cuối cùng: red

Vì inline CSS có specificity cao hơn.