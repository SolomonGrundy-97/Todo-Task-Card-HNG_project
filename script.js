const checkbox = document.getElementById("complete");
const title = document.getElementById("todo-title");
const status = document.getElementById("status");
const card = document.querySelector('[data-testid="test-todo-card"]');
const timeElement = document.getElementById("time-remaining");

// SET DUE DATE
const dueDate = new Date("2026-03-01T18:00:00Z");

function updateTimeRemaining() {
  const now = new Date();
  const diff = dueDate - now;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let text = "";
by 
  if (diff <= 0) {
    text = "Overdue by 2 hours";
  } else if (days > 0) {
    text = `Due in ${days} day(s)`;
  } else if (hours > 0) {
    text = `Due in ${hours} hour(s)`;
  } else if (minutes > 0) {
    text = `Due in ${minutes} minute(s)`;
  } else {
    text = "Due now!";
  }

  timeElement.textContent = text;
}

// INITIAL CALL
updateTimeRemaining();

// UPDATE EVERY 60s
setInterval(updateTimeRemaining, 60000);

// CHECKBOX TOGGLE
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    card.classList.add("completed");
    status.textContent = "Done";
  } else {
    card.classList.remove("completed");
    status.textContent = "Pending";
  }
});

// BUTTONS
document
  .querySelector('[data-testid="test-todo-edit-button"]')
  .addEventListener("click", () => {
    console.log("edit clicked");
  });

document
  .querySelector('[data-testid="test-todo-delete-button"]')
  .addEventListener("click", () => {
    alert("Delete clicked");
  });