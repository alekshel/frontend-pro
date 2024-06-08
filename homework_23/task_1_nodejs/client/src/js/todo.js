'use strict';

import '../../src/scss/basic.scss'
import '../../src/scss/todo.scss'

import Modal from 'bootstrap/js/dist/modal';
import {
    initTasksRequest,
    saveListRequest,
    updateListRequest,
    deleteListRequest,
    saveTaskRequest,
    updateTaskRequest,
    updateTaskCompletedRequest,
    deleteTaskRequest
} from './requests';

function ToDo({addListBtn}) {
    const appListClassName = "js--todo-app__list";
    const appTasksClassName = "js--todo-app__tasks";
    const addTaskClassName = "js--todo-app__add-task";
    const deleteListClassName = "js--todo-app__delete-list";

    const getListTemplate = id => `
        <div id="todo-app__list-${id}" class="todo-app__list ${appListClassName}" data-id="${id}">
            <h2 contenteditable="true">New Task List</h2>

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

    this.init = async function () {
        taskLists = await initTasksRequest();
        initEventCreateListHTML();
        initAppHTML();
    }

    const getList = (id) => {
        return taskLists.find(list => list["_id"] === id);
    }

    const getTask = (taskId, listId) => {
        return getList(listId).tasks.find(task => task["_id"] === taskId);
    }

    const addList = async () => {
        const list = await saveListRequest({name: ""})
        taskLists.push(list);
        return list["_id"];
    }

    const addTaskToList = async (listId, taskObj) => {
        const task = await saveTaskRequest(taskObj);
        getList(listId).tasks.push(task);
        return task["_id"];
    }

    const updateListName = async (id, name) => {
        const formatName = name.trim();
        await updateListRequest(id, {name: formatName});
        getList(id).name = formatName;
    }

    const updateTask = async (taskId, listId, value) => {
        const title = value.trim();
        await updateTaskRequest(taskId, {
            title: title,
        });
        getTask(taskId, listId).title = title;
    }

    const changeCompletedTask = async (taskId, listId) => {
        const task = getTask(taskId, listId);
        task.completed = !task.completed;
        sortTasks(listId);
        await updateTaskCompletedRequest(taskId, {
            completed: task.completed
        });
    }

    const sortTasks = (listId) => {
        const list = getList(listId);
        list.tasks.sort((a, b) => a.completed - b.completed);
    }

    const deleteList = async (id) => {
        await deleteListRequest(id);
        taskLists = taskLists.filter(list => list["_id"] !== id);
    }

    const deleteTask = async (taskId, listId) => {
        await deleteTaskRequest(taskId);
        const list = getList(listId);
        list.tasks = list.tasks.filter(task => task["_id"] !== taskId);
    }

    const createListHTML = (id = null) => {
        $(addListBtn).before(getListTemplate(id));
    }

    const initEventCreateListHTML = () => {
        $(addListBtn).on("click", async () => {
            const listId = await addList();
            createListHTML(listId);

            const $listElement = $(`#todo-app__list-${id}`);
            setEventInputListName($listElement);
            setEventCreateTask($listElement);
            setEventDeleteList($listElement);
        });
    }

    const setEventInputListName = ($listElement) => {
        const $h2 = $listElement.find("h2");
        $h2.on("input", async (event) => {
            await updateListName($listElement.data("id"), event.target.textContent);
        });
        $h2.focus();
    }

    const setEventDeleteList = ($listElement) => {
        const $deleteListBtn = $listElement.find(`.${deleteListClassName}`);
        $deleteListBtn.on("click", async () => {
            const isConfirmed = confirm("Do you want to delete this list?");
            if (!isConfirmed) return;

            await deleteList($listElement.data("id"));
            $listElement.remove();
        });
    }

    const createTaskHTML = ($listElement, id) => {
        const $tasks = $listElement.find(`.${appTasksClassName}`);
        const listId = $listElement.data("id");
        $tasks.append(getTaskTemplate(listId, id));
        return $(`#todo-app__task-${id}`);
    }

    const setEventCreateTask = ($listElement) => {
        const $addTaskBtn = $listElement.find(`.${addTaskClassName}`);
        $addTaskBtn.on("click", async () => {
            const taskId = await addTaskToList($listElement.data("id"), {
                title: "", completed: false, taskList: $listElement.data("id")
            });

            const $taskElement = createTaskHTML($listElement, taskId);
            $taskElement.find(".js--todo-app__task__value").focus();
            setEventsTaskUpdate($taskElement, $listElement);
        });
    }

    const setEventsTaskUpdate = ($taskElement, $listElement) => {
        const taskId = $taskElement.data("id");
        const listId = $listElement.data("id");

        const $taskValue = $taskElement.find(".js--todo-app__task__value");
        $taskValue.on("input", async (event) => {
            await updateTask(taskId, listId, event.target.textContent);
        });

        $taskValue.on("dblclick", (event) => {
            const modal = $('#modal');
            modal.find(".modal-body").html($(event.target).text());
            new Modal(modal).show(event.target);
        });

        const $completeCheckbox = $taskElement.find("input[type='checkbox']");
        $completeCheckbox.on("change", async () => {
            await changeCompletedTask(taskId, listId);
            getList(listId).tasks.forEach(task => {
                const $elementToMove = $(`#todo-app__task-${task["_id"]}`);
                $taskElement.parent().append($elementToMove);
            });
        });

        const $deleteTaskBtn = $taskElement.find(".js--todo-app__delete-task");
        $deleteTaskBtn.on("click", async () => {
            const isConfirmed = confirm("Do you want to delete this task?");
            if (!isConfirmed) return;

            await deleteTask(taskId, listId);
            $taskElement.remove();
        });
    }

    const initAppHTML = () => {
        taskLists.forEach((list) => {
            const listId = list["_id"];
            createListHTML(listId);

            const $listElement = $(`#todo-app__list-${listId}`);
            $listElement.find("h2").text(list.name === '' ? 'New Task List' : list.name);
            setEventInputListName($listElement);
            setEventCreateTask($listElement);
            setEventDeleteList($listElement);

            list.tasks.forEach(task => {
                let $taskElement = createTaskHTML($listElement, task["_id"]);
                setEventsTaskUpdate($taskElement, $listElement);
                $taskElement.find(".js--todo-app__task__value").text(task.title);
                $taskElement.find("input[type='checkbox']").prop("checked", task.completed);
            });
        });
    }
}

await new ToDo({
    addListBtn: $("#js--add-list")[0]
}).init()