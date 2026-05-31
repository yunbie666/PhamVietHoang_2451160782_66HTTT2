// ============================================
// FILE: student_data.js
// Bài B2 — Xử lý dữ liệu sinh viên
// ============================================

const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];

// ============================================
// 1. Tính điểm trung bình & xếp loại
// ============================================
function tinhTrungBinh(student) {
    return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}

function xepLoai(tb) {
    if (tb >= 8.0) return "Giỏi";
    if (tb >= 6.5) return "Khá";
    if (tb >= 5.0) return "Trung bình";
    return "Yếu";
}

// Thêm TB và xếp loại vào mỗi sinh viên
for (let i = 0; i < students.length; i++) {
    students[i].tb = tinhTrungBinh(students[i]);
    students[i].xepLoai = xepLoai(students[i].tb);
}

// ============================================
// 2. In bảng kết quả
// ============================================
console.log("=== BẢNG KẾT QUẢ ===\n");
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const stt = String(i + 1).padEnd(3);
    const ten = s.name.padEnd(6);
    const tb  = s.tb.toFixed(1).padEnd(4);
    const xl  = s.xepLoai.padEnd(11);
    console.log(`| ${stt} | ${ten} | ${tb} | ${xl} |`);
}

// ============================================
// 3. Đếm số sinh viên mỗi xếp loại
// ============================================
console.log("\n=== THỐNG KÊ XẾP LOẠI ===");
const count = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < students.length; i++) {
    count[students[i].xepLoai]++;
}
for (const loai in count) {
    console.log(`${loai}: ${count[loai]} sinh viên`);
}

// ============================================
// 4. Tìm SV điểm cao nhất & thấp nhất
// ============================================
console.log("\n=== ĐIỂM CAO NHẤT / THẤP NHẤT ===");
let max = students[0];
let min = students[0];

for (let i = 1; i < students.length; i++) {
    if (students[i].tb > max.tb) max = students[i];
    if (students[i].tb < min.tb) min = students[i];
}

console.log(`Cao nhất: ${max.name} — TB: ${max.tb.toFixed(1)} (${max.xepLoai})`);
console.log(`Thấp nhất: ${min.name} — TB: ${min.tb.toFixed(1)} (${min.xepLoai})`);

// ============================================
// 5. Điểm TB toàn lớp mỗi môn
// ============================================
console.log("\n=== ĐIỂM TRUNG BÌNH TỪNG MÔN ===");
let totalMath = 0, totalPhysics = 0, totalCS = 0;

for (let i = 0; i < students.length; i++) {
    totalMath    += students[i].math;
    totalPhysics += students[i].physics;
    totalCS      += students[i].cs;
}

const n = students.length;
console.log(`Toán:    ${(totalMath / n).toFixed(2)}`);
console.log(`Lý:      ${(totalPhysics / n).toFixed(2)}`);
console.log(`CNTT:    ${(totalCS / n).toFixed(2)}`);

// ============================================
// BONUS: TB theo giới tính
// ============================================
console.log("\n=== BONUS: TB THEO GIỚI TÍNH ===");
let sumM = 0, countM = 0;
let sumF = 0, countF = 0;

for (let i = 0; i < students.length; i++) {
    if (students[i].gender === "M") {
        sumM += students[i].tb;
        countM++;
    } else {
        sumF += students[i].tb;
        countF++;
    }
}

console.log(`Nam (M): TB = ${(sumM / countM).toFixed(2)} (${countM} SV)`);
console.log(`Nữ (F):  TB = ${(sumF / countF).toFixed(2)} (${countF} SV)`);
