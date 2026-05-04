Câu A1 — Input Types


1. type="email" → Ô nhập văn bản, tự kiểm tra có ký tự @ → Dùng cho đăng ký tài khoản / nhập email khách hàng

2. type="password" → Ô nhập bị ẩn ký tự (hiện dấu *) → Không có validation đặc biệt → Dùng cho đăng nhập

3. type="number" → Ô nhập số, có nút tăng/giảm → Tự giới hạn chỉ nhập số → Dùng nhập số lượng sản phẩm

4. type="tel" → Ô nhập số điện thoại → Không validate chặt nhưng hỗ trợ nhập số → Dùng nhập số điện thoại giao hàng

5. type="url" → Ô nhập link → Tự kiểm tra định dạng URL (http/https) → Dùng nhập link website

6. type="date" → Hiển thị lịch để chọn ngày → Tự kiểm tra định dạng ngày → Dùng chọn ngày giao hàng

7. type="checkbox" → Ô tick chọn nhiều → Không validation → Dùng chọn nhiều sản phẩm / điều khoản

8. type="radio" → Chọn 1 trong nhiều lựa chọn → Không validation → Dùng chọn phương thức thanh toán

9. type="file" → Nút upload file → Kiểm tra loại file nếu có accept → Dùng upload ảnh đánh giá sản phẩm

10. type="search" → Ô tìm kiếm (giống text nhưng có icon xóa) → Không validation → Dùng thanh tìm kiếm sản phẩm

Câu A2 — Validation Attributes


Trường hợp 1:
→ Không submit được
→ Vì thuộc tính required bắt buộc phải nhập, để trống sẽ bị trình duyệt chặn

---

Trường hợp 2:
→ Không submit được
→ Vì type="email" yêu cầu đúng định dạng email (phải có @), "abc" không hợp lệ

---

Trường hợp 3:
→ Không submit được
→ Vì giá trị 15 vượt quá max="10", trình duyệt sẽ báo lỗi vượt phạm vi

---

Trường hợp 4:
→ Không submit được
→ Vì pattern="[0-9]{10}" yêu cầu đúng 10 chữ số, "abc123" không đúng định dạng

---

Trường hợp 5:
→ Không submit được
→ Vì minlength="8" yêu cầu ít nhất 8 ký tự, "123" chỉ có 3 ký tự nên không hợp lệ
Kết quả validation thực tế:








Câu A3 - Acessibility



1. Tại sao <label for="email"> quan trọng?

Vì khi dùng screen reader, nó sẽ đọc nội dung của label trước rồi mới tới ô input. Nhờ có thuộc tính for liên kết với id của input, nên người dùng biết ô đó dùng để nhập cái gì (ví dụ: email). Nếu không có label thì người dùng chỉ nghe “edit text” mà không biết nhập gì → rất khó sử dụng.

---

2. Khi nào dùng <fieldset> + <legend>?

Dùng khi có nhiều input liên quan với nhau (cùng một nhóm).

<fieldset> để gom nhóm, còn <legend> là tiêu đề của nhóm đó.  

Ví dụ: chọn giới tính

<fieldset>  
  <legend>Giới tính</legend>  
  <input type="radio" name="gender"> Nam  
  <input type="radio" name="gender"> Nữ  
</fieldset>  

→ Screen reader sẽ đọc “Giới tính” trước nên người dùng hiểu đang chọn cái gì

---

3. aria-label dùng khi nào?

Dùng khi không có label hiển thị trên màn hình nhưng vẫn cần mô tả cho screen reader

Ví dụ: icon kính lúp tìm kiếm

<input type="search" aria-label="Tìm kiếm sản phẩm">  

---

Tại sao KHÔNG nên dùng aria-label khi đã có <label>?

Vì nếu đã có <label> rồi thì screen reader đã đọc được nội dung đó.
Nếu thêm aria-label nữa thì có thể bị đọc trùng hoặc gây rối.
Nói đơn giản: có label rồi thì không cần aria-label nữa, tránh dư thừa.
Câu A4 — Media
1. loading="lazy" là gì?

Đây là thuộc tính giúp hình ảnh chỉ được tải khi người dùng cuộn tới gần vị trí của nó, thay vì load hết từ đầu.

→ Lợi ích:

* Giúp trang load nhanh hơn
* Giảm dung lượng tải ban đầu
* Tối ưu trải nghiệm người dùng

→ Khi KHÔNG nên dùng:

* Ảnh ở đầu trang (hero/banner) vì cần hiển thị ngay
* Ảnh quan trọng cần thấy liền khi vào web

---

2. Tại sao nên dùng nhiều <source> trong <video>?

Vì mỗi trình duyệt hỗ trợ định dạng video khác nhau, nên cần nhiều source để đảm bảo video chạy được trên mọi trình duyệt

