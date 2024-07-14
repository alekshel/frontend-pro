import Button from "./Button.jsx";
import {useDispatch} from "react-redux";
import {todoAsyncActins} from "../../core/saga/asyncActions.js";

function Task({id, todo, completed}) {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(todoAsyncActins.deleteTask(id))
    }
    const handleEdit = (event, id) => {
        const todo = event.target.closest(".todo-item").querySelector("input[type='text']").value;
        const completed = event.target.closest(".todo-item").querySelector("input[type='checkbox']").checked;

        dispatch(todoAsyncActins.updateTask({
            id,
            todo,
            completed
        }))
    }

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                className="form-check-input"
                defaultChecked={completed}
                onClick={(event) => handleEdit(event, id)}
            />

            <input
                type="text"
                className="form-control"
                defaultValue={todo}
            />

            <Button
                className={"btn btn-outline-secondary btn-sm"}
                onClick={(event) => handleEdit(event, id)}
            >Edit</Button>

            <Button
                className={"btn btn-outline-danger btn-sm"}
                onClick={() => handleDelete(id)}
            >Delete</Button>
        </li>
    )
}

export default Task;
