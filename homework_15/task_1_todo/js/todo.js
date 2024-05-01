'use strict';

function ToDo({ addListBtn }) {
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
        taskLists.forEach((list) => {
            const listId = list.id;
            createListHTML(listId);

            const listElement = document.getElementById(`todo-app__list-${listId}`);
            setInputListNameEvent(listElement);
            setEventCreateTask(listElement);

            list.tasks.forEach(task => {
                let taskElement = createTaskHTML(listElement, task.id);
                setTaskUpdateEvents(listElement, taskElement);
                taskElement.querySelector(".js--todo-app__task__value").textContent = task.value;
                taskElement.querySelector("input[type='checkbox']").checked = task.isCompleted;
            });
        });
    }

    const getListFromTasks = (listId) => {
        return taskLists.find(list => list.id === +listId);
    }

    const getTaskFromList = (listId, taskId) => {
        return getListFromTasks(+listId).tasks.find(task => task.id === +taskId);
    }

    const addList = (id) => {
        taskLists.push({ id: +id, name: "", tasks: [] });
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

    const createListHTML = (defId) => {
        const id = defId ?? document.querySelectorAll(".js--todo-app__list").length;
        addListBtn.insertAdjacentHTML("beforebegin", getListTemplate(id));
        return id;
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
        addTaskBtn.addEventListener("click", () => {
            const taskElement = createTaskHTML(listElement);
            setTaskUpdateEvents(taskElement, listElement);
            addTaskToList(listElement.dataset.id, {
                id: +taskElement.dataset.id,
                value: "",
                isCompleted: false
            });
        });
    }

    const createTaskHTML = (listElement, defTaskId) => {
        const tasks = listElement.querySelector(`.${ appTasksClassName }`);
        const id = defTaskId ?? tasks.children.length;
        const listId = listElement.dataset.id;
        tasks.insertAdjacentHTML("beforeend", getTaskTemplate(listId, id));
        return tasks.querySelector(`#todo-app__task-${id}`);
    }

    const initEventCreateList = () => {
        addListBtn.addEventListener("click", () => {
            const listId = createListHTML();
            addList(listId);

            const listElement = document.getElementById(`todo-app__list-${listId}`);
            setInputListNameEvent(listElement);
            setEventCreateTask(listElement);
        });
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

        const deleteTaskBtn = taskElement.querySelector(".js--todo-app__delete-task");
        deleteTaskBtn.addEventListener("click", () => {
            const isConfirmed = confirm("Do you want to delete this task?");
            if (!isConfirmed) return;

            deleteTask(listElement.dataset.id, taskElement.dataset.id);
            taskElement.remove();
        });
    }
}

new ToDo({
    addListBtn: document.getElementById("js--add-list")
}).init()