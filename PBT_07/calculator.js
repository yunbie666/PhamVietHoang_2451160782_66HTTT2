// ============================================
// FILE: calculator.js
// Bài B1 — Máy tính đơn giản
// ============================================

/**
 * Thực hiện phép tính giữa hai số
 * @param {*} num1 - Số thứ nhất
 * @param {string} operator - Toán tử: +, -, *, /, %, **
 * @param {*} num2 - Số thứ hai
 * @returns {number|string} Kết quả hoặc thông báo lỗi
 */
function calculate(num1, operator, num2) {
    // Validate: kiểm tra input có phải số không
    if (typeof num1 !== "number" || isNaN(num1)) {
        return `Lỗi: "${num1}" không phải số`;
    }
    if (typeof num2 !== "number" || isNaN(num2)) {
        return `Lỗi: "${num2}" không phải số`;
    }

    // Validate: kiểm tra operator hợp lệ
    const validOperators = ["+", "-", "*", "/", "%", "**"];
    if (!validOperators.includes(operator)) {
        return `Lỗi: Operator '${operator}' không hợp lệ`;
    }

    // Xử lý chia cho 0
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // Thực hiện phép tính
    switch (operator) {
        case "+":  return num1 + num2;
        case "-":  return num1 - num2;
        case "*":  return num1 * num2;
        case "/":  return num1 / num2;
        case "%":  return num1 % num2;
        case "**": return num1 ** num2;
    }
}

// ============================================
// TEST CASES
// ============================================
console.log("=== TEST CASES ===\n");

console.log("calculate(10, '+', 5)     →", calculate(10, "+", 5));     // 15
console.log("calculate(10, '-', 3)     →", calculate(10, "-", 3));     // 7
console.log("calculate(6, '*', 7)      →", calculate(6, "*", 7));      // 42
console.log("calculate(15, '/', 4)     →", calculate(15, "/", 4));     // 3.75
console.log("calculate(17, '%', 5)     →", calculate(17, "%", 5));     // 2
console.log("calculate(2, '**', 10)    →", calculate(2, "**", 10));    // 1024

console.log("\n--- Edge Cases ---");
console.log("calculate(10, '/', 0)     →", calculate(10, "/", 0));     // Lỗi chia 0
console.log("calculate(10, '%', 0)     →", calculate(10, "%", 0));     // Lỗi chia 0
console.log("calculate(10, '^', 5)     →", calculate(10, "^", 5));     // Lỗi operator
console.log("calculate('abc', '+', 5)  →", calculate("abc", "+", 5)); // Lỗi input
console.log("calculate(5, '+', 'xyz')  →", calculate(5, "+", "xyz")); // Lỗi input
console.log("calculate(NaN, '+', 5)    →", calculate(NaN, "+", 5));   // Lỗi NaN
