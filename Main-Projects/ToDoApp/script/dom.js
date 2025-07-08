// Appending
export const buildDom = function () {
  ////////// HTML structure section

  // Variables
  const app = document.querySelector(".app");
  const header = document.createElement("header");
  const topSideContainer = document.createElement("div");
  const btnDeleteCompletedTasks = document.createElement("button");
  const formContainer = document.createElement("form");
  const inputBar = document.createElement("input");

  const btnSort = document.createElement("button");
  const spanSort = document.createElement("span");

  const btnDeleteAllTasks = document.createElement("button");

  const taskList = document.createElement("ul");

  // Appending
  app.appendChild(header);
  app.appendChild(formContainer);
  app.appendChild(topSideContainer);

  topSideContainer.appendChild(btnDeleteCompletedTasks);
  topSideContainer.appendChild(formContainer);
  topSideContainer.appendChild(btnDeleteAllTasks);

  formContainer.appendChild(inputBar);
  formContainer.appendChild(btnSort);
  btnSort.appendChild(spanSort);

  app.appendChild(taskList);

  // Adding classes + Text contents
  header.textContent = "To-Do List";

  topSideContainer.classList.add("top-side-container");

  btnDeleteCompletedTasks.classList.add("btn__delete-completed-tasks");
  btnDeleteCompletedTasks.textContent = "Delete Completed Tasks";

  formContainer.classList.add("add-task-container");

  inputBar.classList.add("input-area");
  inputBar.placeholder = "Add Task";
  inputBar.type = "text";

  btnSort.classList.add("btn__sort-tasks");
  btnSort.type = "button";

  spanSort.classList.add("span__sort");
  spanSort.textContent = "Sort";

  btnDeleteAllTasks.classList.add("btn__delete-all-tasks");
  btnDeleteAllTasks.textContent = "Delete All Tasks";

  return {
    app,
    header,
    topSideContainer,
    btnDeleteCompletedTasks,
    formContainer,
    inputBar,
    btnSort,
    spanSort,
    btnDeleteAllTasks,
    taskList,
  };
};
