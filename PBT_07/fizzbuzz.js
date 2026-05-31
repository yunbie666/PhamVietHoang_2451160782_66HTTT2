// ============================================
// FILE: fizzbuzz.js
// Bài B4 — FizzBuzz nâng cao
// ============================================

// ============================================
// VERSION 1: Classic FizzBuzz (1 - 100)
// ============================================
console.log("=== VERSION 1: Classic FizzBuzz ===\n");

const classicResults = [];
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0)      classicResults.push("FizzBuzz");
    else if (i % 3 === 0)  classicResults.push("Fizz");
    else if (i % 5 === 0)  classicResults.push("Buzz");
    else                   classicResults.push(String(i));
}
console.log(classicResults.join(", "));

// ============================================
// VERSION 2: Custom FizzBuzz (generalized)
// ============================================
console.log("\n=== VERSION 2: Custom FizzBuzz ===\n");

/**
 * Custom FizzBuzz hoạt động với bất kỳ bộ rules nào
 * @param {number} n - In từ 1 đến n
 * @param {Array<{divisor: number, word: string}>} rules - Mảng rules
 */
function customFizzBuzz(n, rules) {
    const results = [];

    for (let i = 1; i <= n; i++) {
        let word = "";

        // Ghép tất cả words có divisor chia hết cho i
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                word += rules[j].word;
            }
        }

        // Nếu không khớp rule nào → dùng chính số đó
        results.push(word !== "" ? word : String(i));
    }

    console.log(results.join(", "));
    return results;
}

// Test với 3 rules: Fizz(3), Buzz(5), Jazz(7)
console.log("Rules: Fizz(÷3), Buzz(÷5), Jazz(÷7) — từ 1 đến 30:");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
]);

// Verify các số đặc biệt
console.log("\nKiểm tra số đặc biệt:");
const specialCheck = customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
]);
console.log("21  =", specialCheck[20]);  // FizzJazz
console.log("15  =", specialCheck[14]);  // FizzBuzz
console.log("35  =", specialCheck[34]);  // BuzzJazz
console.log("105 =", specialCheck[104]); // FizzBuzzJazz

// Test thêm với rules tùy ý
console.log("\nRules tùy ý: Foo(÷2), Bar(÷3) — từ 1 đến 12:");
customFizzBuzz(12, [
    { divisor: 2, word: "Foo" },
    { divisor: 3, word: "Bar" },
]);
