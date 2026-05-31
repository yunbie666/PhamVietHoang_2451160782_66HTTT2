// ============================================
// FILE: guess.js
// Bài B3 — Mini Game: Đoán số
// ============================================

const MAX_ATTEMPTS = 7;
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessedNumbers = [];
let gameOver = false;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessedNumbers = [];
    gameOver = false;
    updateUI();
}

function handleGuess() {
    if (gameOver) return;

    const input = document.getElementById("guessInput");
    const rawValue = input.value.trim();

    // Validate: phải là số
    const guess = Number(rawValue);
    if (rawValue === "" || isNaN(guess) || !Number.isInteger(guess)) {
        showMessage("⚠️ Vui lòng nhập một số nguyên!", "warning");
        return;
    }

    // Validate: phải trong phạm vi 1-100
    if (guess < 1 || guess > 100) {
        showMessage("⚠️ Hãy nhập số từ 1 đến 100!", "warning");
        return;
    }

    // Kiểm tra đã đoán số này chưa
    if (guessedNumbers.includes(guess)) {
        showMessage(`⚠️ Bạn đã đoán số ${guess} rồi! Thử số khác đi.`, "warning");
        return;
    }

    // Hợp lệ → xử lý
    attempts++;
    guessedNumbers.push(guess);
    input.value = "";

    const remaining = MAX_ATTEMPTS - attempts;

    if (guess === secretNumber) {
        // Thắng!
        gameOver = true;
        showMessage(`🎉 Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`, "success");
        document.getElementById("secretReveal").textContent = "";
        confetti(); // visual feedback
    } else if (attempts >= MAX_ATTEMPTS) {
        // Thua
        gameOver = true;
        showMessage(`😢 Hết lượt! Đáp án là ${secretNumber}.`, "danger");
        document.getElementById("secretReveal").textContent = `Đáp án: ${secretNumber}`;
    } else if (guess < secretNumber) {
        showMessage(`📈 Cao hơn! Còn ${remaining} lượt.`, "info");
    } else {
        showMessage(`📉 Thấp hơn! Còn ${remaining} lượt.`, "info");
    }

    updateUI();
}

function showMessage(text, type) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.className = "message " + type;
}

function updateUI() {
    const attemptsEl  = document.getElementById("attempts");
    const progressEl  = document.getElementById("progressBar");
    const historyEl   = document.getElementById("historyList");
    const guessBtn    = document.getElementById("guessBtn");
    const guessInput  = document.getElementById("guessInput");

    attemptsEl.textContent = `Lượt đã dùng: ${attempts} / ${MAX_ATTEMPTS}`;

    // Progress bar
    const pct = (attempts / MAX_ATTEMPTS) * 100;
    progressEl.style.width = pct + "%";
    progressEl.style.background = pct < 50 ? "#4ade80" : pct < 80 ? "#facc15" : "#f87171";

    // Lịch sử đoán
    historyEl.innerHTML = "";
    for (let i = 0; i < guessedNumbers.length; i++) {
        const li = document.createElement("li");
        const g = guessedNumbers[i];
        li.textContent = `Lần ${i+1}: ${g} ${g < secretNumber ? "📈" : g > secretNumber ? "📉" : "✅"}`;
        historyEl.appendChild(li);
    }

    // Disable input/button khi game over
    guessBtn.disabled = gameOver;
    guessInput.disabled = gameOver;
}

// Hiệu ứng confetti đơn giản khi thắng
function confetti() {
    const container = document.getElementById("confettiContainer");
    container.innerHTML = "";
    const colors = ["#f87171","#fb923c","#facc15","#4ade80","#60a5fa","#a78bfa"];
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDelay = Math.random() * 1 + "s";
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(piece);
    }
    setTimeout(() => container.innerHTML = "", 3000);
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
    startGame();
    document.getElementById("guessInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleGuess();
    });
});
