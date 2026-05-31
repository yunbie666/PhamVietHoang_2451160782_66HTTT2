// ============================================
// FILE: var_let_const.js
// Mục đích: Kiểm chứng dự đoán Câu A1
// ============================================

console.log("=== ĐOẠN 1: var hoisting ===");
// Dự đoán: undefined (vì var được hoist nhưng chưa gán giá trị)
console.log(x); // → undefined
var x = 5;
console.log("x sau khi gán:", x); // → 5

console.log("\n=== ĐOẠN 2: let - TDZ ===");
// Dự đoán: ReferenceError (let nằm trong Temporal Dead Zone)
try {
    console.log(y); // → ReferenceError
    let y = 10;
} catch (e) {
    console.log("Lỗi như dự đoán:", e.message);
}

console.log("\n=== ĐOẠN 3: const không thể gán lại ===");
// Dự đoán: TypeError
try {
    const z = 15;
    z = 20; // → TypeError
    console.log(z);
} catch (e) {
    console.log("Lỗi như dự đoán:", e.message);
}

console.log("\n=== ĐOẠN 4: const array có thể mutate ===");
// Dự đoán: [1, 2, 3, 4]
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // → [1, 2, 3, 4]
// Giải thích: const khóa binding, không khóa nội dung object/array

console.log("\n=== ĐOẠN 5: let block scope ===");
// Dự đoán: "Trong block: 2", "Ngoài block: 1"
let a = 1;
{
    let a = 2; // Biến a khác hoàn toàn với a bên ngoài
    console.log("Trong block:", a); // → 2
}
console.log("Ngoài block:", a); // → 1
