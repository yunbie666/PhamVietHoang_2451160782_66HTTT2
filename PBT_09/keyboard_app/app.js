// ============================================================
// KEYBOARD SHORTCUTS & ACCESSIBILITY — Bài B4
// Gallery + Command Palette + Focus Management
// ============================================================

// ============================================================
// GALLERY DATA
// ============================================================
const photos = [
    { id: 1, src: "https://placehold.co/800x500/6366f1/white?text=Photo+1",  caption: "📸 Bức ảnh 1 — Thành phố về đêm",   alt: "Thành phố về đêm" },
    { id: 2, src: "https://placehold.co/800x500/ec4899/white?text=Photo+2",  caption: "🌸 Bức ảnh 2 — Mùa hoa anh đào",    alt: "Hoa anh đào" },
    { id: 3, src: "https://placehold.co/800x500/f59e0b/white?text=Photo+3",  caption: "🌅 Bức ảnh 3 — Bình minh trên biển", alt: "Bình minh biển" },
    { id: 4, src: "https://placehold.co/800x500/10b981/white?text=Photo+4",  caption: "🏔️ Bức ảnh 4 — Núi tuyết phủ",      alt: "Núi tuyết" },
    { id: 5, src: "https://placehold.co/800x500/3b82f6/white?text=Photo+5",  caption: "🌊 Bức ảnh 5 — Đại dương xanh",     alt: "Đại dương" },
    { id: 6, src: "https://placehold.co/800x500/8b5cf6/white?text=Photo+6",  caption: "🌌 Bức ảnh 6 — Dải Ngân Hà",        alt: "Ngân hà" },
    { id: 7, src: "https://placehold.co/800x500/ef4444/white?text=Photo+7",  caption: "🍁 Bức ảnh 7 — Lá phong mùa thu",   alt: "Lá phong" },
    { id: 8, src: "https://placehold.co/800x500/0d9488/white?text=Photo+8",  caption: "🌿 Bức ảnh 8 — Rừng nhiệt đới",     alt: "Rừng nhiệt đới" },
    { id: 9, src: "https://placehold.co/800x500/f97316/white?text=Photo+9",  caption: "🏜️ Bức ảnh 9 — Sa mạc hoàng hôn",  alt: "Sa mạc hoàng hôn" },
];

// ============================================================
// COMMANDS DATA
// ============================================================
const commands = [
    { id: "toggle-dark",   icon: "🌙", name: "Toggle Dark Mode",      desc: "Chuyển sáng/tối",         shortcut: "Ctrl+D",  action: () => document.body.classList.toggle("light-mode") },
    { id: "open-gallery",  icon: "🖼️", name: "Mở Gallery",            desc: "Xem ảnh đầu tiên",        shortcut: "G",       action: () => openGalleryModal(0) },
    { id: "play-slide",    icon: "▶️",  name: "Play Slideshow",        desc: "Bắt đầu trình chiếu",     shortcut: "Space",   action: togglePlay },
    { id: "next-photo",    icon: "➡️",  name: "Ảnh tiếp theo",         desc: "Chuyển sang ảnh kế",      shortcut: "→",       action: () => navigate(1) },
    { id: "prev-photo",    icon: "⬅️",  name: "Ảnh trước",             desc: "Quay lại ảnh trước",      shortcut: "←",       action: () => navigate(-1) },
    { id: "goto-first",    icon: "⏮️",  name: "Ảnh đầu tiên",          desc: "Nhảy về ảnh số 1",        shortcut: "1",       action: () => goTo(0) },
    { id: "goto-last",     icon: "⏭️",  name: "Ảnh cuối cùng",         desc: "Nhảy đến ảnh số 9",       shortcut: "9",       action: () => goTo(8) },
    { id: "close-modal",   icon: "✕",  name: "Đóng Modal",            desc: "Esc để đóng cửa sổ",      shortcut: "Esc",     action: closeAll },
    { id: "open-palette",  icon: "⌘",  name: "Mở Command Palette",    desc: "Ctrl+K để mở palette",    shortcut: "Ctrl+K",  action: openPalette },
    { id: "focus-grid",    icon: "🎯",  name: "Focus danh sách lệnh",  desc: "Di chuyển bằng Tab/Enter",shortcut: "Tab",     action: () => document.querySelector(".cmd-card")?.focus() },
];

