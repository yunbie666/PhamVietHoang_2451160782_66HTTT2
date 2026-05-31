// ============================================================
// TODO APP — Bài B1
// Vanilla JS: createElement, Event Delegation, LocalStorage
// ============================================================

// --- DOM Refs ---
const todoForm     = document.querySelector("#todoForm");
const todoInput    = document.querySelector("#todoInput");
const todoList     = document.querySelector("#todoList");
const itemCount    = document.querySelector("#itemCount");
const clearBtn     = document.querySelector("#clearCompleted");
const filterBtns   = document.querySelectorAll(".filter-btn");

// --- State ---
let todos         = loadFromStorage();
let currentFilter = "all";

// ============================================================
// STORAGE
// ============================================================
function loadFromStorage() {
    try {
        const data = localStorage.getItem("todos");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ============================================================
// RENDER
// ============================================================
function getFilteredTodos() {
    switch (currentFilter) {
        case "active":    return todos.filter(t => !t.completed);
        case "completed": return todos.filter(t => t.completed);
        default:          return todos;
    }
}

function renderTodos() {
    todoList.innerHTML = "";
    const filtered = getFilteredTodos();

    filtered.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    updateCount();
}

function createTodoElement(todo) {
    // <li class="todo-item [completed]" data-id="...">
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) li.classList.add("completed");
    li.dataset.id = todo.id;

    // Checkbox
    const checkbox = document.createElement("div");
    checkbox.classList.add("todo-checkbox");
    if (todo.completed) checkbox.textContent = "✓";

    // Text
    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo-delete");
    deleteBtn.textContent = "🗑";
    deleteBtn.setAttribute("aria-label", "Xóa todo");
    deleteBtn.dataset.action = "delete";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function updateCount() {
    const remaining = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${remaining} việc còn lại`;
}

// ============================================================
// CRUD
// ============================================================
function addTodo(text) {
    const todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false
    };
    todos.push(todo);
    saveToStorage();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveToStorage();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToStorage();
        renderTodos();
    }
}

function updateTodoText(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo && newText.trim()) {
        todo.text = newText.trim();
        saveToStorage();
        renderTodos();
    }
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveToStorage();
    renderTodos();
}

// ============================================================
// EDIT MODE
// ============================================================
function startEdit(li) {
    if (li.classList.contains("editing")) return;

    const span = li.querySelector(".todo-text");
    const id   = li.dataset.id;
    const originalText = span.textContent;

    li.classList.add("editing");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("todo-edit-input");
    input.value = originalText;

    span.replaceWith(input);
    input.focus();
    input.select();

    function saveEdit() {
        const newText = input.value.trim();
        if (newText && newText !== originalText) {
            updateTodoText(id, newText);
        } else {
            renderTodos(); // revert
        }
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter")  saveEdit();
        if (e.key === "Escape") renderTodos();
    });

    input.addEventListener("blur", saveEdit);
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Form submit — thêm todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    addTodo(text);
    todoInput.value = "";
    todoInput.focus();
});

// Event Delegation trên #todoList
todoList.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    const id = li.dataset.id;

    // Xóa
    if (e.target.dataset.action === "delete") {
        deleteTodo(id);
        return;
    }

    // Click checkbox
    if (e.target.classList.contains("todo-checkbox")) {
        toggleTodo(id);
        return;
    }

    // Click text (không trong edit mode)
    if (e.target.classList.contains("todo-text")) {
        toggleTodo(id);
    }
});

// Double-click để edit
todoList.addEventListener("dblclick", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    if (e.target.classList.contains("todo-text")) {
        startEdit(li);
    }
});

// Clear completed
clearBtn.addEventListener("click", clearCompleted);

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// ============================================================
// INIT
// ============================================================
renderTodos();
