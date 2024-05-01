'use strict';

function ToDo({ app, addListBtn }) {
    const appListClassName = "js--todo-app__list";
    const appTasksClassName = "js--todo-app__tasks";
    const addTaskClassName = "js--todo-app__add-task";

    const getListTemplate = id => `
        <div id="todo-app__list-${id}" class="todo-app__list ${ appListClassName }" data-id="${ id }">
            <h2 contenteditable="true">List header</h2>

            <ul class="todo-app__tasks ${ appTasksClassName }"></ul>

            <button class="todo-app__add-task ${ addTaskClassName }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
                <span>Add Task ...</span>
            </button>
        </div>
    `;

    const getTaskTemplate = (listId, taskId) => `
        <li id="todo-app__task-${ taskId }" class="todo-app__task" data-id="${ taskId }">
            <input type="checkbox" id="complete-checkbox-${ listId }-${ taskId }"/>
            <label for="complete-checkbox-${ listId }-${ taskId }"></label>

            <div contenteditable="true" class="js--todo-app__task__value"></div>

            <button class="todo-app__delete-task js--todo-app__delete-task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </button>
        </li>
    `;

    let taskLists;

    this.init = function () {
        initTasksFromStorage();
        initAppHTML();
        initEventCreateList();
    }

    const initTasksFromStorage = () => {
        taskLists = JSON.parse(localStorage.getItem("taskLists")) || [];
    }

    const initAppHTML = () => {
        taskLists.forEach((list, index) => {
            addListBtn.insertAdjacentHTML("beforebegin", getListTemplate(index));

            const listElement = document.getElementById(`todo-app__list-${index}`);
            listElement.querySelector("h2").textContent = list.name;

            list.tasks.forEach(task => {
                const tasks = listElement.querySelector(`.${ appTasksClassName }`);
                tasks.insertAdjacentHTML("beforeend", getTaskTemplate(list.id, task.id));
                tasks.querySelector(`#todo-app__task-${task.id} .js--todo-app__task__value`).textContent = task.value;
            });

            setEventCreateTask(listElement);
        });
    }

    const getListFromTasks = (listId) => {
        return taskLists.find(list => list.id === +listId);
    }

    const getTaskFromList = (listId, taskId) => {
        return getListFromTasks(+listId).tasks.find(task => task.id === +taskId);
    }

    const addList = (id) => {
        taskLists.push({ id, name: "", tasks: [] });
        saveToStorage();
    }

    const addTaskToList = (listId, task) => {
        getListFromTasks(listId).tasks.push(task);
        saveToStorage();
    }

    const updateListName = (listId, name) => {
        getListFromTasks(listId).name = name.trim();
        saveToStorage();
    }

    const updateTask = (listId, taskId, value) => {
        getTaskFromList(listId, taskId).value = value.trim();
        saveToStorage();
    }

    const changeCompletedTask = (listId, taskId) => {
        const task = getTaskFromList(listId, taskId);
        task.isCompleted = !task.isCompleted;
        saveToStorage();
    }

    const deleteList = (listId) => {
        taskLists = taskLists.filter(list => list.id !== +listId);
        saveToStorage();
    }

    const deleteTask = (listId, taskId) => {
        const list = getListFromTasks(listId);
        list.tasks = list.tasks.filter(task => task.id !== +taskId);
        saveToStorage();
    }

    const saveToStorage = () => {
        localStorage.setItem("taskLists", JSON.stringify(taskLists));
    }

    const createListHTML = () => {
        const id = document.querySelectorAll(".js--todo-app__list").length;
        addListBtn.insertAdjacentHTML("beforebegin", getListTemplate(id));
        addList(id);

        const listElement = document.getElementById(`todo-app__list-${id}`);
        setInputListNameEvent(listElement);
        setEventCreateTask(listElement);
    }

    const setInputListNameEvent = (listElement) => {
        const h2 = listElement.querySelector("h2");
        h2.addEventListener("input", () => {
            updateListName(listElement.dataset.id, h2.textContent);
        });
        h2.focus();
    }

    const setEventCreateTask = (listElement) => {
        const addTaskBtn = listElement.querySelector(`.${ addTaskClassName }`);
        addTaskBtn.addEventListener("click", createTaskHTML.bind(this, listElement));
    }

    const createTaskHTML = (listElement) => {
        const tasks = listElement.querySelector(`.${ appTasksClassName }`);
        const id = tasks.children.length;
        const listId = listElement.dataset.id;
        tasks.insertAdjacentHTML("beforeend", getTaskTemplate(listId, id));

        const taskElement = tasks.querySelector(`#todo-app__task-${id}`);
        taskElement.querySelector(".js--todo-app__task__value").focus();

        setTaskUpdateEvents(taskElement, listElement);
        addTaskToList(listElement.dataset.id, { id, value: "", isCompleted: false });
    }

    const initEventCreateList = () => {
        addListBtn.addEventListener("click", createListHTML);
    }

    const setTaskUpdateEvents = (listElement, taskElement) => {
        const taskValue = taskElement.querySelector(".js--todo-app__task__value");
        taskValue.addEventListener("input", () => {
            updateTask(listElement.dataset.id, taskElement.dataset.id, taskValue.textContent);
        });
        const completeCheckbox = taskElement.querySelector("input[type='checkbox']");
        completeCheckbox.addEventListener("change", () => {
            changeCompletedTask(listElement.dataset.id, taskElement.dataset.id);
        });
    }
}

new ToDo({
    app: document.getElementById("js--todo-app"),
    addListBtn: document.getElementById("js--add-list")
}).init()