// ============================================================
// STATE
// ============================================================
let currentIndex     = 0;
let isPlaying        = false;
let slideshowTimer   = null;
let modalOpen        = false;
let paletteOpen      = false;
let paletteSelected  = -1;
let filteredCommands = [...commands];

// ============================================================
// DOM REFS
// ============================================================
const thumbnailsContainer = document.getElementById("thumbnails");
const slideIndicator      = document.getElementById("slideIndicator");
const prevBtn             = document.getElementById("prevBtn");
const nextBtn             = document.getElementById("nextBtn");
const playBtn             = document.getElementById("playBtn");
const commandsGrid        = document.getElementById("commandsGrid");
const galleryModal        = document.getElementById("galleryModal");
const gmImage             = document.getElementById("gmImage");
const gmCaption           = document.getElementById("gmCaption");
const gmClose             = document.getElementById("gmClose");
const gmPrev              = document.getElementById("gmPrev");
const gmNext              = document.getElementById("gmNext");
const paletteOverlay      = document.getElementById("paletteOverlay");
const paletteInput        = document.getElementById("paletteInput");
const paletteList         = document.getElementById("paletteList");

// ============================================================
// TOAST
// ============================================================
let toastEl = null;

function showToast(message) {
    if (!toastEl) {
        toastEl = document.createElement("div");
        toastEl.classList.add("toast");
        document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => toastEl.classList.remove("show"), 2500);
}

// ============================================================
// GALLERY — RENDER THUMBNAILS
// ============================================================
function renderThumbnails() {
    thumbnailsContainer.innerHTML = "";
    photos.forEach((photo, index) => {
        const div = document.createElement("div");
        div.classList.add("thumb");
        if (index === currentIndex) div.classList.add("active");
        div.dataset.index = index;
        div.setAttribute("role", "listitem");
        div.setAttribute("tabindex", "0");
        div.setAttribute("aria-label", `${photo.alt} — ảnh số ${index + 1}`);

        const img = document.createElement("img");
        img.src     = photo.src;
        img.alt     = photo.alt;
        img.loading = "lazy";

        const num = document.createElement("span");
        num.classList.add("thumb-number");
        num.textContent = index + 1;

        div.appendChild(img);
        div.appendChild(num);
        thumbnailsContainer.appendChild(div);
    });

    updateSlideIndicator();
}

function updateSlideIndicator() {
    slideIndicator.textContent = `${currentIndex + 1} / ${photos.length}`;

    document.querySelectorAll(".thumb").forEach((t, i) => {
        t.classList.toggle("active", i === currentIndex);
    });
}

// ============================================================
// GALLERY — NAVIGATION
// ============================================================
function navigate(dir) {
    currentIndex = (currentIndex + dir + photos.length) % photos.length;
    updateSlideIndicator();
    if (modalOpen) updateGalleryModal();
}

function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, photos.length - 1));
    updateSlideIndicator();
    if (modalOpen) updateGalleryModal();
    showToast(`📸 Ảnh ${currentIndex + 1}`);
}

// ============================================================
// GALLERY — MODAL
// ============================================================
function openGalleryModal(index) {
    currentIndex = index;
    updateGalleryModal();
    galleryModal.classList.remove("hidden");
    modalOpen = true;
    gmClose.focus();
    document.body.style.overflow = "hidden";
}

function updateGalleryModal() {
    const photo = photos[currentIndex];
    gmImage.src     = photo.src;
    gmImage.alt     = photo.alt;
    gmCaption.textContent = photo.caption;
    updateSlideIndicator();
}

