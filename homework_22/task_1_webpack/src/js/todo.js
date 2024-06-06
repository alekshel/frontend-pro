'use strict';

import '../../src/scss/basic.scss'
import '../../src/scss/todo.scss'

import Modal from 'bootstrap/js/dist/modal';

function ToDo({addListBtn}) {
    const appListClassName = "js--todo-app__list";
    const appTasksClassName = "js--todo-app__tasks";
    const addTaskClassName = "js--todo-app__add-task";
    const deleteListClassName = "js--todo-app__delete-list";

    const getListTemplate = id => `
        <div id="todo-app__list-${id}" class="todo-app__list ${appListClassName}" data-id="${id}">
            <h2 contenteditable="true">List header</h2>

            <ul class="todo-app__tasks ${appTasksClassName}"></ul>

            <div class="todo-app__btn-group">
                <button class="todo-app__btn todo-app__add-task ${addTaskClassName}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                    </svg>
                    <span>Add Task ...</span>
                </button>
                
                <button class="todo-app__btn todo-app__delete-list ${deleteListClassName}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                    <span>Delete list</span>
                </button>
            </div>
        </div>
    `;

    const getTaskTemplate = (listId, taskId) => `
        <li id="todo-app__task-${taskId}" class="todo-app__task" data-id="${taskId}">
            <input type="checkbox" id="complete-checkbox-${listId}-${taskId}"/>
            <label for="complete-checkbox-${listId}-${taskId}"></label>

            <div contenteditable="true" class="js--todo-app__task__value"></div>

            <button class="todo-app__delete-task js--todo-app__delete-task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </button>
        </li>
    `;

    let taskLists;
    let lastListId = 1;
    let lastTaskId = 1;

    this.init = function () {
        initTasksFromStorage();
        initEventCreateListHTML();
        initAppHTML();
    }

    const initTasksFromStorage = () => {
        taskLists = JSON.parse(localStorage.getItem("taskLists")) || [];
        lastListId = localStorage.getItem("lastListId") || 1;
        lastTaskId = localStorage.getItem("lastTaskId") || 1;
    }

    const saveToStorage = () => {
        localStorage.setItem("taskLists", JSON.stringify(taskLists));
        localStorage.setItem("lastListId", lastListId);
        localStorage.setItem("lastTaskId", lastTaskId);
    }

    const getList = (id) => {
        return taskLists.find(list => list.id === +id);
    }

    const getTask = (taskId, listId) => {
        return getList(listId).tasks.find(task => task.id === +taskId);
    }

    const addList = (id) => {
        lastListId++;
        taskLists.push({id: +id, name: "", tasks: []});
        saveToStorage();
    }

    const addTaskToList = (listId, taskObj) => {
        lastTaskId++;
        getList(listId).tasks.push(taskObj);
        saveToStorage();
    }

    const updateListName = (id, name) => {
        getList(id).name = name.trim();
        saveToStorage();
    }

    const updateTask = (taskId, listId, value) => {
        getTask(taskId, listId).value = value.trim();
        saveToStorage();
    }

    const changeCompletedTask = (taskId, listId) => {
        const task = getTask(taskId, listId);
        task.isCompleted = !task.isCompleted;
        sortTasks(listId);
        saveToStorage();
    }

    const sortTasks = (listId) => {
        const list = getList(listId);
        list.tasks.sort((a, b) => a.isCompleted - b.isCompleted);
    }

    const deleteList = (id) => {
        taskLists = taskLists.filter(list => list.id !== +id);
        saveToStorage();
    }

    const deleteTask = (taskId, listId) => {
        const list = getList(listId);
        list.tasks = list.tasks.filter(task => task.id !== +taskId);
        saveToStorage();
    }

    const createListHTML = (id = null) => {
        const currentId = id ?? lastListId;
        $(addListBtn).before(getListTemplate(currentId));
        return currentId;
    }

    const initEventCreateListHTML = () => {
        $(addListBtn).on("click", () => {
            const id = createListHTML();
            addList(id);

            const $listElement = $(`#todo-app__list-${id}`);
            setEventInputListName($listElement);
            setEventCreateTask($listElement);
            setEventDeleteList($listElement);
        });
    }

    const setEventInputListName = ($listElement) => {
        const $h2 = $listElement.find("h2");
        $h2.on("input", (event) => {
            updateListName($listElement.data("id"), event.target.textContent);
        });
        $h2.focus();
    }

    const setEventDeleteList = ($listElement) => {
        const $deleteListBtn = $listElement.find(`.${deleteListClassName}`);
        $deleteListBtn.on("click", () => {
            const isConfirmed = confirm("Do you want to delete this list?");
            if (!isConfirmed) return;

            deleteList($listElement.data("id"));
            $listElement.remove();
        });
    }

    const createTaskHTML = ($listElement, id = null) => {
        const $tasks = $listElement.find(`.${appTasksClassName}`);
        const currentId = id ?? lastTaskId;
        const listId = $listElement.data("id");
        $tasks.append(getTaskTemplate(listId, currentId));
        return $(`#todo-app__task-${currentId}`);
    }

    const setEventCreateTask = ($listElement) => {
        const $addTaskBtn = $listElement.find(`.${addTaskClassName}`);
        $addTaskBtn.on("click", () => {
            const $taskElement = createTaskHTML($listElement);
            $taskElement.find(".js--todo-app__task__value").focus();

            setEventsTaskUpdate($taskElement, $listElement);
            addTaskToList($listElement.data("id"), {
                id: +lastTaskId,
                value: "",
                isCompleted: false
            });
        });
    }

    const setEventsTaskUpdate = ($taskElement, $listElement) => {
        const taskId = $taskElement.data("id");
        const listId = $listElement.data("id");

        const $taskValue = $taskElement.find(".js--todo-app__task__value");
        $taskValue.on("input", (event) => {
            updateTask(
                taskId,
                listId,
                event.target.textContent
            );
        });

        $taskValue.on("dblclick", (event) => {
            const modal = $('#modal');
            modal.find(".modal-body").html($(event.target).text());
            new Modal(modal).show(event.target);
        });

        const $completeCheckbox = $taskElement.find("input[type='checkbox']");
        $completeCheckbox.on("change", () => {
            changeCompletedTask(taskId, listId);
            getList(listId).tasks.forEach(task => {
                const $elementToMove = $(`#todo-app__task-${task.id}`);
                $taskElement.parent().append($elementToMove);
            });
        });

        const $deleteTaskBtn = $taskElement.find(".js--todo-app__delete-task");
        $deleteTaskBtn.on("click", () => {
            const isConfirmed = confirm("Do you want to delete this task?");
            if (!isConfirmed) return;

            deleteTask(taskId, listId);
            $taskElement.remove();
        });
    }

    const initAppHTML = () => {
        taskLists.forEach((list) => {
            const listId = list.id;
            createListHTML(listId);

            const $listElement = $(`#todo-app__list-${listId}`);
            $listElement.find("h2").text(list.name === '' ? 'List header' : list.name);
            setEventInputListName($listElement);
            setEventCreateTask($listElement);
            setEventDeleteList($listElement);

            list.tasks.forEach(task => {
                let $taskElement = createTaskHTML($listElement, task.id);
                setEventsTaskUpdate($taskElement, $listElement);
                $taskElement.find(".js--todo-app__task__value").text(task.value);
                $taskElement.find("input[type='checkbox']").prop("checked", task.isCompleted);
            });
        });
    }
}

new ToDo({
    addListBtn: $("#js--add-list")[0]
}).init()