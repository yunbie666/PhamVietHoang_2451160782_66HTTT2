// ============================================================
// FORM VALIDATOR — Bài B3
// Real-time validation, password strength, phone formatting
// ============================================================

// --- DOM Refs ---
const form          = document.getElementById("registerForm");
const submitBtn     = document.getElementById("submitBtn");
const successModal  = document.getElementById("successModal");
const modalInfo     = document.getElementById("modalInfo");
const modalOkBtn    = document.getElementById("modalOkBtn");

const inputName     = document.getElementById("inputName");
const inputEmail    = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const inputConfirm  = document.getElementById("inputConfirm");
const inputPhone    = document.getElementById("inputPhone");
const togglePw      = document.getElementById("togglePw");
const strengthFill  = document.getElementById("strengthFill");

// --- Validation state ---
const validity = {
    name:     false,
    email:    false,
    password: false,
    confirm:  false,
    phone:    false,
};

// ============================================================
// HELPERS
// ============================================================
function setFieldState(fieldName, isValid, message) {
    const group = document.getElementById(`group-${fieldName}`);
    const msg   = document.getElementById(`msg-${fieldName}`);
    const icon  = document.getElementById(`icon-${fieldName}`);

    validity[fieldName] = isValid;

    group.classList.remove("valid", "invalid");
    if (message !== "") {
        group.classList.add(isValid ? "valid" : "invalid");
    }

    if (msg)  msg.textContent  = message;
    if (icon) icon.textContent = message === "" ? "" : (isValid ? "✅" : "❌");

    checkSubmit();
}

function checkSubmit() {
    const allValid = Object.values(validity).every(Boolean);
    submitBtn.disabled = !allValid;
}

// ============================================================
// VALIDATE — TÊN
// ============================================================
inputName.addEventListener("input", () => {
    const val = inputName.value.trim();
    if (val.length === 0) {
        setFieldState("name", false, "Vui lòng nhập họ và tên");
    } else if (val.length < 2) {
        setFieldState("name", false, "Tên phải có ít nhất 2 ký tự");
    } else if (val.length > 50) {
        setFieldState("name", false, "Tên không được quá 50 ký tự");
    } else {
        setFieldState("name", true, "Tên hợp lệ ✓");
    }
});

// ============================================================
// VALIDATE — EMAIL
// ============================================================
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

inputEmail.addEventListener("input", () => {
    const val = inputEmail.value.trim();
    if (val.length === 0) {
        setFieldState("email", false, "Vui lòng nhập email");
    } else if (!val.includes("@")) {
        setFieldState("email", false, "Email phải chứa ký tự @");
    } else if (!emailRegex.test(val)) {
        setFieldState("email", false, "Định dạng email không hợp lệ (vd: abc@domain.com)");
    } else {
        setFieldState("email", true, "Email hợp lệ ✓");
    }
});

// ============================================================
// VALIDATE — PASSWORD + STRENGTH METER
// ============================================================
function getPasswordStrength(pw) {
    if (pw.length < 8) return { level: 0, label: "Yếu — cần ít nhất 8 ký tự", cls: "strength-weak", width: "25%" };

    const hasLower   = /[a-z]/.test(pw);
    const hasUpper   = /[A-Z]/.test(pw);
    const hasNumber  = /[0-9]/.test(pw);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

    const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

    if (score <= 2) return { level: 1, label: "Trung bình — thêm chữ hoa, số hoặc ký tự đặc biệt", cls: "strength-medium", width: "55%" };
    if (score === 3) return { level: 2, label: "Khá mạnh — thêm ký tự đặc biệt để mạnh hơn", cls: "strength-medium", width: "75%" };
    return { level: 3, label: "Mạnh 💪", cls: "strength-strong", width: "100%" };
}

inputPassword.addEventListener("input", () => {
    const val = inputPassword.value;

    if (val.length === 0) {
        strengthFill.style.width = "0";
        strengthFill.className   = "strength-fill";
        setFieldState("password", false, "Vui lòng nhập mật khẩu");
        // Re-validate confirm
        validateConfirm();
        return;
    }

    const strength = getPasswordStrength(val);
    strengthFill.style.width    = strength.width;
    strengthFill.className      = `strength-fill ${strength.cls}`;

    if (strength.level === 0) {
        setFieldState("password", false, `❌ ${strength.label}`);
    } else {
        setFieldState("password", true, `Độ mạnh: ${strength.label}`);
    }

    // Re-validate confirm
    validateConfirm();
});

// ============================================================
// VALIDATE — CONFIRM PASSWORD
// ============================================================
function validateConfirm() {
    const pw  = inputPassword.value;
    const cfm = inputConfirm.value;

    if (cfm.length === 0) {
        setFieldState("confirm", false, "Vui lòng xác nhận mật khẩu");
        return;
    }
    if (pw !== cfm) {
        setFieldState("confirm", false, "Mật khẩu không khớp");
    } else {
        setFieldState("confirm", true, "Mật khẩu khớp ✓");
    }
}

inputConfirm.addEventListener("input", validateConfirm);

// ============================================================
// VALIDATE — PHONE (tự thêm dấu gạch: 0901-234-567)
// ============================================================
inputPhone.addEventListener("input", () => {
    // Lấy chỉ số
    let digits = inputPhone.value.replace(/\D/g, "").slice(0, 10);

    // Format: 0901-234-567
    let formatted = digits;
    if (digits.length > 4 && digits.length <= 7) {
        formatted = digits.slice(0, 4) + "-" + digits.slice(4);
    } else if (digits.length > 7) {
        formatted = digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
    }

    inputPhone.value = formatted;

    if (digits.length === 0) {
        setFieldState("phone", false, "Vui lòng nhập số điện thoại");
    } else if (digits.length < 10) {
        setFieldState("phone", false, `Còn thiếu ${10 - digits.length} chữ số`);
    } else if (!/^(0[3-9])/.test(digits)) {
        setFieldState("phone", false, "Số điện thoại Việt Nam phải bắt đầu bằng 03x-09x");
    } else {
        setFieldState("phone", true, "Số điện thoại hợp lệ ✓");
    }
});

// ============================================================
// TOGGLE PASSWORD VISIBILITY
// ============================================================
togglePw.addEventListener("click", () => {
    const type = inputPassword.type === "password" ? "text" : "password";
    inputPassword.type = type;
    togglePw.textContent = type === "password" ? "👁" : "🙈";
});

// ============================================================
// SUBMIT
// ============================================================
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    // Hiện modal với thông tin
    modalInfo.innerHTML = "";

    const data = [
        { label: "Họ và tên",    value: inputName.value.trim() },
        { label: "Email",        value: inputEmail.value.trim() },
        { label: "Số điện thoại", value: inputPhone.value },
    ];

    data.forEach(item => {
        const line = document.createElement("div");
        const strong = document.createElement("strong");
        strong.textContent = item.label + ": ";
        const span = document.createElement("span");
        span.textContent = item.value;
        line.appendChild(strong);
        line.appendChild(span);
        modalInfo.appendChild(line);
    });

    successModal.classList.remove("hidden");
});

modalOkBtn.addEventListener("click", () => {
    successModal.classList.add("hidden");
    form.reset();
    // Reset validation state
    Object.keys(validity).forEach(k => { validity[k] = false; });
    document.querySelectorAll(".field-group").forEach(g => g.classList.remove("valid", "invalid"));
    document.querySelectorAll(".field-msg").forEach(m => m.textContent = "");
    document.querySelectorAll(".field-icon").forEach(i => i.textContent = "");
    strengthFill.style.width = "0";
    strengthFill.className   = "strength-fill";
    checkSubmit();
});
