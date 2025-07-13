import * as Utilities from "./utility.js";

////////// Event listeners

// Adding tasks
export const addEventListeners = function ({
  inputBar,
  formContainer,
  taskList,
  btnDeleteCompletedTasks,
  btnDeleteAllTasks,
  btnSort,
}) {
  // Adding task
  formContainer.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskInput = inputBar.value.trim();

    // Checking for empty input
    if (!taskInput) return;

    // Checking for duplicated tasks
    const existingTasks = Array.from(taskList.querySelectorAll(".task")).map(
      (el) => el.textContent.trim().toLowerCase()
    );

    if (existingTasks.includes(taskInput.toLowerCase())) {
      // Overlay when a duplicated task exists

      Utilities.createOverlay({
        message: "This task is already added!",
        buttons: [
          {
            text: "Ok",
            className: "overlay__btn-ok",
            onClick: Utilities.removeOverlayDuplicate,
          },
        ],
      });

      // Adding the press enter to close overlay logic
      document.body.addEventListener("keydown", Utilities.onEnter);

      inputBar.value = "";
      inputBar.blur();

      return;
    }

    // Adding task
    const markup = `
    <li class="task-container">
    <button class="btn__mark-complete-task">✔</button>
    <div class="p-container">
    <p class="task-number"></p>
    <p class="task">
    ${taskInput}
    </p>
    </div>
    <div class="btn-container">
    <button class="btn__edit-task">🖍</button>
    <button class="btn__remove-task">X</button>
    </div>
    </li>
    `;

    taskList.insertAdjacentHTML("beforeend", markup);

    Utilities.saveToLocalStorage(taskList);

    Utilities.originalOrderArr.push(
      document.querySelector(".task-container:last-child")
    );

    // Updating the numbering of the tasks and adding the delete-all-tasks btn
    Utilities.updateTaskNumbers();
    Utilities.topSectionButtons(".btn__delete-all-tasks", "add");

    /// Sortbtn appearance functionality
    // Checking if the are enough tasks for the sort btn to appear

    if (document.querySelectorAll(".task-container").length >= 2)
      Utilities.topSectionButtons(".btn__sort-tasks", "add");

    // Resetting the input bar
    inputBar.value = "";
    inputBar.focus();
  });

  // Functionalities on the task container
  taskList.addEventListener(`click`, function (e) {
    const currentTask = e.target.closest("li");

    // If user click outside the task container
    if (!currentTask) return;

    const tasks = document.querySelectorAll(".task-container");
    const taskText = currentTask.querySelector(".task");

    /// Adding/Removing completed class to the completed task
    if (e.target.classList.contains("btn__mark-complete-task")) {
      e.target.closest(".task-container").classList.toggle("completed");
      Utilities.topSectionButtons(".btn__delete-completed-tasks", "add");
      Utilities.saveToLocalStorage(taskList);
    }

    if (taskList.querySelectorAll(".task-container.completed").length === 0)
      Utilities.topSectionButtons(".btn__delete-completed-tasks", "remove");

    /// Editting functionality
    if (e.target.classList.contains("btn__edit-task")) {
      if (currentTask.querySelector(".edit-task-input")) return;

      Utilities.editInputElement(currentTask);
      return;
    }

    /// Handling the X button
    // Checking if the task has an x button and an overlay to not create unnecessary logic
    if (!e.target.classList.contains("btn__remove-task")) return;
    if (document.querySelector(".overlay")) return;

    // -> Remove overlay by hitting 'Escape' key
    document.body.addEventListener("keydown", Utilities.onEscape);

    // -> Creating overlay
    Utilities.createOverlay({
      message: "Are you sure you want to delete this task?",
      extraHTML: `<p class="selected-task"><span class="overlay-task">${taskText.textContent}</span></p>`,
      buttons: [
        {
          text: "Yes",
          className: "overlay__btn-yes",
          onClick: () => {
            currentTask.remove();
            Utilities.cleanUp();
            Utilities.checkTasksForBtns(taskList);
            Utilities.checkTasksForSort(taskList);
            Utilities.saveToLocalStorage(taskList);
            inputBar.textContent = "";
          },
        },
        {
          text: "No",
          className: "overlay__btn-no",
          onClick: Utilities.cleanUp,
        },
      ],
    });
  });

  btnDeleteCompletedTasks.addEventListener("click", function () {
    Utilities.deleteAllChosenTasks(taskList, ".completed");
    Utilities.checkTasksForBtns(taskList);
    Utilities.saveToLocalStorage(taskList);
  });

  btnDeleteAllTasks.addEventListener("click", function () {
    Utilities.deleteAllChosenTasks(taskList);
    Utilities.checkTasksForBtns(taskList);
    localStorage.removeItem("tasks");
    Utilities.saveToLocalStorage(taskList);
    Utilities.resetSorting(btnSort);
  });

  btnSort.addEventListener("click", function () {
    Utilities.sortFunctionalities(btnSort, taskList);
  });
};
