// ============================================================
// BÀI B3 — HIGHER-ORDER FUNCTIONS
// ============================================================

// 1. pipe() — Nối chuỗi functions (trái → phải)
function pipe(...fns) {
    return function(value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log("=== PIPE ===");
console.log(process(5)); // → "Kết quả: 20"
console.log(process(0)); // → "Kết quả: 10"

// ─────────────────────────────────────────────────────────────

// 2. memoize() — Cache kết quả theo arguments
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== MEMOIZE ===");
console.log(expensiveCalc(1000000)); // In "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // Không in, lấy cache → 499999500000
console.log(expensiveCalc(500));     // In "Đang tính..." → 124750 (tham số khác)
console.log(expensiveCalc(500));     // Cache → 124750

// ─────────────────────────────────────────────────────────────

// 3. debounce() — Chỉ chạy sau khi ngừng gọi `delay` ms
function debounce(fn, delay) {
    let timerId = null;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\n=== DEBOUNCE ===");
// Giả lập gõ nhanh liên tục — chỉ lần gọi cuối (sau 500ms ngừng) mới chạy
search("i");
search("ip");
search("iph");
search("ipho");
search("iphon");
search("iphone"); // ← chỉ cái này được chạy sau 500ms

// ─────────────────────────────────────────────────────────────

// 4. retry() — Thử lại tối đa `maxAttempts` lần nếu lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`Lần thử ${attempt}/${maxAttempts}...`);
            const result = await fn();
            console.log(`✅ Thành công ở lần thử ${attempt}`);
            return result;
        } catch (error) {
            lastError = error;
            console.warn(`❌ Lần thử ${attempt} thất bại: ${error.message}`);
            if (attempt < maxAttempts) {
                // Chờ tăng dần: 500ms, 1000ms, 1500ms...
                await new Promise(r => setTimeout(r, attempt * 500));
            }
        }
    }
    throw new Error(`Thất bại sau ${maxAttempts} lần thử. Lỗi cuối: ${lastError.message}`);
}

// Demo retry:
console.log("\n=== RETRY ===");
let callCount = 0;
const unreliableFn = () => {
    callCount++;
    return new Promise((resolve, reject) => {
        if (callCount < 3) {
            reject(new Error("Lỗi mạng giả lập"));
        } else {
            resolve("Dữ liệu thành công!");
        }
    });
};

retry(unreliableFn, 3)
    .then(result => console.log("Kết quả:", result))
    .catch(err => console.error("Hết lần thử:", err.message));
