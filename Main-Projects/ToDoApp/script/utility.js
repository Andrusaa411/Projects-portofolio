/// Variables
export const originalOrderArr = [];

/// Functions
// Remove task button
export const allXbuttons = function (buttons, classStatus) {
  const status = classStatus === "remove" ? "remove" : "add";
  const selectors = Array.isArray(buttons) ? buttons : [buttons];
  selectors.forEach((selector) =>
    document
      .querySelectorAll(selector)
      .forEach((btn) => btn.classList[status]("disable-hover"))
  );
};

// Numbering the tasks
export function updateTaskNumbers() {
  document.querySelectorAll(".task-number").forEach((span, idx) => {
    span.textContent = `${idx + 1}.`;
  });
}

/**
 * **createOverlay**
 *
 * Dynamically creates and displays a modal overlay with a custom message, optional extra HTML, and configurable action buttons.
 * The overlay blocks interaction with the rest of the page and disables task action buttons while active.
 *
 * @param {Object} options - Overlay configuration options.
 * @param {string} options.message - The main message or HTML content to display in the overlay.
 * @param {Array<Object>} options.buttons - An array of button objects, each with:
 *   - {string} className: CSS class(es) for the button.
 *   - {string} text: Button label.
 *   - {function} onClick: Callback to run when the button is clicked.
 * @param {string} [options.extraHTML=""] - Optional extra HTML markup to include in the overlay.
 *
 * @example
 * createOverlay({
 *   message: "Are you sure you want to delete this task?",
 *   buttons: [
 *     { className: "btn-confirm", text: "Yes", onClick: handleConfirm },
 *     { className: "btn-cancel", text: "No", onClick: handleCancel }
 *   ]
 * });
 *
 * @returns {void}
 *
 * **Behavior:**
 * - Renders the overlay and buttons in the DOM.
 * - Attaches click handlers to each button.
 * - Disables other task action buttons while the overlay is present.
 * - Use `cleanUp()` or `removeOverlayDuplicate()` to remove the overlay and restore UI state.
 */
export function createOverlay({ message, buttons, extraHTML = "" }) {
  const btnMarkup = buttons
    .map(
      (btn, i) =>
        `<button class="${btn.className}" type="button" data-btn-idx ="${i}">${btn.text}</button>`
    )
    .join("");

  const markup = `
      <div class="overlay">
      <div class="overlay-container">
      <p class="text">${message}</p>
      ${extraHTML}
      <div class="overlay__btn-container">
      ${btnMarkup}
      </div>
      </div>
      </div>
      `;

  document.body.insertAdjacentHTML("beforeend", markup);

  // Add event listeners to buttons
  const overlay = document.querySelector(".overlay");
  overlay.querySelectorAll("button[data-btn-idx]").forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      buttons[i].onClick && buttons[i].onClick();
    });
  });

  allXbuttons(
    [".btn__remove-task", ".btn__edit-task", ".btn__mark-complete-task"],
    "add"
  );
}

export const onEnter = function (e) {
  if (e.key === "Enter") {
    removeOverlayDuplicate();
  }
};

export const onEscape = function (e) {
  if (e.key === "Escape") {
    cleanUp();
  }
};

export function cleanUp() {
  document.querySelector(".overlay").remove();
  document.body.removeEventListener("keydown", onEscape);
  allXbuttons(
    [".btn__remove-task", ".btn__edit-task", ".btn__mark-complete-task"],
    "remove"
  );
  updateTaskNumbers();
}

export function removeOverlayDuplicate() {
  document.querySelector(".overlay").remove();
  document.body.removeEventListener("keydown", onEnter);
  allXbuttons(
    [".btn__remove-task", ".btn__edit-task", ".btn__mark-complete-task"],
    "remove"
  );
}

// Edit functionality
export function editInputElement(task) {
  const taskText = task.querySelector(".task");
  const oldText = taskText.textContent.trim();

  // Creating the input
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  input.className = "edit-task-input";

  allXbuttons(".btn__edit-task", "add");

  // Replaing the old task with the input in which the user writes the new task
  taskText.replaceWith(input);
  input.focus();

  // replacing the old task with the new task from the input
  let editDone = false;

  function saveEdit() {
    if (editDone) return;
    editDone = true;

    const newText = input.value.trim() || oldText;
    const newTaskEl = document.createElement("p");
    newTaskEl.className = "task";
    newTaskEl.textContent = newText;
    input.replaceWith(newTaskEl);
    saveToLocalStorage();
  }

  input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") saveEdit();
  });

  input.addEventListener("blur", function () {
    saveEdit();
    allXbuttons(".btn__edit-task", "remove");
  });
  return;
}

