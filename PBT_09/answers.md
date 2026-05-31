# PHIẾU BÀI TẬP 09 — ANSWERS.MD
# DOM Manipulation & Events

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — DOM Tree

#### 1. Sơ đồ cây DOM

```
document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1 ("Todo App")
            │   └── nav
            │       ├── a.active ("All")
            │       ├── a ("Active")
            │       └── a ("Completed")
            └── main
                ├── form#todoForm
                │   ├── input#todoInput [type="text"]
                │   └── button [type="submit"] ("Add")
                └── ul#todoList
                    ├── li.todo-item ("Learn HTML")
                    └── li.todo-item.completed ("Learn CSS")
```

#### 2. Các querySelector

```javascript
// Chọn thẻ <h1>
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoForm input");
// hoặc
document.querySelector("#todoInput");

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("a.active");
// hoặc
document.querySelector("nav a.active");

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");
// hoặc
document.querySelector("#todoList .todo-item");

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a");
```

---

### Câu A2 — innerHTML vs textContent

#### Sự khác nhau

| | `innerHTML` | `textContent` |
|---|---|---|
| **Đọc** | Trả về chuỗi HTML (bao gồm thẻ) | Trả về chỉ văn bản thuần |
| **Ghi** | Parse chuỗi như HTML → tạo các node | Gán như văn bản, không parse |
| **Hiệu năng** | Chậm hơn (phải parse HTML) | Nhanh hơn |
| **Bảo mật** | ⚠️ Nguy hiểm nếu dữ liệu từ user | ✅ An toàn |

#### Ví dụ sử dụng

```javascript
// Dùng innerHTML khi muốn chèn HTML có thẻ
element.innerHTML = "<strong>Hello</strong> <em>World</em>";
// → Hiển thị chữ đậm và in nghiêng

// Dùng textContent khi chỉ muốn hiển thị text thuần
element.textContent = "<strong>Hello</strong>";
// → Hiển thị nguyên chuỗi: <strong>Hello</strong> (không parse)
```

#### Lỗ hổng XSS với innerHTML

```javascript
// ❌ NGUY HIỂM — user nhập: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
// → Trình duyệt thực thi onerror → chạy script độc hại!

// ✅ CÁCH SỬA — dùng textContent thay innerHTML
document.querySelector("#result").textContent = userInput;
// → Hiển thị đúng chữ, KHÔNG thực thi script

// ✅ HOẶC — tạo node an toàn
const p = document.createElement("p");
p.textContent = userInput;
document.querySelector("#result").appendChild(p);
```

**Giải thích:** `innerHTML` parse chuỗi thành HTML và tạo DOM nodes, kể cả các event handler như `onerror`, `onclick`... Nếu nội dung đến từ user mà không được sanitize, attacker có thể chèn script độc hại chạy trong trình duyệt của nạn nhân.

---

### Câu A3 — Event Bubbling

#### Khi click vào button (không có stopPropagation)

Event nổi từ phần tử bị click lên các phần tử cha:

```
btn → inner → outer
```

**Output:**
```
BUTTON
INNER
OUTER
```

**Giải thích:** Event bubbling khiến sự kiện lan truyền từ phần tử con lên cha. `#btn` nằm trong `#inner`, và `#inner` nằm trong `#outer`, nên tất cả 3 listener đều được kích hoạt theo thứ tự từ trong ra ngoài.

#### Khi uncomment `e.stopPropagation()`

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation(); // ← Dừng bubbling tại đây
});
```

**Output:**
```
BUTTON
```

**Giải thích:** `stopPropagation()` ngăn event không lan truyền lên các phần tử cha. Chỉ listener trên `#btn` được gọi, `#inner` và `#outer` không nhận được event nữa.

---

## PHẦN C — DEBUG & PHÂN TÍCH

---

### Câu C1 — Debug DOM Code

Có **8 lỗi** trong code gốc. Dưới đây là code đã sửa và giải thích từng lỗi:

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    // ✅ LỖI 1 ĐÃ SỬA: dùng textContent thay innerHTML cho text thuần
    countDisplay.textContent = count;

    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