function closeGalleryModal() {
    galleryModal.classList.add("hidden");
    modalOpen = false;
    document.body.style.overflow = "";
}

// ============================================================
// SLIDESHOW
// ============================================================
function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.textContent       = isPlaying ? "⏸ Pause" : "▶️ Play";
    playBtn.setAttribute("aria-pressed", isPlaying);
    playBtn.classList.toggle("playing", isPlaying);

    if (isPlaying) {
        slideshowTimer = setInterval(() => navigate(1), 2500);
        showToast("▶️ Đang phát slideshow");
    } else {
        clearInterval(slideshowTimer);
        showToast("⏸ Đã tạm dừng");
    }
}

// ============================================================
// COMMANDS — RENDER
// ============================================================
function renderCommands() {
    commandsGrid.innerHTML = "";
    commands.forEach(cmd => {
        const card = document.createElement("div");
        card.classList.add("cmd-card");
        card.dataset.cmdId = cmd.id;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `${cmd.name}: ${cmd.desc}`);

        const icon = document.createElement("div");
        icon.classList.add("cmd-icon");
        icon.textContent = cmd.icon;
        icon.setAttribute("aria-hidden", "true");

        const info = document.createElement("div");
        info.classList.add("cmd-info");

        const name = document.createElement("div");
        name.classList.add("cmd-name");
        name.textContent = cmd.name;

        const desc = document.createElement("div");
        desc.classList.add("cmd-desc");
        desc.textContent = cmd.desc;

        const shortcut = document.createElement("div");
        shortcut.classList.add("cmd-shortcut");
        shortcut.textContent = cmd.shortcut;

        info.appendChild(name);
        info.appendChild(desc);
        card.appendChild(icon);
        card.appendChild(info);
        card.appendChild(shortcut);
        commandsGrid.appendChild(card);
    });
}

// Event delegation on commands grid
commandsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".cmd-card");
    if (!card) return;
    const cmd = commands.find(c => c.id === card.dataset.cmdId);
    if (cmd) {
        cmd.action();
        showToast(`✅ ${cmd.name}`);
    }
});

commandsGrid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".cmd-card");
        if (!card) return;
        e.preventDefault();
        const cmd = commands.find(c => c.id === card.dataset.cmdId);
        if (cmd) {
            cmd.action();
            showToast(`✅ ${cmd.name}`);
        }
    }
});

// ============================================================
// COMMAND PALETTE
// ============================================================
function openPalette() {
    paletteOpen = true;
    paletteSelected = -1;
    paletteInput.value = "";
    filteredCommands = [...commands];
    renderPaletteList();
    paletteOverlay.classList.remove("hidden");
    paletteInput.focus();
    document.body.style.overflow = "hidden";
}

function closePalette() {
    paletteOpen = false;
    paletteOverlay.classList.add("hidden");
    document.body.style.overflow = "";
}

function renderPaletteList() {
    paletteList.innerHTML = "";

    if (filteredCommands.length === 0) {
        const empty = document.createElement("div");
        empty.classList.add("palette-empty");
        empty.textContent = "Không tìm thấy lệnh nào 🤔";
        paletteList.appendChild(empty);
        return;
    }

    filteredCommands.forEach((cmd, index) => {
        const li = document.createElement("li");
        li.classList.add("palette-item");
        if (index === paletteSelected) li.classList.add("selected");
        li.dataset.index = index;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", index === paletteSelected);

        const icon = document.createElement("div");
        icon.classList.add("cmd-icon");
        icon.textContent = cmd.icon;

        const info = document.createElement("div");
        info.classList.add("cmd-info");

        const name = document.createElement("div");
        name.classList.add("cmd-name");
        name.textContent = cmd.name;

        const desc = document.createElement("div");
        desc.classList.add("cmd-desc");
        desc.textContent = cmd.desc;

        info.appendChild(name);
        info.appendChild(desc);
        li.appendChild(icon);
        li.appendChild(info);
        paletteList.appendChild(li);
    });
}

