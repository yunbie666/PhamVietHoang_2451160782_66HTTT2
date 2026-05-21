# 📋 PBT 04 — CSS Layout: Answers.md
## Phần A + Phần C

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                    | Cuộn theo trang? | Use case                                          |
| ---------- | ------------------------- | ------------------------------------ | ---------------- | ------------------------------------------------- |
| `static`   | ✅ Có                      | Không có (mặc định)                  | ✅ Có             | Phần tử bình thường, không cần định vị đặc biệt  |
| `relative` | ✅ Có                      | Chính vị trí ban đầu của nó          | ✅ Có             | Dịch chuyển nhẹ, làm "anchor" cho absolute con   |
| `absolute` | ❌ Không                   | Nearest positioned ancestor          | ✅ Có (theo flow) | Badge, tooltip, dropdown menu, overlay            |
| `fixed`    | ❌ Không                   | Viewport (cửa sổ trình duyệt)        | ❌ Không          | Fixed header, sticky nav, scroll-to-top button   |
| `sticky`   | ✅ Có                      | Viewport (sau khi scroll đến ngưỡng) | Kết hợp cả hai   | Sidebar dính, table header dính khi scroll        |

**Câu hỏi thêm: Nearest Positioned Ancestor**

- Khi phần tử có `position: absolute`, nó tìm đến **parent gần nhất** có `position` khác `static` (tức là `relative`, `absolute`, `fixed`, hoặc `sticky`) để làm gốc tọa độ.
- Nếu **không có parent nào** có position khác static → phần tử tham chiếu `<html>` (body).
- **Ví dụ:**
  ```
  .card { position: relative; }   ← parent có position → absolute con sẽ tham chiếu .card
  .badge { position: absolute; top: 0; right: 0; }
  ```
  Nếu `.card` không có `position: relative` → badge sẽ bay ra ngoài, tham chiếu `body`.

---

### Câu A2 — Flexbox vs Grid: Dự đoán Layout

**Trường hợp 1:**
```
.container { display: flex; }
.item { flex: 1; }   /* 4 items */
```
→ **Bố cục:** 4 items nằm ngang trên 1 hàng, chiều rộng bằng nhau (25% mỗi cái).
```
[ Item 1 ][ Item 2 ][ Item 3 ][ Item 4 ]
```

---

**Trường hợp 2:**
```
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }   /* 6 items */
```
→ Mỗi item chiếm ~50% (45% + 2.5% margin hai bên). → **2 cột, 3 hàng.**
```
[ Item 1 ][ Item 2 ]
[ Item 3 ][ Item 4 ]
[ Item 5 ][ Item 6 ]
```

---

**Trường hợp 3:**
```
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items */
```
→ Item 1 sát trái, Item 3 sát phải, Item 2 ở giữa. Tất cả căn giữa theo chiều dọc.
```
[Item 1]          [Item 2]          [Item 3]
```

---

**Trường hợp 4:**
```
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items */
```
→ **3 cột trên 1 hàng:** cột đầu 200px cố định, cột giữa chiếm phần còn lại, cột cuối 200px cố định.
```
[200px | Item1]  [     1fr | Item2     ]  [200px | Item3]
```

---

**Trường hợp 5:**
```
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items */
```
→ **3 cột, 3 hàng.** Hàng 1-2 đầy đủ (3 items mỗi hàng). Hàng 3 chỉ có 1 item ở vị trí đầu tiên bên trái.
```
[ Item 1 ][ Item 2 ][ Item 3 ]
[ Item 4 ][ Item 5 ][ Item 6 ]
[ Item 7 ][         ][        ]
```

---

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

**1. Navigation bar ngang (logo + menu + buttons)**
→ **Flexbox**
- Navbar là layout 1 chiều (ngang), các item phân bố theo trục ngang.
- `display: flex; justify-content: space-between; align-items: center;` là giải pháp chuẩn.
- Grid không cần thiết vì không có cấu trúc 2 chiều phức tạp.

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)**
→ **Grid**
- Layout 2 chiều rõ ràng: cần cả kiểm soát hàng lẫn cột.
- `grid-template-columns: repeat(3, 1fr);` tự động xếp ảnh vào hàng mới.
- Flexbox với `flex-wrap` cũng được, nhưng Grid cho phép kiểm soát chính xác hơn.

**3. Layout blog: main content + sidebar**
→ **Grid**
- Cần kiểm soát 2 vùng cụ thể: content rộng + sidebar hẹp.
- `grid-template-columns: 1fr 300px;` đơn giản và rõ ràng.
- Flexbox cũng làm được nhưng Grid ngữ nghĩa hơn cho layout 2D tổng thể.

**4. Footer với 4 cột thông tin**
→ **Grid hoặc Flexbox** (cả hai đều phù hợp)
- `grid-template-columns: repeat(4, 1fr);` → Grid rõ ràng hơn.
- `display: flex; flex: 1;` → Flexbox đơn giản hơn nếu các cột không cần row alignment.
- Nếu cần các hàng nội dung thẳng hàng với nhau giữa các cột → **Grid**.

**5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)**
→ **Flexbox** (bên trong card)
- Mỗi card là layout 1 chiều theo trục dọc.
- `.card { display: flex; flex-direction: column; }`
- `.btn { margin-top: auto; }` → nút tự động bám đáy bất kể chiều cao card.
- Lưới các card bên ngoài thì dùng **Grid** (`grid-template-columns: repeat(4, 1fr)`).

---

### Câu C2 — Debug Flexbox

**Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**

**Nguyên nhân:** Các card có chiều cao khác nhau (do text dài ngắn khác nhau). Nút không được đẩy xuống đáy vì card không dùng flex column và `margin-top: auto`.

**Sửa:**
```css
.card-container { display: flex; flex-wrap: wrap; }
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;           /* Thêm: làm card thành flex container */
  flex-direction: column;  /* Thêm: sắp xếp theo chiều dọc */
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn {
  padding: 10px;
  margin-top: auto;        /* Thêm: đẩy nút xuống đáy */
}
```

---

**Lỗi 2: Items vẫn dính góc trái trên dù muốn căn giữa**

**Nguyên nhân:** Container có `display: flex` nhưng thiếu `justify-content: center` (căn ngang) và `align-items: center` (căn dọc). Mặc định flex items nằm ở góc trái trên.

**Sửa:**
```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;  /* Thêm: căn giữa theo trục ngang */
  align-items: center;      /* Thêm: căn giữa theo trục dọc */
}
.hero-content {
  text-align: center;
}
```

---

**Lỗi 3: Sidebar bị co lại khi content quá dài**

**Nguyên nhân:** Mặc định flex items có `flex-shrink: 1`, nghĩa là chúng có thể bị co lại nếu container không đủ chỗ. Sidebar 250px sẽ bị thu nhỏ khi content dài.

**Sửa:**
```css
.layout { display: flex; }
.sidebar {
  width: 250px;
  flex-shrink: 0;  /* Thêm: ngăn sidebar bị co lại */
}
.content { flex: 1; }
```