// ✅ LỖI 2 ĐÃ SỬA: "onclick" → "click" (tên event không có "on")
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    // ✅ LỖI 3 ĐÃ SỬA: textContent thay innerHTML
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    // ✅ LỖI 4 ĐÃ SỬA: countDisplay là DOM element (const), không thể gán số
    // phải gán vào .textContent
    countDisplay.textContent = count;
    // ✅ LỖI 5 ĐÃ SỬA: innerHTML = null → dùng "" (chuỗi rỗng)
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        // ✅ LỖI 6 ĐÃ SỬA: item.remove (thiếu gọi hàm) → item.remove()
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    // ✅ LỖI 7 ĐÃ SỬA: getItem trả về string, phải parse thành số
    const savedCount = localStorage.getItem("count");
    // ✅ LỖI 8 ĐÃ SỬA: kiểm tra null trước khi dùng (lần đầu chưa có data)
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        countDisplay.textContent = count;
    }
});
```

#### Tóm tắt 8 lỗi

| # | Dòng lỗi | Lỗi | Sửa |
|---|---|---|---|
| 1 | `countDisplay.innerHTML = count` | Dùng innerHTML cho text thuần | `countDisplay.textContent = count` |
| 2 | `addEventListener("onclick", ...)` | Tên event sai | `addEventListener("click", ...)` |
| 3 | `countDisplay.innerHTML = count` (decrement) | Dùng innerHTML cho text thuần | `countDisplay.textContent = count` |
| 4 | `countDisplay = count` | Gán số vào biến DOM element (là `const`) | `countDisplay.textContent = count` |
| 5 | `historyList.innerHTML = null` | null không hợp lệ | `historyList.innerHTML = ""` |
| 6 | `item.remove` | Thiếu `()` — tham chiếu hàm, không gọi | `item.remove()` |
| 7 | `count = localStorage.getItem("count")` | getItem trả về string | `count = parseInt(localStorage.getItem("count"), 10)` |
| 8 | Không kiểm tra null khi load | Crash nếu chưa có data trong localStorage | Thêm `if (savedCount !== null)` |

---

### Câu C2 — Performance

#### 1. Tại sao bind event lên 1000 elements là BAD PRACTICE?

Khi bind event lên từng element riêng lẻ:

```javascript
// ❌ BAD — 1000 event listeners
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", handleClick);
});
```

**Vấn đề:**
- **Tốn bộ nhớ:** 1000 listener objects được tạo và lưu trong memory
- **Chậm khi khởi tạo:** Phải loop qua 1000 elements để gắn listener
- **Không hoạt động với dynamic elements:** Elements thêm sau không có listener
- **Khó cleanup:** Phải remove từng listener một

**Event Delegation giải quyết:**

```javascript
// ✅ GOOD — 1 event listener duy nhất trên parent
document.querySelector("#list").addEventListener("click", function(e) {
    // Kiểm tra phần tử thực sự bị click
    if (e.target.classList.contains("item")) {
        handleClick(e.target);
    }
});
```

- Chỉ **1 listener** thay vì 1000
- Tự động hoạt động với **dynamic elements** (thêm mới sau)
- Tận dụng cơ chế **event bubbling** của trình duyệt

---

#### 2. Refactor dùng DocumentFragment

```javascript
// ❌ BAD — 1000 lần reflow (mỗi appendChild thay đổi DOM → browser tính toán lại layout)
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);  // ← Mỗi lần này gây 1 reflow!
}

// ✅ GOOD — chỉ 1 lần reflow duy nhất
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Thêm vào fragment (KHÔNG gây reflow)
}

document.body.appendChild(fragment);  // Chỉ 1 lần thay đổi DOM thật → 1 reflow
```

**Tại sao nhanh hơn?**

`DocumentFragment` là một **node ảo** không nằm trong DOM thật. Khi append vào fragment, trình duyệt không cần tính toán lại layout. Chỉ khi `appendChild(fragment)` cuối cùng, toàn bộ 1000 elements được chèn vào DOM **trong một thao tác duy nhất**, gây đúng **1 lần reflow** thay vì 1000 lần. Kết quả: nhanh hơn đáng kể, đặc biệt với số lượng lớn elements.
