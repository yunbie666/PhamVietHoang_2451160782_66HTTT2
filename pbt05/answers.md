# ANSWERS — PHIẾU BÀI TẬP 05
# CSS Responsive & SCSS

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — Viewport & Mobile-First

#### 1. Thẻ `<meta viewport>` chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Giải thích từng thuộc tính:**

| Thuộc tính | Giá trị | Ý nghĩa |
|---|---|---|
| `name="viewport"` | — | Khai báo đây là thẻ meta viewport |
| `width=device-width` | Chiều rộng thiết bị | Đặt chiều rộng vùng hiển thị = chiều rộng thực của màn hình |
| `initial-scale=1.0` | 1.0 (100%) | Mức zoom mặc định khi tải trang = 100%, không phóng to/thu nhỏ |

#### 2. Nếu THIẾU thẻ meta viewport trên iPhone:

Trình duyệt Safari trên iPhone sẽ giả định chiều rộng trang là **980px** (viewport ảo mặc định), sau đó thu nhỏ toàn bộ trang để vừa màn hình 390px. Kết quả:
- Chữ cực nhỏ, khó đọc
- Nút bấm rất nhỏ, không thể click chuẩn
- User phải zoom in để đọc nội dung
- Layout desktop bị hiển thị thu nhỏ trên mobile → trải nghiệm rất tệ

#### 3. Mobile-First vs Desktop-First:

**Mobile-First** — CSS mặc định viết cho mobile, dùng `min-width` để mở rộng lên:

```css
/* Mobile-First — mặc định = mobile */
.container {
  display: flex;
  flex-direction: column; /* 1 cột trên mobile */
  gap: 16px;
}

/* Mở rộng lên tablet */
@media (min-width: 768px) {
  .container {
    flex-direction: row; /* 2 cột trên tablet+ */
  }
}
```

**Desktop-First** — CSS mặc định viết cho desktop, dùng `max-width` để thu hẹp xuống:

```css
/* Desktop-First — mặc định = desktop */
.container {
  display: flex;
  flex-direction: row; /* 2 cột trên desktop */
  gap: 16px;
}

/* Thu hẹp xuống mobile */
@media (max-width: 767px) {
  .container {
    flex-direction: column; /* 1 cột trên mobile */
  }
}
```

**Tại sao Mobile-First được khuyên dùng?**
- **Progressive Enhancement**: Bắt đầu từ cơ bản (mobile) rồi thêm dần tính năng phức tạp hơn khi màn hình lớn hơn. An toàn hơn là loại bỏ thứ gì đó.
- **Performance**: Mobile thường có CPU yếu và mạng chậm hơn. Nếu viết Mobile-First, trình duyệt mobile không cần tải/parse các quy tắc desktop không dùng đến.
- **Ưu tiên người dùng**: >60% traffic web là từ mobile. Nên thiết kế cho phần đông người dùng trước.
- **Dễ scale**: Thêm tính năng cho màn hình lớn dễ hơn là cắt bỏ tính năng cho màn hình nhỏ.

---

### Câu A2 — Breakpoints

#### Breakpoints chuẩn (Bootstrap 5):

| Breakpoint | Pixel | Thiết bị đại diện | Lưới sản phẩm |
|---|---|---|---|
| xs (Extra small) | < 576px | Điện thoại nhỏ (iPhone SE) | 1 cột |
| sm (Small) | ≥ 576px | Điện thoại lớn (iPhone 14) | 1-2 cột |
| md (Medium) | ≥ 768px | Tablet (iPad) | 2-3 cột |
| lg (Large) | ≥ 992px | Laptop nhỏ | 3-4 cột |
| xl (Extra large) | ≥ 1200px | Laptop/Desktop | 4 cột |
| xxl (Extra extra large) | ≥ 1400px | Màn hình lớn, 4K | 4-6 cột |

---

### Câu A3 — Media Queries

**Phân tích code CSS:**

