# PHIẾU BÀI TẬP 07 — ANSWERS.MD
# JavaScript Basics — Variables, Data Types, Control Structures

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — var / let / const

#### Dự đoán output:

```
// Đoạn 1
console.log(x);   → undefined
var x = 5;
```
**Giải thích:** `var` bị **hoisted** lên đầu scope — khai báo được nhấc lên nhưng giá trị chưa được gán, nên kết quả là `undefined` thay vì lỗi.

---

```
// Đoạn 2
console.log(y);   → ReferenceError: Cannot access 'y' before initialization
let y = 10;
```
**Giải thích:** `let` cũng được hoist nhưng nằm trong **Temporal Dead Zone (TDZ)** — không thể truy cập trước dòng khai báo. Trình thông dịch ném ReferenceError.

---

```
// Đoạn 3
const z = 15;
z = 20;           → TypeError: Assignment to constant variable
console.log(z);
```
**Giải thích:** `const` không cho phép gán lại giá trị sau khi khởi tạo.

---

```
// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); → [1, 2, 3, 4]
```
**Giải thích:** `const` chỉ khóa **binding** (biến trỏ tới object đó), không khóa nội dung bên trong. Array vẫn có thể bị mutate.

---

```
// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);   → "Trong block: 2"
}
console.log("Ngoài block:", a);       → "Ngoài block: 1"
```
**Giải thích:** `let` có **block scope** — biến `a` bên trong `{}` là biến hoàn toàn khác với `a` bên ngoài. Chúng không ảnh hưởng lẫn nhau.

---

### Câu A2 — Data Types & Coercion

| Biểu thức | Kết quả | Lý do |
|---|---|---|
| `typeof null` | `"object"` | Lỗi lịch sử của JS — null được biểu diễn bằng null pointer (000 bits) trùng với object |
| `typeof undefined` | `"undefined"` | Kiểu nguyên thủy riêng |
| `typeof NaN` | `"number"` | NaN thuộc kiểu Number (Not a Number vẫn là number) |
| `"5" + 3` | `"53"` | Toán tử `+` với string → nối chuỗi, số 3 bị ép thành `"3"` |
| `"5" - 3` | `2` | Toán tử `-` không nối chuỗi → ép `"5"` thành số 5, rồi 5-3=2 |
| `"5" * "3"` | `15` | `*` luôn ép cả hai về số |
| `true + true` | `2` | `true` ép thành 1, 1+1=2 |
| `[] + []` | `""` | Cả hai array ép thành chuỗi rỗng `""`, rồi nối lại |
| `[] + {}` | `"[object Object]"` | `[]` → `""`, `{}` → `"[object Object]"`, nối lại |
| `{} + []` | `0` | Khi `{}` đứng đầu dòng, JS hiểu là **block rỗng** (không phải object), `+[]` → ép `[]` thành số → `0` |

**Giải thích `"5" + 3` vs `"5" - 3`:**
- `+` là toán tử đa năng: vừa cộng số, vừa nối chuỗi. Khi có ít nhất 1 operand là string, JS chọn nối chuỗi → `"5" + 3 = "53"`
- `-` chỉ có một nghĩa duy nhất là trừ số, không có nghĩa nào khác cho string → JS buộc phải ép `"5"` thành số 5, rồi tính 5-3=2

---

### Câu A3 — So sánh == vs ===

| Biểu thức | Kết quả | Lý do |
|---|---|---|
| `5 == "5"` | `true` | `==` ép kiểu: `"5"` → số 5, rồi so sánh |
| `5 === "5"` | `false` | `===` so sánh cả giá trị lẫn kiểu: number ≠ string |
| `null == undefined` | `true` | Quy tắc đặc biệt của JS: null và undefined bằng nhau qua `==` |
| `null === undefined` | `false` | Khác kiểu: null type ≠ undefined type |
| `NaN == NaN` | `false` | NaN không bằng bất kỳ thứ gì, kể cả chính nó |
| `0 == false` | `true` | `false` → 0, 0 == 0 |
| `0 === false` | `false` | number ≠ boolean |
| `"" == false` | `true` | `false` → 0, `""` → 0, 0 == 0 |

**Nên dùng `===` (strict equality).** Lý do:
- `==` có chuỗi quy tắc ép kiểu phức tạp, khó đoán → dễ sinh bug âm thầm
- `===` hành xử nhất quán, dễ đọc, dễ debug
- Hầu hết style guide (Airbnb, Google) đều yêu cầu dùng `===`

