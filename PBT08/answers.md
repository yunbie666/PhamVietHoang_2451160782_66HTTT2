# ANSWERS — PHIẾU BÀI TẬP 08
# JavaScript Functions, Arrays & Objects

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — Function Declaration vs Expression vs Arrow

```javascript
// 1. Function Declaration
function tinhThueBaoHiem_Declaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

// 2. Function Expression
const tinhThueBaoHiem_Expression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

// 3. Arrow Function
const tinhThueBaoHiem_Arrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
```

**Sự khác nhau về Hoisting:**

- **Function Declaration** được hoisted hoàn toàn — có thể gọi TRƯỚC khi khai báo:
  ```javascript
  console.log(tinhThueBaoHiem_Declaration(15000000)); // ✅ Chạy được
  function tinhThueBaoHiem_Declaration(luong) { ... }
  ```

- **Function Expression & Arrow Function** KHÔNG được hoisted — chỉ hoisted phần tên biến (là `undefined`), gọi trước sẽ lỗi:
  ```javascript
  console.log(tinhThueBaoHiem_Expression(15000000)); // ❌ TypeError: not a function
  const tinhThueBaoHiem_Expression = function(luong) { ... };
  ```

---

### Câu A2 — Scope & Closure

**Đoạn 1 — Output:**
```
1   // c.increment(): count 0 → 1
2   // c.increment(): count 1 → 2
3   // c.increment(): count 2 → 3
2   // c.decrement(): count 3 → 2
2   // c.getCount(): count vẫn là 2
```

**Đoạn 2 — Output sau 200ms:**
```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích `var` vs `let` trong vòng lặp + setTimeout:**

- `var` có phạm vi **function scope** (hoặc global). Biến `i` chỉ có 1 bản duy nhất được chia sẻ cho cả 3 callback. Khi setTimeout chạy (sau 100ms), vòng lặp đã xong và `i = 3`, nên cả 3 đều in ra `3`.

- `let` có phạm vi **block scope**. Mỗi lần lặp tạo ra một bản sao `j` riêng biệt được "giam lại" trong closure của mỗi callback. Vì vậy mỗi callback nhớ đúng giá trị `j` của lần lặp đó: `0, 1, 2`.

---

### Câu A3 — Array Methods (1 dòng mỗi câu)

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Số chẵn
const evens = nums.filter(n => n % 2 === 0); // [2,4,6,8,10]

// 2. Nhân 3
const tripled = nums.map(n => n * 3); // [3,6,9,...,30]

// 3. Tổng
const sum = nums.reduce((acc, n) => acc + n, 0); // 55

// 4. Số đầu tiên > 7
const firstBig = nums.find(n => n > 7); // 8

// 5. Có số > 10 không
const hasOver10 = nums.some(n => n > 10); // false

// 6. Tất cả > 0
const allPositive = nums.every(n => n > 0); // true

// 7. Mảng mô tả chẵn/lẻ
const described = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược không mutate
const reversed = [...nums].reverse(); // [10,9,...,1]
```

---

### Câu A4 — Object Destructuring & Spread

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);
// → "iPhone 16" 25990000 8 "Titan"

console.log(specs);
// → ReferenceError: specs is not defined
// Vì destructuring `specs: { ram, color }` chỉ lấy ram và color,
// biến `specs` không được tạo ra.

const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);   // → 23990000  (đã ghi đè)
console.log(updated.sale);    // → true
console.log(product.price);   // → 25990000  (object gốc KHÔNG đổi)

// Spread gotcha (Shallow copy):
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // → 16
// Vì spread chỉ copy NÔNG (shallow). Thuộc tính `specs` là một object,
// cả `copy` và `product` đều trỏ vào CÙNG một object `specs` trong bộ nhớ.
// Khi sửa copy.specs.ram thì product.specs.ram cũng thay đổi theo.
```

---

## PHẦN C — SUY LUẬN

---

### Câu C1 — Refactor Code

```javascript
function processOrders(orders) {
    return orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}
```

**Giải thích:**
- `filter` thay cho 2 vòng `if` lồng nhau + for loop
- `map` thay cho việc tạo `item = {}` và gán từng thuộc tính
- `sort` với comparator thay cho bubble sort O(n²)
- Destructuring trong tham số hàm giúp code ngắn gọn hơn

---

### Câu C2 — miniArray

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        let startIndex = 0;
        if (acc === undefined) {
            acc = arr[0];
            startIndex = 1;
        }
        for (let i = startIndex; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test:
console.log(miniArray.map([1,2,3], x => x * 2));           // [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));       // [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0));  // 10
```
