'use strict';

function ToDo(_ref) {
  var addListBtn = _ref.addListBtn;
  var appListClassName = "js--todo-app__list";
  var appTasksClassName = "js--todo-app__tasks";
  var addTaskClassName = "js--todo-app__add-task";
  var deleteListClassName = "js--todo-app__delete-list";
  var getListTemplate = function getListTemplate(id) {
    return "\n        <div id=\"todo-app__list-".concat(id, "\" class=\"todo-app__list ").concat(appListClassName, "\" data-id=\"").concat(id, "\">\n            <h2 contenteditable=\"true\">List header</h2>\n\n            <ul class=\"todo-app__tasks ").concat(appTasksClassName, "\"></ul>\n\n            <div class=\"todo-app__btn-group\">\n                <button class=\"todo-app__btn todo-app__add-task ").concat(addTaskClassName, "\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\n                        <path d=\"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z\"/>\n                    </svg>\n                    <span>Add Task ...</span>\n                </button>\n                \n                <button class=\"todo-app__btn todo-app__delete-list ").concat(deleteListClassName, "\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\">\n                        <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n                    </svg>\n                    <span>Delete list</span>\n                </button>\n            </div>\n        </div>\n    ");
  };
  var getTaskTemplate = function getTaskTemplate(listId, taskId) {
    return "\n        <li id=\"todo-app__task-".concat(taskId, "\" class=\"todo-app__task\" data-id=\"").concat(taskId, "\">\n            <input type=\"checkbox\" id=\"complete-checkbox-").concat(listId, "-").concat(taskId, "\"/>\n            <label for=\"complete-checkbox-").concat(listId, "-").concat(taskId, "\"></label>\n\n            <div contenteditable=\"true\" class=\"js--todo-app__task__value\"></div>\n\n            <button class=\"todo-app__delete-task js--todo-app__delete-task\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\">\n                    <path d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"/>\n                </svg>\n            </button>\n        </li>\n    ");
  };
  var taskLists;
  var lastListId = 1;
  var lastTaskId = 1;
  this.init = function () {
    initTasksFromStorage();
    initEventCreateListHTML();
    initAppHTML();
  };
  var initTasksFromStorage = function initTasksFromStorage() {
    taskLists = JSON.parse(localStorage.getItem("taskLists")) || [];
    lastListId = localStorage.getItem("lastListId") || 1;
    lastTaskId = localStorage.getItem("lastTaskId") || 1;
  };
  var saveToStorage = function saveToStorage() {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
    localStorage.setItem("lastListId", lastListId);
    localStorage.setItem("lastTaskId", lastTaskId);
  };
  var getList = function getList(id) {
    return taskLists.find(function (list) {
      return list.id === +id;
    });
  };
  var getTask = function getTask(taskId, listId) {
    return getList(listId).tasks.find(function (task) {
      return task.id === +taskId;
    });
  };
  var addList = function addList(id) {
    lastListId++;
    taskLists.push({
      id: +id,
      name: "",
      tasks: []
    });
    saveToStorage();
  };
  var addTaskToList = function addTaskToList(listId, taskObj) {
    lastTaskId++;
    getList(listId).tasks.push(taskObj);
    saveToStorage();
  };
  var updateListName = function updateListName(id, name) {
    getList(id).name = name.trim();
    saveToStorage();
  };
  var updateTask = function updateTask(taskId, listId, value) {
    getTask(taskId, listId).value = value.trim();
    saveToStorage();
  };
  var changeCompletedTask = function changeCompletedTask(taskId, listId) {
    var task = getTask(taskId, listId);
    task.isCompleted = !task.isCompleted;
    sortTasks(listId);
    saveToStorage();
  };
  var sortTasks = function sortTasks(listId) {
    var list = getList(listId);
    list.tasks.sort(function (a, b) {
      return a.isCompleted - b.isCompleted;
    });
  };
  var deleteList = function deleteList(id) {
    taskLists = taskLists.filter(function (list) {
      return list.id !== +id;
    });
    saveToStorage();
  };
  var deleteTask = function deleteTask(taskId, listId) {
    var list = getList(listId);
    list.tasks = list.tasks.filter(function (task) {
      return task.id !== +taskId;
    });
    saveToStorage();
  };
  var createListHTML = function createListHTML() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var currentId = id !== null && id !== void 0 ? id : lastListId;
    $(addListBtn).before(getListTemplate(currentId));
    return currentId;
  };
  var initEventCreateListHTML = function initEventCreateListHTML() {
    $(addListBtn).on("click", function () {
      var id = createListHTML();
      addList(id);
      var $listElement = $("#todo-app__list-".concat(id));
      setEventInputListName($listElement);
      setEventCreateTask($listElement);
      setEventDeleteList($listElement);
    });
  };
  var setEventInputListName = function setEventInputListName($listElement) {
    var $h2 = $listElement.find("h2");
    $h2.on("input", function (event) {
      updateListName($listElement.data("id"), event.target.textContent);
    });
    $h2.focus();
  };
  var setEventDeleteList = function setEventDeleteList($listElement) {
    var $deleteListBtn = $listElement.find(".".concat(deleteListClassName));
    $deleteListBtn.on("click", function () {
      var isConfirmed = confirm("Do you want to delete this list?");
      if (!isConfirmed) return;
      deleteList($listElement.data("id"));
      $listElement.remove();
    });
  };
  var createTaskHTML = function createTaskHTML($listElement) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var $tasks = $listElement.find(".".concat(appTasksClassName));
    var currentId = id !== null && id !== void 0 ? id : lastTaskId;
    var listId = $listElement.data("id");
    $tasks.append(getTaskTemplate(listId, currentId));
    return $("#todo-app__task-".concat(currentId));
  };
  var setEventCreateTask = function setEventCreateTask($listElement) {
    var $addTaskBtn = $listElement.find(".".concat(addTaskClassName));
    $addTaskBtn.on("click", function () {
      var $taskElement = createTaskHTML($listElement);
      $taskElement.find(".js--todo-app__task__value").focus();
      setEventsTaskUpdate($taskElement, $listElement);
      addTaskToList($listElement.data("id"), {
        id: +lastTaskId,
        value: "",
        isCompleted: false
      });
    });
  };
  var setEventsTaskUpdate = function setEventsTaskUpdate($taskElement, $listElement) {
    var taskId = $taskElement.data("id");
    var listId = $listElement.data("id");
    var $taskValue = $taskElement.find(".js--todo-app__task__value");
    $taskValue.on("input", function (event) {
      updateTask(taskId, listId, event.target.textContent);
    });
    $taskValue.on("dblclick", function (event) {
      var modal = $('#modal');
      modal.find(".modal-body").html($(event.target).text());
      new bootstrap.Modal(modal).show(event.target);
    });
    var $completeCheckbox = $taskElement.find("input[type='checkbox']");
    $completeCheckbox.on("change", function () {
      changeCompletedTask(taskId, listId);
      getList(listId).tasks.forEach(function (task) {
        var $elementToMove = $("#todo-app__task-".concat(task.id));
        $taskElement.parent().append($elementToMove);
      });
    });
    var $deleteTaskBtn = $taskElement.find(".js--todo-app__delete-task");
    $deleteTaskBtn.on("click", function () {
      var isConfirmed = confirm("Do you want to delete this task?");
      if (!isConfirmed) return;
      deleteTask(taskId, listId);
      $taskElement.remove();
    });
  };
  var initAppHTML = function initAppHTML() {
    taskLists.forEach(function (list) {
      var listId = list.id;
      createListHTML(listId);
      var $listElement = $("#todo-app__list-".concat(listId));
      $listElement.find("h2").text(list.name === '' ? 'List header' : list.name);
      setEventInputListName($listElement);
      setEventCreateTask($listElement);
      setEventDeleteList($listElement);
      list.tasks.forEach(function (task) {
        var $taskElement = createTaskHTML($listElement, task.id);
        setEventsTaskUpdate($taskElement, $listElement);
        $taskElement.find(".js--todo-app__task__value").text(task.value);
        $taskElement.find("input[type='checkbox']").prop("checked", task.isCompleted);
      });
    });
  };
}
new ToDo({
  addListBtn: $("#js--add-list")[0]
}).init();