```css
.container { width: 100%; }                              /* mặc định */
@media (min-width: 576px)  { .container { width: 540px; } }
@media (min-width: 768px)  { .container { width: 720px; } }
@media (min-width: 992px)  { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

**Giải thích:** `min-width` nghĩa là "từ kích thước này trở lên". CSS sẽ áp dụng rule có `min-width` lớn nhất mà vẫn ≤ chiều rộng màn hình.

| Chiều rộng màn hình | `.container` width | Lý do |
|---|---|---|
| 375px (iPhone SE) | `100%` (= 375px) | 375 < 576px → không khớp bất kỳ media query nào |
| 600px | `540px` | 600 ≥ 576px nhưng < 768px → áp dụng rule 576px |
| 800px | `720px` | 800 ≥ 768px nhưng < 992px → áp dụng rule 768px |
| 1000px | `960px` | 1000 ≥ 992px nhưng < 1200px → áp dụng rule 992px |
| 1400px | `1140px` | 1400 ≥ 1200px → áp dụng rule 1200px |

---

### Câu A4 — SCSS Basics

#### 4 tính năng chính của SCSS:

**1. Variables (`$primary-color`)**

Lưu trữ giá trị dùng lại nhiều lần. Khi cần thay đổi, chỉ sửa 1 chỗ.

```scss
$primary-color: #e74c3c;
$font-size-base: 16px;
$border-radius: 8px;

.button {
  background-color: $primary-color;
  font-size: $font-size-base;
  border-radius: $border-radius;
}
```

**2. Nesting (CSS lồng nhau)**

Viết CSS theo cấu trúc HTML, thay vì lặp lại selector. Dùng `&` để tham chiếu đến selector cha.

```scss
.card {
  padding: 16px;
  border: 1px solid #ddd;

  .card-title {
    font-size: 18px;
    color: #333;
  }

  .card-image {
    width: 100%;
    border-radius: 4px;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &.featured {
    border-color: $primary-color;
  }
}
```

**3. Mixins (`@mixin`, `@include`)**

Tái sử dụng một nhóm CSS có thể nhận tham số, như "function" trong lập trình.

```scss
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

/* Sử dụng */
.hero {
  @include flex-center(column);
  height: 100vh;
}

.nav {
  @include respond-to(768px) {
    display: flex;
    flex-direction: row;
  }
}
```

**4. `@extend` / Inheritance**

Cho phép một selector "kế thừa" toàn bộ CSS của selector khác, tránh lặp code.

```scss
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
}

.btn-secondary {
  @extend %button-base;
  background-color: transparent;
  border: 2px solid $primary-color;
  color: $primary-color;
}
```

#### Tại sao trình duyệt KHÔNG đọc được `.scss`?

Trình duyệt chỉ hiểu **CSS thuần** (W3C standard). SCSS là một **preprocessor language** — ngôn ngữ mở rộng của CSS với các tính năng như variables, nesting, mixins mà CSS thuần không có. Trước khi deploy, phải **biên dịch (compile)** SCSS → CSS:

```bash
# Cài Sass
npm install -g sass

# Compile một lần
sass style.scss style.css

# Compile tự động khi file thay đổi (watch mode)
sass --watch style.scss:style.css

