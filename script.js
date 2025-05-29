function addTask() {
  const input = document.getElementById("input");
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = task;
  taskText.classList.add("tasktext");
  li.appendChild(taskText);

  // ✅ Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✅";
  completeBtn.classList.add("icon-btn", "complete-btn");
  completeBtn.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // ❌ Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  deleteBtn.classList.add("icon-btn", "delete-btn");
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateLocalStorage();
  });

  const iconBox = document.createElement("span");
  iconBox.appendChild(completeBtn);
  iconBox.appendChild(deleteBtn);
  li.appendChild(iconBox);

  document.getElementById("tasklist").appendChild(li);

  updateLocalStorage();

  input.value = "";
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#tasklist li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span.tasktext").textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.classList.add("tasktext");
    li.appendChild(taskText);

    if (task.completed) {
      li.classList.add("completed");
    }

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✅";
    completeBtn.classList.add("icon-btn", "complete-btn");
    completeBtn.addEventListener("click", function () {
      li.classList.toggle("completed");
      updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.classList.add("icon-btn", "delete-btn");
    deleteBtn.addEventListener("click", function () {
      li.remove();
      updateLocalStorage();
    });

    const iconBox = document.createElement("span");
    iconBox.appendChild(completeBtn);
    iconBox.appendChild(deleteBtn);
    li.appendChild(iconBox);

    document.getElementById("tasklist").appendChild(li);
  });
}