→ Các format phổ biến:

* MP4 (.mp4)
* WebM (.webm)
* Ogg (.ogv)

---

3. Thuộc tính alt trên <img> dùng để làm gì?

Dùng để mô tả nội dung hình ảnh cho screen reader và hiển thị khi ảnh không load được

→ Ví dụ alt:

* Ảnh iPhone 16:
  alt="iPhone 16 màu đen, thiết kế mới, màn hình lớn"

* Ảnh trang trí:
  alt=""  (để trống vì không quan trọng)

* Ảnh biểu đồ doanh thu:
  alt="Biểu đồ doanh thu quý 1 năm 2026 tăng dần qua các tháng"
Câu A5 — So sánh <figure> vs <img>

So sánh <img> và <figure>:

 Cách 1: chỉ dùng <img>

Dùng khi hình ảnh chỉ để hiển thị đơn giản, không cần chú thích thêm.

Ví dụ:

* Ảnh icon nhỏ trong trang (ví dụ icon giỏ hàng)
* Ảnh thumbnail sản phẩm trong danh sách (chỉ cần nhìn hình, không cần mô tả thêm)

---
 Cách 2: dùng <figure> + <figcaption>

Dùng khi hình ảnh cần có chú thích, mô tả hoặc thông tin đi kèm.

Ví dụ:

* Trang chi tiết sản phẩm: hiển thị ảnh iPhone + giá + tên sản phẩm
* Ảnh biểu đồ thống kê: cần ghi chú giải thích nội dung bên dưới

---

 Kết luận:

* <img> → dùng cho ảnh đơn giản
* <figure> → dùng khi cần thêm mô tả (caption) để người dùng hiểu rõ hơn  
Bài B1 — Form Đăng ký Tài khoản
 Xác nhận password:

HTML không thể tự kiểm tra ô “confirm password” có trùng với password hay không.
Lý do là HTML chỉ validate từng input riêng lẻ (ví dụ: required, minlength…), chứ không so sánh giá trị giữa 2 input khác nhau.

Ví dụ:

* password: 12345678 (đúng minlength)
* confirm: 87654321 (cũng đúng minlength)

→ HTML vẫn cho submit vì mỗi ô đều hợp lệ riêng, dù 2 giá trị không giống nhau.

 Vì vậy, muốn kiểm tra confirm password thì phải dùng JavaScript hoặc xử lý phía server.
Câu C1 — Debug Form

Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

---

Lỗi 2: Dòng 4 — Input email chỉ dùng placeholder, không có label
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>

---

Lỗi 3: Dòng 6 — Input password không có label
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required minlength="8">

---

Lỗi 4: Dòng 7 — Input confirm password không có label
Sửa: <label for="confirm">Nhập lại mật khẩu:</label> <input type="password" id="confirm" name="confirm" required minlength="8">

---

Lỗi 5: Dòng 9 — Phone dùng type="text" không đúng
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}">

---

Lỗi 6: Dòng 9 — Không nên để sẵn value trong input phone
Sửa: bỏ value="0901234567" để user tự nhập

---

Lỗi 7: Dòng 11 — Thẻ <select> không có label
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city"> <option value="hn">Hà Nội</option> <option value="hcm">TP.HCM</option> </select>

---

Lỗi 8: Dòng 16 — Checkbox điều khoản thiếu input, chỉ có label
Sửa: <input type="checkbox" id="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>
Câu C2 — Thiết kế chiến lược Validation

1. Regex pattern:

* CMND/CCCD (12 chữ số):
  pattern="[0-9]{12}"

* Số tài khoản (10–15 chữ số):
  pattern="[0-9]{10,15}"

---

2. HTML5 validation có đủ an toàn cho ngân hàng không?

→ Không đủ an toàn

Vì HTML5 validation chỉ chạy ở phía trình duyệt (frontend), người dùng có thể tắt hoặc sửa bằng DevTools. Do đó không thể tin tưởng hoàn toàn.

→ Trong hệ thống ngân hàng, bắt buộc phải validate lại ở backend để đảm bảo dữ liệu đúng và an toàn.

---

3. 3 loại validation HTML5 KHÔNG làm được:

* So sánh giữa 2 input (ví dụ: password và confirm password)
* Kiểm tra dữ liệu với database (ví dụ: email đã tồn tại chưa)
* Kiểm tra logic phức tạp (ví dụ: số tài khoản có hợp lệ theo hệ thống ngân hàng hay không)

---

4. 2 rủi ro nếu chỉ validate frontend:

* Người dùng có thể bypass validation bằng cách sửa code → gửi dữ liệu sai hoặc độc hại
* Có thể bị tấn công (ví dụ: nhập dữ liệu xấu gây lỗi hệ thống hoặc khai thác lỗ hổng)
