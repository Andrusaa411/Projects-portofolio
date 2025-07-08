// Dom file
import { buildDom } from "./dom.js";
// Events file
import { addEventListeners } from "./events.js";

// Utilities file
import * as Utilities from "./utility.js";

export default class ToDoApp {
  constructor() {
    const {
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
    } = buildDom();

    this.app = app;
    this.header = header;
    this.topSideContainer = topSideContainer;
    this.btnDeleteCompletedTasks = btnDeleteCompletedTasks;
    this.formContainer = formContainer;
    this.inputBar = inputBar;
    this.btnSort = btnSort;
    this.spanSort = spanSort;
    this.btnDeleteAllTasks = btnDeleteAllTasks;
    this.taskList = taskList;

    Utilities.loadFromLocalStorage(this.taskList);

    this._events();
  }

  _events() {
    addEventListeners({
      inputBar: this.inputBar,
      formContainer: this.formContainer,
      taskList: this.taskList,
      btnDeleteCompletedTasks: this.btnDeleteCompletedTasks,
      btnDeleteAllTasks: this.btnDeleteAllTasks,
      btnSort: this.btnSort,
    });
  }
}