export function topSectionButtons(buttons, status) {
  const selectors = Array.isArray(buttons) ? buttons : [buttons];
  selectors.forEach((selector) =>
    document
      .querySelectorAll(selector)
      .forEach((btn) => btn.classList[status]("active"))
  );
}

export function checkTasksForBtns(taskList) {
  // Hide the delete all button if no tasks remain
  if (taskList.querySelectorAll(".task-container").length === 0)
    topSectionButtons(
      [
        ".btn__delete-all-tasks",
        ".btn__delete-completed-tasks",
        ".btn__sort-tasks",
      ],
      "remove"
    );

  // Hide the delete all completed tasks button if no completed tasks remain
  if (taskList.querySelectorAll(".task-container.completed").length === 0)
    topSectionButtons(".btn__delete-completed-tasks", "remove");
}

export function deleteAllChosenTasks(taskList, status = "") {
  const tasksArr = Array.from(
    taskList.querySelectorAll(`.task-container${status}`)
  );
  tasksArr.forEach((task) => task.remove());

  resetOriginalOrder();
}

export function checkTasksForSort(taskList) {
  if (taskList.querySelectorAll(".task-container").length < 2)
    topSectionButtons(".btn__sort-tasks", "remove");
}

// 3 sorting functionalities
let currentClick = 0;

export function sortFunctionalities(btnSort, taskList) {
  const functions = [activeTasksOrder, completedTasksOrder, originalOrder];

  function activeTasksOrder() {
    btnSort.style.color = "red";
    btnSort.style.borderColor = "red";

    originalOrderArr.forEach(function (task) {
      if (task.classList.contains("completed")) task.remove();
    });
    updateTaskNumbers();
  }
  function completedTasksOrder() {
    btnSort.style.color = "green";
    btnSort.style.borderColor = "green";

    originalOrderArr.forEach(function (task) {
      if (!task.classList.contains("completed")) task.remove();
    });

    originalOrderArr.forEach(function (task) {
      if (task.classList.contains("completed")) taskList.appendChild(task);
    });
    updateTaskNumbers();
  }
  function originalOrder() {
    btnSort.style.color = "black";
    btnSort.style.borderColor = "black";

    originalOrderArr.forEach(function (task) {
      task.remove();
      taskList.appendChild(task);
    });
    updateTaskNumbers();
  }

  functions[currentClick]();
  currentClick++;
  if (currentClick >= functions.length) currentClick = 0;
}

export function resetOriginalOrder() {
  originalOrderArr.length = 0;
}

export function resetSorting(btnSort) {
  currentClick = 0;
  btnSort.style.color = "black";
  btnSort.style.borderColor = "black";
}
/// Local storage functions

export function saveToLocalStorage(tasklist) {
  const tasks = Array.from(document.querySelectorAll(".task-container")).map(
    function (task) {
      const text = task.querySelector(".task").textContent.trim();
      const completed = task.classList.contains("completed");
      return { text, completed };
    }
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadFromLocalStorage(taskList) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(function ({ text, completed }) {
    const markup = `
    <li class="task-container ${completed ? "completed" : ""}">
    <button class="btn__mark-complete-task">✔</button>
    <div class="p-container">
    <p class="task-number"></p>
    <p class="task">
    ${text}
    </p>
    </div>
    <div class="btn-container">
    <button class="btn__edit-task">🖍</button>
    <button class="btn__remove-task">X</button>
    </div>
    </li>
    `;

    taskList.insertAdjacentHTML("beforeend", markup);
    originalOrderArr.push(taskList.querySelector(".task-container:last-child"));
  });
  updateTaskNumbers();

  if (taskList.querySelectorAll(".task-container").length > 1)
    topSectionButtons(".btn__delete-all-tasks", "add");

  if (taskList.querySelectorAll(".task-container.completed").length > 0)
    topSectionButtons(".btn__delete-completed-tasks", "add");

  if (taskList.querySelectorAll(".task-container").length >= 2)
    topSectionButtons(".btn__sort-tasks", "add");
}
