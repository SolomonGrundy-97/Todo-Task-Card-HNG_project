const checkbox = document.getElementById("complete");
const status = document.getElementById("status");
const statusControl = document.getElementById("status-control");
const card = document.querySelector('[data-testid="test-todo-card"]');
const timeElement = document.getElementById("time-remaining");
const overdueEl = document.getElementById("overdue");

// STATE
let todo = {
  title: "Todo Task Card",
  description: "Complete the frontend task with accessibility and responsiveness.",
  priority: "High",
  status: "Pending",
  dueDate: new Date("2026-03-01T18:00:00Z"),
};

// PRIORITY INDICATOR
const indicator = document.getElementById("priority-indicator");

indicator.className = "";
indicator.classList.add(
  todo.priority === "High"
    ? "high-indicator"
    : todo.priority === "Medium"
    ? "medium-indicator"
    : "low-indicator"
);

// STATUS VISUAL STATES
card.classList.remove("in-progress", "completed");

if (todo.status === "In Progress") {
  card.classList.add("in-progress");
}

if (todo.status === "Done") {
  card.classList.add("completed");
}

let expanded = false;

// TIME FUNCTION
function updateTime() {
  if (todo.status === "Done") {
    timeElement.textContent = "Completed";
    return;
  }

  const now = new Date();
  const diff = todo.dueDate - now;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let text = "";

  if (diff <= 0) {
    overdueEl.textContent = "Overdue";
    text = `Overdue by ${Math.abs(hours)} hour(s)`;
  } else {
    overdueEl.textContent = "";
    if (days > 0) text = `Due in ${days} day(s)`;
    else if (hours > 0) text = `Due in ${hours} hour(s)`;
    else text = `Due in ${minutes} minute(s)`;
  }

  timeElement.textContent = text;
}

// INITIAL + INTERVAL
updateTime();
setInterval(updateTime, 60000);

// CHECKBOX SYNC
checkbox.addEventListener("change", () => {
  todo.status = checkbox.checked ? "Done" : "Pending";
  syncUI();
});

// STATUS DROPDOWN SYNC
statusControl.addEventListener("change", () => {
  todo.status = statusControl.value;
  syncUI();
});

// SYNC FUNCTION
function syncUI() {
  status.textContent = todo.status;
  statusControl.value = todo.status;
  checkbox.checked = todo.status === "Done";

  card.classList.toggle("completed", todo.status === "Done");

  updateTime();
}

// EXPAND TOGGLE
document.getElementById("expand-btn").onclick = () => {
  expanded = !expanded;
  document.getElementById("desc-section").style.maxHeight = expanded ? "none" : "60px";
  document.getElementById("expand-btn").setAttribute("aria-expanded", expanded);
};

// EDIT MODE
const form = document.getElementById("edit-form");

document.getElementById("edit-btn").onclick = () => {
  form.classList.remove("hidden");

  document.getElementById("edit-title").value = todo.title;
  document.getElementById("edit-desc").value = todo.description;
  document.getElementById("edit-priority").value = todo.priority;
  document.getElementById("edit-date").value = todo.dueDate.toISOString().slice(0,16);
};

// SAVE
document.getElementById("save-btn").onclick = () => {
  todo.title = document.getElementById("edit-title").value;
  todo.description = document.getElementById("edit-desc").value;
  todo.priority = document.getElementById("edit-priority").value;
  todo.dueDate = new Date(document.getElementById("edit-date").value);

  document.getElementById("todo-title").textContent = todo.title;
  document.querySelector('[data-testid="test-todo-description"]').textContent = todo.description;

  form.classList.add("hidden");
  syncUI();
};

// CANCEL
document.getElementById("cancel-btn").onclick = () => {
  form.classList.add("hidden");
};

// DELETE
document
  .querySelector('[data-testid="test-todo-delete-button"]')
  .onclick = () => alert("Delete clicked");