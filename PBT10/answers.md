# ANSWERS — PHIẾU BÀI TẬP 10
# Async JavaScript & API Integration

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — Sync vs Async: Thứ tự Output

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

**Giải thích Event Loop:**

JavaScript có 3 "hàng chờ":

| Hàng chờ | Nội dung | Ưu tiên |
|---|---|---|
| **Call Stack** | Code đồng bộ đang chạy | Cao nhất |
| **Microtask Queue** | Promise `.then`, `queueMicrotask` | Cao (chạy ngay sau call stack trống) |
| **Macrotask Queue** | `setTimeout`, `setInterval`, I/O | Thấp (chạy sau khi microtask hết) |

**Từng bước:**
1. `console.log("1 - Start")` → In ngay (call stack)
2. `setTimeout(..., 0)` → Đưa vào macrotask queue
3. `Promise.resolve().then(...)` → Đưa vào microtask queue
4. `console.log("4 - End")` → In ngay (call stack)
5. `setTimeout(..., 100)` → Đưa vào macrotask queue (chạy sau 100ms)
6. `Promise.resolve().then(...)` → Đưa vào microtask queue
7. Call stack trống → Drain **hết** microtask: in `3`, `6`. Trong khi xử lý `6`, `setTimeout nested` bị đẩy vào macrotask.
8. Chạy macrotask đầu tiên: `2 - Timeout 0ms`
9. Chạy macrotask tiếp theo (nested): `7 - Nested timeout`
10. Sau 100ms: `5 - Timeout 100ms`

---

### Câu A2 — Fetch API

```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data"); // (1)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);                // (2)
        }
        const data = await response.json();                            // (3)
        return data;
    } catch (error) {
        console.error("Failed:", error.message);                       // (4)
        return null;
    }
}
```

1. **`await fetch(...)`** — `fetch` trả về một `Promise<Response>`. Nếu không có `await`, `response` sẽ là Promise chưa resolve, chưa có data. `await` giúp "chờ" đến khi network response về rồi mới tiếp tục.

2. **`response.ok`** — Là `false` khi status code nằm ngoài khoảng 200–299. Ví dụ:
   - `404 Not Found` — tài nguyên không tồn tại
   - `401 Unauthorized` — chưa xác thực
   - `500 Internal Server Error` — server lỗi

3. **`await response.json()`** — `.json()` cũng trả về Promise vì nó phải **đọc và parse body** của response (body là stream, chưa có sẵn toàn bộ). Cần `await` để chờ quá trình này hoàn tất.

4. **`try...catch` bắt được:**
   - ❌ Network error (mất mạng, DNS fail) → `fetch` reject
   - ❌ Lỗi do `throw new Error(...)` thủ công (status không ok)
   - ❌ JSON parse error (body không phải JSON hợp lệ)
   - ✅ **Không tự động** bắt lỗi HTTP 404/500 — phải tự check `response.ok`

---

### Câu A3 — Promise States & Callback Hell

**Ba trạng thái của Promise:**

```
           resolve(value)
Pending ──────────────────→ Fulfilled
   │
   │ reject(error)
   └──────────────────────→ Rejected
```

- **Pending:** Đang chờ (mới tạo, chưa có kết quả)
- **Fulfilled:** Thành công, có giá trị
- **Rejected:** Thất bại, có lý do lỗi

Một Promise đã settled (Fulfilled/Rejected) thì **không thể đổi trạng thái** nữa.

**Callback Hell (4 cấp):**

```javascript
// ❌ Callback Hell
getUser(userId, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                console.log(likes); // Pyramid of doom!
            }, handleError);
        }, handleError);
    }, handleError);
}, handleError);

// ✅ Refactor với async/await
async function getData(userId) {
    try {
        const user     = await getUser(userId);
        const posts    = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const likes    = await getLikes(comments[0].id);
        console.log(likes);
    } catch (error) {
        handleError(error);
    }
}
```

