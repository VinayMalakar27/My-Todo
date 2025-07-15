document.addEventListener('DOMContentLoaded', function () {
    let input = document.querySelector("input");
    let button = document.querySelector("button");
    let list = document.querySelector(".list");

    // Load tasks from localStorage on page load
    loadTasks();

    button.addEventListener("click", function () {
        if (input.value.trim() != "") {
            let taskText = input.value.trim();
            addTask(taskText);
            saveTask(taskText);
            input.value = "";
        }
    });

    function addTask(taskText) {
        let newlist = document.createElement("li");
        let span = document.createElement("span");

        span.innerText = taskText;
        newlist.appendChild(span);

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteBtn.className = "delete-Btn";

        deleteBtn.addEventListener("click", function () {
            list.removeChild(newlist);
            deleteTask(taskText);
        });

        newlist.appendChild(deleteBtn);
        list.appendChild(newlist);
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task));
    }
});
