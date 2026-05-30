let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let editingIndex = -1;

const modal =
    document.getElementById("modal");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const closeBtn =
    document.getElementById("closeBtn");

const taskForm =
    document.getElementById("taskForm");

const taskList =
    document.getElementById("taskList");

const message =
    document.getElementById("message");

const totalTasks =
    document.getElementById("totalTasks");

const completedTasks =
    document.getElementById("completedTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const title =
    document.getElementById("title");

const description =
    document.getElementById("description");

const deadline =
    document.getElementById("deadline");

const priority =
    document.getElementById("priority");

addTaskBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", closeForm);

taskForm.addEventListener("submit", saveTask);

function saveTask(e) {

    e.preventDefault();

    const task = {
        title: title.value,
        description: description.value,
        deadline: deadline.value,
        priority: priority.value,
        completed: false
    };

    if (editingIndex === -1) {

        tasks.push(task);

        showMessage("Thêm công việc thành công");

    } else {

        task.completed =
            tasks[editingIndex].completed;

        tasks[editingIndex] = task;

        showMessage("Cập nhật công việc thành công");

        editingIndex = -1;
    }

    saveTasks();
    renderTasks();
    updateSummary();
    closeForm();
}

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>Chưa có công việc nào</p>";

        return;
    }

    tasks.forEach((task, index) => {

        taskList.innerHTML +=
            `
        <div class="task-card ${task.completed ? "completed" : ""}">

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <p>Hạn: ${task.deadline}</p>

            <p>Ưu tiên: ${task.priority}</p>

            <p>
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleStatus(${index})">
                Hoàn thành
            </p>

            <button onclick="editTask(${index})">
                Sửa
            </button>

            <button onclick="deleteTask(${index})">
                Xóa
            </button>

        </div>
        `;
    });
}

function editTask(index) {

    editingIndex = index;

    const task = tasks[index];

    title.value = task.title;
    description.value = task.description;
    deadline.value = task.deadline;
    priority.value = task.priority;

    modal.style.display = "flex";

    document.getElementById("formTitle").innerText =
        "Cập nhật công việc";
}

function deleteTask(index) {

    if (confirm("Bạn có chắc muốn xóa?")) {

        tasks.splice(index, 1);

        saveTasks();
        renderTasks();
        updateSummary();

        showMessage("Đã xóa công việc");
    }
}

function toggleStatus(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
    updateSummary();
}

function updateSummary() {

    totalTasks.innerText =
        tasks.length;

    const completed =
        tasks.filter(t => t.completed).length;

    completedTasks.innerText =
        completed;

    pendingTasks.innerText =
        tasks.length - completed;
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function closeForm() {

    taskForm.reset();

    modal.style.display = "none";

    editingIndex = -1;

    document.getElementById("formTitle").innerText =
        "Thêm công việc";
}

function showMessage(text) {

    message.innerText = text;

    setTimeout(() => {
        message.innerText = "";
    }, 3000);
}

renderTasks();
updateSummary();