---

## PHẦN C — PHÂN TÍCH

---

### Câu C1 — Error Handling Strategy

**1. Network errors (mất mạng):**
```javascript
async function safeFetch(url) {
    try {
        const res = await fetch(url);
        return res;
    } catch (error) {
        // TypeError: Failed to fetch → mất mạng
        throw new Error("Không có kết nối mạng. Vui lòng kiểm tra lại.");
    }
}
```

**2. API errors theo status:**
```javascript
async function handleApiResponse(response) {
    if (response.ok) return response.json();

    switch (response.status) {
        case 400: throw new Error("Dữ liệu gửi lên không hợp lệ.");
        case 401: throw new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        case 403: throw new Error("Bạn không có quyền thực hiện thao tác này.");
        case 404: throw new Error("Không tìm thấy dữ liệu.");
        case 429: throw new Error("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
        case 500: throw new Error("Lỗi máy chủ. Vui lòng thử lại sau.");
        default:  throw new Error(`Lỗi HTTP: ${response.status}`);
    }
}
```

**3. Timeout:**
```javascript
function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);

    return fetch(url, { signal: controller.signal })
        .then(res => {
            clearTimeout(timeoutId);
            return res;
        })
        .catch(err => {
            if (err.name === "AbortError") {
                throw new Error(`Request timeout sau ${ms}ms`);
            }
            throw err;
        });
}
```

**4. Retry logic:**
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const res = await fetch(url);
            if (!res.ok && res.status >= 500) {
                throw new Error(`Server error: ${res.status}`);
            }
            return res;
        } catch (error) {
            if (attempt === maxRetries) throw error;
            const waitMs = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
            console.warn(`Lần ${attempt} thất bại. Thử lại sau ${waitMs}ms...`);
            await new Promise(r => setTimeout(r, waitMs));
        }
    }
}
```

---

### Câu C2 — Promise.all vs allSettled vs race vs any

| Method | Resolve khi | Reject khi | Use case |
|---|---|---|---|
| `.all()` | **Tất cả** fulfilled | **Bất kỳ 1** rejected | Cần đủ data từ nhiều API mới render được |
| `.allSettled()` | **Tất cả** settled (dù fulfilled hay rejected) | Không bao giờ reject | Dashboard — 1 widget lỗi không ảnh hưởng widget khác |
| `.race()` | **Cái đầu tiên** settle (fulfilled hoặc rejected) | Cái đầu tiên reject | Timeout: race giữa fetch và delay-reject |
| `.any()` | **Cái đầu tiên** fulfilled | **Tất cả** rejected | Fallback CDN: thử nhiều server, lấy cái nhanh nhất |

**Ví dụ thực tế:**

```javascript
// Promise.all — Trang thanh toán cần đủ: user + giỏ hàng + phương thức thanh toán
const [user, cart, paymentMethods] = await Promise.all([
    api.getUser(userId),
    api.getCart(userId),
    api.getPaymentMethods(userId)
]);

// Promise.allSettled — Dashboard tổng hợp: mỗi widget độc lập
const results = await Promise.allSettled([
    fetch("/api/weather").then(r => r.json()),
    fetch("/api/news").then(r => r.json()),
    fetch("/api/stocks").then(r => r.json())
]);
results.forEach((r, i) => {
    if (r.status === "fulfilled") renderWidget(i, r.value);
    else renderWidgetError(i, r.reason.message);
});

// Promise.race — Timeout: hủy nếu API chậm > 5 giây
const data = await Promise.race([
    fetch("https://slow-api.com/data").then(r => r.json()),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout 5s")), 5000))
]);

// Promise.any — Dùng CDN nhanh nhất (fallback)
const image = await Promise.any([
    fetch("https://cdn1.example.com/logo.png"),
    fetch("https://cdn2.example.com/logo.png"),
    fetch("https://cdn3.example.com/logo.png")
]);
```
