// ============================================================
// PRODUCT CATALOG — Bài B2
// 100% DOM rendering, no framework
// ============================================================

// --- DATA ---
const products = [
    { id: 1,  name: "iPhone 16 Pro",        price: 32990000, category: "phone",    image: "https://placehold.co/400x300/6366f1/white?text=iPhone+16+Pro",   rating: 4.8, inStock: true,  desc: "Chip A18 Pro, camera 48MP, màn hình Super Retina XDR 6.3 inch." },
    { id: 2,  name: "Samsung Galaxy S25",   price: 26990000, category: "phone",    image: "https://placehold.co/400x300/ec4899/white?text=Galaxy+S25",       rating: 4.6, inStock: true,  desc: "Snapdragon 8 Elite, camera 200MP, pin 5000mAh, sạc nhanh 65W." },
    { id: 3,  name: "Xiaomi 15 Ultra",      price: 21990000, category: "phone",    image: "https://placehold.co/400x300/f59e0b/white?text=Xiaomi+15+Ultra",  rating: 4.5, inStock: false, desc: "Camera Leica 50MP, Snapdragon 8 Gen 4, màn hình AMOLED 6.73 inch." },
    { id: 4,  name: "Oppo Reno 13",         price: 12990000, category: "phone",    image: "https://placehold.co/400x300/10b981/white?text=Oppo+Reno+13",     rating: 4.2, inStock: true,  desc: "Thiết kế mỏng nhẹ, camera selfie 50MP, sạc SUPERVOOC 80W." },
    { id: 5,  name: "MacBook Air M3",       price: 34990000, category: "laptop",   image: "https://placehold.co/400x300/6366f1/white?text=MacBook+Air+M3",   rating: 4.9, inStock: true,  desc: "Chip M3, màn hình Liquid Retina 15 inch, pin 18 giờ, không quạt." },
    { id: 6,  name: "Dell XPS 15",          price: 42990000, category: "laptop",   image: "https://placehold.co/400x300/3b82f6/white?text=Dell+XPS+15",      rating: 4.7, inStock: true,  desc: "Intel Core Ultra 9, RTX 4070, màn hình OLED 4K cảm ứng." },
    { id: 7,  name: "Asus ROG Zephyrus",    price: 49990000, category: "laptop",   image: "https://placehold.co/400x300/ef4444/white?text=ROG+Zephyrus",     rating: 4.6, inStock: false, desc: "AMD Ryzen 9, RTX 4090, màn hình 240Hz QHD, dành cho game thủ." },
    { id: 8,  name: "Lenovo ThinkPad X1",   price: 38990000, category: "laptop",   image: "https://placehold.co/400x300/64748b/white?text=ThinkPad+X1",      rating: 4.5, inStock: true,  desc: "Intel Core Ultra 7, bảo mật vân tay + nhận diện khuôn mặt." },
    { id: 9,  name: "iPad Pro M4",          price: 28990000, category: "tablet",   image: "https://placehold.co/400x300/8b5cf6/white?text=iPad+Pro+M4",      rating: 4.8, inStock: true,  desc: "Chip M4, màn hình OLED 13 inch, hỗ trợ Apple Pencil Pro." },
    { id: 10, name: "Samsung Tab S10+",     price: 22990000, category: "tablet",   image: "https://placehold.co/400x300/0ea5e9/white?text=Tab+S10+Plus",     rating: 4.5, inStock: true,  desc: "Snapdragon 8 Gen 3, màn hình Dynamic AMOLED 12.4 inch." },
    { id: 11, name: "Sony WH-1000XM6",      price: 8990000,  category: "audio",    image: "https://placehold.co/400x300/0d9488/white?text=Sony+WH1000XM6",   rating: 4.9, inStock: true,  desc: "Chống ồn chủ động hàng đầu, pin 40 giờ, kết nối multipoint." },
    { id: 12, name: "AirPods Pro 3",        price: 7990000,  category: "audio",    image: "https://placehold.co/400x300/6366f1/white?text=AirPods+Pro+3",    rating: 4.7, inStock: true,  desc: "ANC cải tiến, chip H3, lossless audio qua USB-C." },
    { id: 13, name: "JBL Flip 7",           price: 2990000,  category: "audio",    image: "https://placehold.co/400x300/f97316/white?text=JBL+Flip+7",       rating: 4.4, inStock: true,  desc: "Loa Bluetooth chống nước IP67, pin 12 giờ, bass mạnh." },
    { id: 14, name: "Xiaomi Smart TV 55\"", price: 11990000, category: "tablet",   image: "https://placehold.co/400x300/f59e0b/white?text=Xiaomi+TV+55",     rating: 4.3, inStock: false, desc: "4K QLED, Google TV, Dolby Vision, HDR10+, 120Hz." },
];

// --- State ---
let cartCount       = 0;
let currentCategory = "all";
let currentSort     = "";
let currentSearch   = "";