---

### Câu A4 — Truthy & Falsy

**6 giá trị Falsy trong JavaScript:**
1. `false`
2. `0` (và `-0`, `0n`)
3. `""` (chuỗi rỗng)
4. `null`
5. `undefined`
6. `NaN`

**Dự đoán:**

| Code | In ra? | Lý do |
|---|---|---|
| `if ("0")` → A | ✅ **In "A"** | `"0"` là chuỗi không rỗng → truthy |
| `if ("")` → B | ❌ Không in | Chuỗi rỗng → falsy |
| `if ([])` → C | ✅ **In "C"** | Array rỗng vẫn là object → truthy |
| `if ({})` → D | ✅ **In "D"** | Object rỗng vẫn là object → truthy |
| `if (null)` → E | ❌ Không in | null → falsy |
| `if (0)` → F | ❌ Không in | 0 → falsy |
| `if (-1)` → G | ✅ **In "G"** | Số khác 0 (kể cả âm) → truthy |
| `if (" ")` → H | ✅ **In "H"** | Chuỗi có space không phải chuỗi rỗng → truthy |

---

### Câu A5 — Template Literals

```javascript
// Cách 1 — Greeting
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2 — URL
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3 — HTML string
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

**Ưu điểm template literal:** không cần escape dấu `"`, hỗ trợ multiline, dễ đọc hơn nhiều.

---

## PHẦN C — SUY LUẬN

---

### Câu C1 — Debug JavaScript

**Code gốc với 7 lỗi được đánh dấu và giải thích:**

#### Lỗi 1: Hàm nhận string thay vì số
```javascript
// LỖI: truyền "100000" (string) thay vì 100000 (number)
const gia = tinhGiaGiamGia("100000", 20)

// SỬA:
const gia = tinhGiaGiamGia(100000, 20)
```

#### Lỗi 2: Gán thay vì so sánh
```javascript
// LỖI: dùng = (gán) thay vì === (so sánh)
if (giaSauGiam = 0) {

// SỬA:
if (giaSauGiam === 0) {
```

#### Lỗi 3: Thiếu dấu chấm phẩy / chưa validate kiểu input
```javascript
// LỖI: Hàm không kiểm tra giaBan có phải số không
// Khi truyền "100000", giaBan * phanTramGiam vẫn hoạt động do coercion
// nhưng đây là bad practice — cần validate:
if (typeof giaBan !== 'number' || typeof phanTramGiam !== 'number') {
    return "Lỗi: Input phải là số"
}
```

#### Lỗi 4: `var` trong vòng lặp với `setTimeout`
```javascript
// LỖI: dùng var → function scope → đến khi timeout chạy, i đã = 5
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)  // In ra "Item 5" cả 5 lần!
    }, 1000)
}

// SỬA: dùng let → block scope → mỗi iteration có i riêng
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)  // In đúng: 0, 1, 2, 3, 4
    }, 1000)
}
```
**Giải thích:** `var` có function scope, tất cả 5 callback cùng trỏ về cùng 1 biến `i`. Khi setTimeout chạy sau 1 giây, vòng lặp đã xong, `i = 5`. Dùng `let` tạo block scope mới cho mỗi iteration, mỗi callback "nhớ" giá trị `i` riêng của nó (closure).

#### Code đã sửa hoàn chỉnh:
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Lỗi 3 (thêm): validate kiểu input
    if (typeof giaBan !== 'number' || typeof phanTramGiam !== 'number') {
        return "Lỗi: Input phải là số"
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    // Lỗi 2: sửa = thành ===
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

// Lỗi 1: sửa "100000" → 100000
const gia = tinhGiaGiamGia(100000, 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

// Lỗi 4: sửa var → let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
```

> **Tổng kết 7 lỗi:**
> 1. Truyền string `"100000"` thay vì number `100000`
> 2. `if (giaSauGiam = 0)` — gán thay vì so sánh (nên dùng `===`)
> 3. Thiếu validation kiểu input cho `giaBan`
> 4. `var i` trong for+setTimeout gây closure bug — sửa thành `let i`
> 5. Thiếu xử lý khi `phanTramGiam` không phải số (vd: truyền string)
> 6. Hàm không có return type nhất quán (trả cả string lẫn number)
> 7. Không có kiểm tra `giaBan < 0` (giá âm vô nghĩa về mặt business logic)