paletteInput.addEventListener("input", () => {
    const q = paletteInput.value.toLowerCase();
    filteredCommands = commands.filter(cmd =>
        cmd.name.toLowerCase().includes(q) ||
        cmd.desc.toLowerCase().includes(q)
    );
    paletteSelected = -1;
    renderPaletteList();
});

paletteList.addEventListener("click", (e) => {
    const item = e.target.closest(".palette-item");
    if (!item) return;
    const index = parseInt(item.dataset.index);
    executeCommand(index);
});

function executeCommand(index) {
    const cmd = filteredCommands[index];
    if (!cmd) return;
    closePalette();
    setTimeout(() => {
        cmd.action();
        showToast(`✅ ${cmd.name}`);
    }, 100);
}

// ============================================================
// CLOSE ALL
// ============================================================
function closeAll() {
    if (modalOpen)   closeGalleryModal();
    if (paletteOpen) closePalette();
}

// ============================================================
// KEYBOARD EVENTS — Global
// ============================================================
document.addEventListener("keydown", (e) => {
    // Ctrl+K → Command palette
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        paletteOpen ? closePalette() : openPalette();
        return;
    }

    // Palette navigation
    if (paletteOpen) {
        if (e.key === "Escape") { closePalette(); return; }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            paletteSelected = Math.min(paletteSelected + 1, filteredCommands.length - 1);
            renderPaletteList();
            paletteList.querySelectorAll(".palette-item")[paletteSelected]?.scrollIntoView({ block: "nearest" });
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            paletteSelected = Math.max(paletteSelected - 1, 0);
            renderPaletteList();
            paletteList.querySelectorAll(".palette-item")[paletteSelected]?.scrollIntoView({ block: "nearest" });
            return;
        }
        if (e.key === "Enter" && paletteSelected >= 0) {
            executeCommand(paletteSelected);
            return;
        }
        return; // don't process other keys while palette is open
    }

    // Modal shortcuts
    if (modalOpen) {
        if (e.key === "Escape")     { closeGalleryModal(); return; }
        if (e.key === "ArrowLeft")  { navigate(-1); return; }
        if (e.key === "ArrowRight") { navigate(1);  return; }
    }

    // Don't capture keys when typing in inputs
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    // Gallery navigation shortcuts (no modal needed)
    if (e.key === "ArrowLeft")  { navigate(-1); return; }
    if (e.key === "ArrowRight") { navigate(1);  return; }
    if (e.key === " ")          { e.preventDefault(); togglePlay(); return; }
    if (e.key === "Escape")     { closeAll(); return; }

    // Number keys 1-9
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) { goTo(num - 1); }
});

// ============================================================
// INLINE BUTTON EVENTS
// ============================================================
prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));
playBtn.addEventListener("click", togglePlay);
gmClose.addEventListener("click", closeGalleryModal);
gmPrev.addEventListener("click",  () => navigate(-1));
gmNext.addEventListener("click",  () => navigate(1));

// Thumbnail clicks — Event Delegation
thumbnailsContainer.addEventListener("click", (e) => {
    const thumb = e.target.closest(".thumb");
    if (!thumb) return;
    openGalleryModal(parseInt(thumb.dataset.index));
});

// Keyboard on thumbnails
thumbnailsContainer.addEventListener("keydown", (e) => {
    const thumb = e.target.closest(".thumb");
    if (!thumb) return;
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGalleryModal(parseInt(thumb.dataset.index));
    }
});

// Close modal on overlay click
galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) closeGalleryModal();
});

paletteOverlay.addEventListener("click", (e) => {
    if (e.target === paletteOverlay) closePalette();
});

// ============================================================
// INIT
// ============================================================
renderThumbnails();
renderCommands();
showToast("⌨️ Nhấn Ctrl+K để mở Command Palette");
