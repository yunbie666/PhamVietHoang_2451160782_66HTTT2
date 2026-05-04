## Câu A1

### 1 — Các bước khi truy cập website

**Bước 1: DNS lookup**
Trình duyệt tìm địa chỉ IP của tên miền shopee.vn

**Bước 2: Thiết lập kết nối TCP**
Tạo kết nối giữa máy người dùng và server (3-way handshake)

**Bước 3: TLS Handshake**
Thiết lập kết nối bảo mật (HTTPS, mã hóa dữ liệu)

**Bước 4: Gửi HTTP request**
Trình duyệt gửi yêu cầu (GET) đến server

**Bước 5: Server xử lý**
Server xử lý request (có thể truy vấn database)

**Bước 6: Trả về HTTP response**
Server trả về HTML, CSS, JS và status code

**Bước 7: Parse HTML**
Trình duyệt phân tích HTML và tạo DOM

**Bước 8: Tải tài nguyên phụ**
Tiếp tục tải CSS, JS, hình ảnh

**Bước 9: Tạo render tree**
Kết hợp DOM và CSS để dựng cấu trúc hiển thị

**Bước 10: Render trang**
Hiển thị nội dung hoàn chỉnh lên màn hình

**Tài liệu:** tuan_1_html5/01_introduction_html_universe.md - phần 1. Web hoạt động như thế nào?

### 2

![Network request](screenshots/a1.png)

---

## Câu A2

Theo chương 04, trang web bị Google đánh giá SEO thấp vì sử dụng tình trạng **"Div Soup"** (chỉ dùng thẻ `<div>` cho mọi thứ), khiến Google Bot và các công cụ hỗ trợ đọc (Screen Reader) không thể hiểu được cấu trúc và ý nghĩa của từng phần nội dung.

Một số lỗi semantic và cách sửa như sau:

**Lỗi 1:** Phần đầu trang dùng `<div class="header">`
→ Nên đổi thành `<header>` để đúng vai trò phần đầu trang

**Lỗi 2:** Khu vực menu dùng `<div class="menu">`
→ Nên thay bằng `<nav>` vì đây là phần điều hướng

**Lỗi 3:** Nội dung chính dùng `<div class="main">`
→ Nên đổi thành `<main>` để thể hiện nội dung chính của trang

**Lỗi 4:** Mỗi sản phẩm dùng `<div class="product">`
→ Nên dùng `<article>` vì đây là một nội dung độc lập

**Lỗi 5:** Phần cuối trang dùng `<div class="footer">`
→ Nên thay bằng `<footer>` để đúng semantic HTML5

**Tài liệu:** tuan_1_html5/04_visible_part_html.md

---

## Câu A3

![Network request](screenshots/a3.png)

Các thẻ `<div>` là dạng block
→ nghĩa là mỗi thẻ sẽ chiếm một dòng riêng, nên “Hộp 1”, “Hộp 2”, “Hộp 3” sẽ tự động xuống dòng

Các thẻ `<span>` và `<strong>` là dạng inline
→ nghĩa là chúng không xuống dòng, mà nằm chung trên một hàng

Cho nên là:
“Text A” và “Text B” nằm trong `<span>` nên đứng cùng một dòng
“Text C” và “Text D” cũng vậy, vẫn nằm trên cùng một dòng

`<strong>` chỉ làm chữ đậm chứ không làm xuống dòng

Các `<div>` thì luôn tách thành từng khối riêng

**Tài liệu:** tuan_1_html5/02_basic_structure_html.md

---

## Câu A4

Trong một bảng HTML, các thẻ này dùng để chia cấu trúc rõ ràng hơn:

* `<thead>`: là phần tiêu đề của bảng
  → thường chứa tên các cột (ví dụ: Tên, Giá, Mô tả)

* `<tbody>`: là phần nội dung chính của bảng
  → chứa dữ liệu thật của từng dòng

* `<tfoot>`: là phần tổng kết hoặc ghi chú cuối bảng
  → ví dụ: tổng tiền, ghi chú, trung bình

### 3 lý do KHÔNG NÊN dùng table để tạo layout trang web:

* Thứ nhất: Khó responsive
  → Table không linh hoạt trên điện thoại, hiển thị rất xấu khi co màn hình

* Thứ hai: Sai mục đích sử dụng
  → Table sinh ra để hiển thị dữ liệu dạng bảng, không phải để chia bố cục trang

* Thứ ba: Khó bảo trì code
  → Layout bằng table rất rối, sửa một chỗ dễ ảnh hưởng cả bố cục

* Thứ tư: SEO và accessibility kém hơn
  → Google và screen reader khó hiểu cấu trúc trang nếu lạm dụng table

---

## CÂU B3

**Lỗi 1:** Dòng 1 — DOCTYPE sai
→ Sửa: `<!DOCTYPE html>`

**Lỗi 2:** Dòng 2 — thiếu ngôn ngữ
→ Sửa: `<html lang="vi">`

**Lỗi 3:** Thiếu `</title>`

**Lỗi 4:** charset sai
→ Sửa: `UTF-8`

**Lỗi 5:** Sai thẻ `<h1>`

**Lỗi 6:** Sai thẻ `<a>`

**Lỗi 7:** Sai thứ tự heading

**Lỗi 8:** `<img>` thiếu alt

**Lỗi 9:** Lồng thẻ sai `<b>`

**Lỗi 10:** Sai table (`<th>`, `<thead>`, `<tbody>`)

**Lỗi 11:** 2 thẻ `<main>`

**Lỗi 12:** Thiếu `</p>`

**Lỗi 13:** Thiếu `</html>`

---

## CÂU B4

Trang được chọn: thegioididong

### Các thẻ semantic HTML5 tìm được:

* `<header>`: phần đầu trang (logo, tìm kiếm, menu)
* `<section>`: chia nội dung
* `<footer>`: thông tin cuối trang

![img](screenshots/b4-1.1.png)
![img](screenshots/b4-1.2.png)
![img](screenshots/b4-1.3.png)

### Các phần chưa dùng đúng semantic:

* Dùng `<div>` thay `<header>`
* Dùng `<div>` thay `<section>`

![img](screenshots/b4-1.4.png)

### Phân tích form tìm kiếm:

* action: `/tim-kiem`
* method: GET (mặc định)
* input:

  * text
  * hidden

![img](screenshots/b4-1.5.png)

---

## Câu C1

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Detail</title>
</head>
<body>
<header>
<nav>
<ul>
<li><a href="#">Trang chủ</a></li>
<li><a href="#">Danh mục</a></li>
</ul>
</nav>
</header>
</body>
</html>
```

---

## Câu C2

Mình không đồng ý với ý kiến chỉ dùng `<div>` cho mọi thứ.

* SEO kém
* Accessibility kém
* Không có ý nghĩa cấu trúc

Tuy nhiên `<div>` vẫn cần thiết cho layout.

**Kết luận:** nên kết hợp semantic HTML và `<div>`.
