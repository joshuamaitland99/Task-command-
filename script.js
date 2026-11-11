const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks yet. Add your first task!</p>";
        return;
    }

    tasks.forEach(function(task) {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item " + task.priority;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.title;

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.className = "toggle-btn";

        completeButton.addEventListener("click", function() {
            toggleTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        taskActions.appendChild(completeButton);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(taskActions);

        taskList.appendChild(taskItem);
    });
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (title === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        priority: taskPriority.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskForm.reset();
});

function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(function(task) {
            return task.id !== id;
        });

        saveTasks();
        displayTasks();
    }
}

displayTasks();