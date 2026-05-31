// ============================================
// FILE: restaurant_bill.js
// Câu C2 — Hóa đơn nhà hàng
// ============================================

/**
 * Tính và in hóa đơn nhà hàng
 * @param {Array<{name, price, qty}>} items - Danh sách món ăn
 * @param {boolean} includeTip - Có tính tip không?
 * @param {Date} date - Ngày ăn (để check thứ 3)
 */
function printBill(items, includeTip = false, date = new Date()) {
    const LINE = "═".repeat(42);
    const THIN = "─".repeat(42);

    // ---- Tính subtotal ----
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price * items[i].qty;
    }

    // ---- Tính giảm giá ----
    let discountRate = 0;
    if (subtotal > 1000000)      discountRate = 15;
    else if (subtotal > 500000)  discountRate = 10;

    // Thứ 3 (getDay() === 2) giảm thêm 5%
    const isWednesday = date.getDay() === 3; // 0=CN, 1=T2, 2=T3, 3=T4...
    const isTuesday   = date.getDay() === 2;
    if (isTuesday) discountRate += 5;

    const discountAmount = Math.round(subtotal * discountRate / 100);
    const afterDiscount  = subtotal - discountAmount;

    // ---- Thuế & tip ----
    const vatRate    = 8;
    const vatAmount  = Math.round(afterDiscount * vatRate / 100);

    const tipRate    = includeTip ? 5 : 0;
    const tipAmount  = Math.round(afterDiscount * tipRate / 100);

    const total = afterDiscount + vatAmount + tipAmount;

    // ---- Format số tiền ----
    function fmt(n) {
        return n.toLocaleString("vi-VN") + "đ";
    }
    function fmtK(n) {
        return (n / 1000) + "k";
    }

    // ---- In hóa đơn ----
    console.log(`╔${LINE}╗`);
    console.log(`║${"      HÓA ĐƠN NHÀ HÀNG PHỞ GIA TRUYỀN".padEnd(42)}║`);
    console.log(`╠${LINE}╣`);

    for (let i = 0; i < items.length; i++) {
        const { name, price, qty } = items[i];
        const lineTotal = price * qty;
        const row = ` ${i+1}. ${name.padEnd(12)} x${qty}  @${fmtK(price).padStart(5)}  = ${fmtK(lineTotal).padStart(5)}`;
        console.log(`║${row.padEnd(42)}║`);
    }

    console.log(`╠${LINE}╣`);

    const rows = [
        [" Tổng cộng:",           fmt(subtotal)],
        [` Giảm giá (${discountRate}%):`, discountAmount > 0 ? `-${fmt(discountAmount)}` : "0đ"],
        [` VAT (${vatRate}%):`,         fmt(vatAmount)],
    ];
    if (includeTip) rows.push([` Tip (${tipRate}%):`, fmt(tipAmount)]);

    for (const [label, value] of rows) {
        console.log(`║${label.padEnd(28)}${value.padStart(13)} ║`);
    }

    if (isTuesday) {
        console.log(`║${"  🎉 Thứ 3 giảm thêm 5%!".padEnd(42)}║`);
    }

    console.log(`╠${LINE}╣`);
    const totalRow = ` THANH TOÁN:`;
    console.log(`║${totalRow.padEnd(28)}${fmt(total).padStart(13)} ║`);
    console.log(`╚${LINE}╝`);
}

// ============================================
// TEST
// ============================================
const order1 = [
    { name: "Phở bò",   price: 65000, qty: 2 },
    { name: "Trà đá",   price: 5000,  qty: 3 },
    { name: "Bún chả",  price: 55000, qty: 1 },
];

console.log("--- Hóa đơn 1 (không tip, ngày bình thường) ---\n");
printBill(order1, false, new Date("2025-01-06")); // Thứ 2

console.log("\n--- Hóa đơn 2 (có tip, thứ 3) ---\n");
const order2 = [
    { name: "Bít tết",   price: 185000, qty: 2 },
    { name: "Pasta",     price: 95000,  qty: 3 },
    { name: "Nước ép",   price: 45000,  qty: 4 },
    { name: "Tiramisu",  price: 75000,  qty: 2 },
];
printBill(order2, true, new Date("2025-01-07")); // Thứ 3
