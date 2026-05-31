// ============================================================
// BÀI B2 — SHOPPING CART (CLOSURE PATTERN)
// ============================================================

function createCart() {
    // Private data — không thể truy cập từ bên ngoài
    let items = [];
    let discountAmount = 0;

    // Helper: định dạng số tiền
    const fmt = (n) => n.toLocaleString("vi-VN");

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existing = items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },

        // Tính tổng tiền (trước giảm giá)
        getSubtotal() {
            return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },

        // Tổng sau giảm giá
        getTotal() {
            return this.getSubtotal() - discountAmount;
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            const subtotal = this.getSubtotal();
            const codes = {
                "SALE10":   subtotal * 0.1,
                "SALE20":   subtotal * 0.2,
                "FREESHIP": 30000
            };
            if (codes[code] !== undefined) {
                discountAmount = codes[code];
                console.log(`✅ Áp dụng mã "${code}" — Giảm ${fmt(discountAmount)}đ`);
            } else {
                console.log(`❌ Mã "${code}" không hợp lệ`);
            }
        },

        // Tổng số lượng sản phẩm
        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },

        // In giỏ hàng dạng bảng
        printCart() {
            if (items.length === 0) {
                console.log("🛒 Giỏ hàng trống.");
                return;
            }

            const line = "─".repeat(62);
            console.log("┌" + line + "┐");
            console.log(`│ ${"#".padEnd(3)} │ ${"Sản phẩm".padEnd(16)} │ ${"SL".padEnd(3)} │ ${"Đơn giá".padStart(12)} │ ${"Thành tiền".padStart(12)} │`);
            console.log("├" + line + "┤");

            items.forEach((item, idx) => {
                const total = item.price * item.quantity;
                console.log(
                    `│ ${String(idx + 1).padEnd(3)} │ ${item.name.padEnd(16)} │ ${String(item.quantity).padEnd(3)} │ ${fmt(item.price).padStart(12)} │ ${fmt(total).padStart(12)} │`
                );
            });

            console.log("├" + line + "┤");
            const subtotal = this.getSubtotal();
            const total    = this.getTotal();

            if (discountAmount > 0) {
                console.log(`│ ${"Tạm tính:".padEnd(44)} ${fmt(subtotal).padStart(12)}đ │`);
                console.log(`│ ${"Giảm giá:".padEnd(44)} -${fmt(discountAmount).padStart(11)}đ │`);
                console.log("├" + line + "┤");
            }
            console.log(`│ ${"TỔNG CỘNG:".padEnd(44)} ${fmt(total).padStart(12)}đ │`);
            console.log("└" + line + "┘");
        },

        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountAmount = 0;
            console.log("🗑️  Giỏ hàng đã được xóa.");
        }
    };
}

// ============================================================
// TEST
// ============================================================
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000  }, 2);
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1); // → tăng lên 2

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

console.log("\n=== SAU KHI ÁP DỤNG SALE10 ===");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố sản phẩm:", cart.getItemCount()); // 4

cart.removeItem(3);
console.log("Sau khi xóa AirPods, số SP:", cart.getItemCount()); // 2

console.log("\n=== SAU KHI XÓA AIRPODS ===");
cart.printCart();

cart.updateQuantity(1, 3);
console.log("\n=== SAU KHI CẬP NHẬT IPHONE LÊN 3 CÁI ===");
cart.printCart();

cart.clearCart();
cart.printCart();