# Compile cả folder
sass --watch scss/:css/
```

Quá trình: `.scss` → **Sass compiler** → `.css` (trình duyệt đọc được)

---

## PHẦN C — PHÂN TÍCH

### Câu C2 — Responsive Strategy: Trang Đặt bàn nhà hàng

#### Wireframe 3 kích thước:

**MOBILE (< 768px):**
```
┌─────────────────────┐
│  LOGO    ☎ 0901...  │  ← Header đơn giản
├─────────────────────┤
│                     │
│   HERO IMAGE        │  ← full width, chiều cao 50vh
│   (overlay text)    │
│                     │
├─────────────────────┤
│ ẢNH MÓN ĂN (1 cột) │  ← 6 ảnh xếp dọc, 1 cột
│ [img] Phở bò        │
│ [img] Bún bò        │
│ ...                 │
├─────────────────────┤
│  FORM ĐẶT BÀN       │  ← Full width, stacked
│  Ngày: [____]       │
│  Giờ:  [____]       │
│  Người:[____]       │
│  Ghi chú: [____]    │
│  [ĐẶT BÀN NGAY]     │
├─────────────────────┤
│  BẢN ĐỒ             │  ← Ẩn hoặc hiển thị thu nhỏ
│  (Google Maps)      │    chiều cao 200px
├─────────────────────┤
│  FOOTER             │
└─────────────────────┘
Ẩn trên mobile: sidebar địa chỉ chi tiết, bản đồ lớn
```

**TABLET (768px - 1199px):**
```
┌────────────────────────────────┐
│  LOGO          ☎ 0901...       │
├────────────────────────────────┤
│                                │
│         HERO IMAGE             │  ← full width, 60vh
│                                │
├────────────────────────────────┤
│  ẢNH MÓN ĂN (2 cột, 3 hàng)  │
│  [img]  [img]                  │
│  [img]  [img]                  │
│  [img]  [img]                  │
├───────────────┬────────────────┤
│  FORM ĐẶT BÀN│  BẢN ĐỒ       │  ← 2 cột side-by-side
│  ...          │  Google Maps   │
│  [ĐẶT BÀN]   │                │
├───────────────┴────────────────┤
│  FOOTER                        │
└────────────────────────────────┘
```

**DESKTOP (≥ 1200px):**
```
┌─────────────────────────────────────────────┐
│  LOGO              MENU NAV     ☎ 0901...   │
├─────────────────────────────────────────────┤
│                                             │
│              HERO IMAGE FULL                │  ← 100vh, parallax
│         "Đặt bàn ngay hôm nay"             │
│              [XEM THỰC ĐƠN]                 │
│                                             │
├─────────────────────────────────────────────┤
│      ẢNH MÓN ĂN (3 cột, 2 hàng)           │
│  [img Phở]   [img Bún bò]  [img Bánh mì]  │
│  [img Cơm]   [img Chả giò] [img Chè]       │
├────────────────────────┬────────────────────┤
│  FORM ĐẶT BÀN          │  BẢN ĐỒ + ĐỊA CHỈ│
│  Ngày: [____]          │  [Google Maps]     │
│  Giờ:  [____]          │                    │
│  Số người: [____]      │  📍 123 Lê Lợi    │
│  Ghi chú: [________]   │  ⏰ 10:00 - 22:00  │
│  [ĐẶT BÀN NGAY ▶]     │  ☎ 0901 234 567    │
├────────────────────────┴────────────────────┤
│  FOOTER: Logo | Links | Mạng XH | Bản quyền│
└─────────────────────────────────────────────┘
```

#### CSS Skeleton — Mobile-First với Grid:

```css
/* ===== BASE (Mobile) ===== */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

/* Hero */
.hero {
  height: 50vh;
  background-size: cover;
  background-position: center;
}

/* Food grid — mobile: 1 cột */
.food-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}

/* Form + Map — mobile: xếp dọc */
.booking-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 16px;
}

/* Map mobile nhỏ */
.map-container {
  height: 250px;
}

/* ===== TABLET (≥ 768px) ===== */
@media (min-width: 768px) {
  .hero {
    height: 60vh;
  }

  /* Food grid: 2 cột */
  .food-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 24px;
  }

  /* Form + Map: 2 cột ngang */
  .booking-section {
    grid-template-columns: 1fr 1fr;
    padding: 24px;
  }

  .map-container {
    height: 350px;
  }
}

/* ===== DESKTOP (≥ 1200px) ===== */
@media (min-width: 1200px) {
  .header {
    padding: 20px 80px;
  }

  /* Header navigation hiện ra */
  .nav-menu {
    display: flex;
    gap: 32px;
  }

  .hero {
    height: 100vh;
  }

  /* Food grid: 3 cột */
  .food-grid {
    grid-template-columns: repeat(3, 1fr);
    padding: 48px 80px;
    gap: 24px;
  }

  /* Form chiếm nhiều hơn Map */
  .booking-section {
    grid-template-columns: 3fr 2fr;
    padding: 48px 80px;
    gap: 48px;
  }

  .map-container {
    height: 450px;
  }
}
```

---

## PHẦN B3 — Lệnh compile SCSS

```bash
# Cài đặt Sass (nếu chưa có)
npm install -g sass

# Compile style.scss → css/style.css (một lần)
sass scss/style.scss css/style.css

# Watch mode — tự động compile khi có thay đổi
sass --watch scss/style.scss:css/style.css

# Compile toàn bộ folder scss/ → css/
sass --watch scss/:css/

# Compile với nén (production)
sass --style=compressed scss/style.scss css/style.min.css
```
