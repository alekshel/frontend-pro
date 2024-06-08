const initTasksRequest = async () => {
    // taskLists = JSON.parse(localStorage.getItem("taskLists")) || [];
    // lastListId = localStorage.getItem("lastListId") || 1;
    // lastTaskId = localStorage.getItem("lastTaskId") || 1;

    try {
        const result = await fetch("http://localhost:5000/taskList");
        return await result.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

const saveListRequest = async (list) => {
    try {
        const result = await fetch("http://localhost:5000/taskList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        });
        return await result.json();
    } catch (error) {
        console.error(error);
    }
}

const updateListRequest = async (listId, list) => {
    try {
        await fetch(`http://localhost:5000/taskList/${listId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        });
    } catch (error) {
        console.error(error);
    }
}

const deleteListRequest = async (listId) => {
    try {
        await fetch(`http://localhost:5000/taskList/${listId}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(error);
    }
}

const saveTaskRequest = async (task) => {
    try {
        const result = await fetch("http://localhost:5000/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        return await result.json();
    } catch (error) {
        console.error(error);
    }
}

const updateTaskRequest = async (taskId, task) => {
    try {
        await fetch(`http://localhost:5000/task/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error(error);
    }
}

const updateTaskCompletedRequest = async (taskId, task) => {
    try {
        await fetch(`http://localhost:5000/task/${taskId}/completed`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error(error);
    }
}

const deleteTaskRequest = async (taskId) => {
    try {
        await fetch(`http://localhost:5000/task/${taskId}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(error);
    }
}

export {
    initTasksRequest,
    saveListRequest,
    updateListRequest,
    deleteListRequest,
    saveTaskRequest,
    updateTaskRequest,
    updateTaskCompletedRequest,
    deleteTaskRequest
}