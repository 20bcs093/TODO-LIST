const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value;
  if (task === "") {
    alert("Please enter a task!");
  } else {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
    taskInput.value = "";
    li.addEventListener("click", () => {
      taskList.removeChild(li);
    });
  }
});