// --- DOM Refs ---
const productGrid    = document.getElementById("productGrid");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput    = document.getElementById("searchInput");
const sortSelect     = document.getElementById("sortSelect");
const cartBadge      = document.getElementById("cartBadge");
const cartIcon       = document.getElementById("cartIcon");
const darkModeToggle = document.getElementById("darkModeToggle");
const modalOverlay   = document.getElementById("modalOverlay");
const modalContent   = document.getElementById("modalContent");
const modalClose     = document.getElementById("modalClose");

// ============================================================
// HELPERS
// ============================================================
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "₫";
}

function renderStars(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(empty) + ` (${rating})`;
}

// ============================================================
// FILTER, SEARCH, SORT
// ============================================================
function getDisplayProducts() {
    let list = [...products];

    // Filter category
    if (currentCategory !== "all") {
        list = list.filter(p => p.category === currentCategory);
    }

    // Search
    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        list = list.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }

    // Sort
    switch (currentSort) {
        case "price-asc":   list.sort((a, b) => a.price - b.price);           break;
        case "price-desc":  list.sort((a, b) => b.price - a.price);           break;
        case "name-asc":    list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "rating-desc": list.sort((a, b) => b.rating - a.rating);         break;
    }

    return list;
}

// ============================================================
// RENDER CATEGORIES
// ============================================================
function renderCategories() {
    const categories = ["all", ...new Set(products.map(p => p.category))];
    const labels = { all: "Tất cả", phone: "📱 Điện thoại", laptop: "💻 Laptop", tablet: "📱 Tablet", audio: "🎧 Âm thanh" };

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.classList.add("cat-btn");
        if (cat === currentCategory) btn.classList.add("active");
        btn.textContent = labels[cat] || cat;
        btn.dataset.category = cat;
        categoryFilters.appendChild(btn);
    });
}

// ============================================================
// RENDER PRODUCTS
// ============================================================
function renderProducts() {
    productGrid.innerHTML = "";
    const list = getDisplayProducts();

    list.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    if (!product.inStock) card.classList.add("out-of-stock");
    card.dataset.id = product.id;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("product-img");
    img.loading = "lazy";

    const info = document.createElement("div");
    info.classList.add("product-info");

    const category = document.createElement("div");
    category.classList.add("product-category");
    category.textContent = product.category;

    const name = document.createElement("div");
    name.classList.add("product-name");
    name.textContent = product.name;

    const rating = document.createElement("div");
    rating.classList.add("product-rating");
    rating.textContent = renderStars(product.rating);

    const price = document.createElement("div");
    price.classList.add("product-price");
    price.textContent = formatPrice(product.price);

    const stock = document.createElement("div");
    stock.classList.add("stock-badge");
    stock.classList.add(product.inStock ? "in-stock" : "out-stock");
    stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";

    info.appendChild(category);
    info.appendChild(name);
    info.appendChild(rating);
    info.appendChild(price);
    info.appendChild(stock);

    const addBtn = document.createElement("button");
    addBtn.classList.add("btn-add-cart");
    addBtn.textContent = "🛒 Thêm giỏ hàng";
    addBtn.disabled = !product.inStock;
    addBtn.dataset.action = "add-cart";

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(addBtn);

    return card;
}

// ============================================================
// MODAL
// ============================================================
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalContent.innerHTML = "";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const h2 = document.createElement("h2");
    h2.textContent = product.name;

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("modal-price");
    priceDiv.textContent = formatPrice(product.price);

    const meta = document.createElement("div");
    meta.classList.add("modal-meta");

    const ratingSpan = document.createElement("span");
    ratingSpan.textContent = "⭐ " + renderStars(product.rating);

    const stockSpan = document.createElement("span");
    stockSpan.classList.add("stock-badge", product.inStock ? "in-stock" : "out-stock");
    stockSpan.textContent = product.inStock ? "✅ Còn hàng" : "❌ Hết hàng";

    meta.appendChild(ratingSpan);
    meta.appendChild(stockSpan);

    const desc = document.createElement("p");
    desc.textContent = product.desc;

    modalContent.appendChild(img);
    modalContent.appendChild(h2);
    modalContent.appendChild(priceDiv);
    modalContent.appendChild(meta);
    modalContent.appendChild(desc);

    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
}

// ============================================================
// CART
// ============================================================
function addToCart() {
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.classList.remove("hidden");
    cartIcon.style.animation = "none";
    requestAnimationFrame(() => {
        cartIcon.style.animation = "bounce 0.4s ease";
    });
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Category filter — Event Delegation
categoryFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderProducts();
});

// Search realtime
searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value.trim();
    renderProducts();
});

// Sort
sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    renderProducts();
});

// Product card clicks — Event Delegation
productGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = parseInt(card.dataset.id);

    // Add to cart
    if (e.target.dataset.action === "add-cart") {
        addToCart();
        e.target.textContent = "✅ Đã thêm!";
        setTimeout(() => { e.target.textContent = "🛒 Thêm giỏ hàng"; }, 1500);
        return;
    }

    // Open modal
    openModal(id);
});

// Close modal
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// Dark mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("darkMode", isDark);
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
}

// Cart bounce animation
const styleTag = document.createElement("style");
styleTag.textContent = `@keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }`;
document.head.appendChild(styleTag);

// ============================================================
// INIT
// ============================================================
renderCategories();
renderProducts();
