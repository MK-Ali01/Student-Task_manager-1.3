const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle"); //declare Title variable
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

// NEW: update the label text and colour for a task card
function updateStatus(taskCard) {
    const status = taskCard.dataset.status;
    const label = taskCard.querySelector(".status-label");

    label.textContent = status;
    label.className = "status-label " + status.toLowerCase();
    taskCard.classList.toggle("completed", status === "Completed");
}

// NEW: add the status label and Toggle status button to a task card
function addStatus(taskCard) {
    taskCard.dataset.status = "Pending";   // default status

    const statusRow = document.createElement("div");
    statusRow.className = "status-row";

    const label = document.createElement("span");
    label.className = "status-label";

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "toggle-btn";
    toggleButton.textContent = "Toggle status";

    toggleButton.addEventListener("click", function () {
        taskCard.dataset.status =
            taskCard.dataset.status === "Pending" ? "Completed" : "Pending";
        updateStatus(taskCard);
    });

    statusRow.appendChild(label);
    statusRow.appendChild(toggleButton);
    taskCard.appendChild(statusRow);

    updateStatus(taskCard);
}

// NEW: give the sample tasks already in index.html a status
document.querySelectorAll(".task-card").forEach(addStatus);

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "" || description === "") {
        message.textContent = "Please enter both task title and description.";
        message.style.color = "red";
        return;
    }

    const taskCard = document.createElement("article");
    taskCard.className = "task-card";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    taskCard.appendChild(heading);
    taskCard.appendChild(paragraph);
    taskList.appendChild(taskCard);
      addStatus(taskCard); 

    taskForm.reset();

    message.textContent = "Task added successfully.";
    message.style.color = "green";
});