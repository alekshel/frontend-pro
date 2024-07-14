import Button from "./Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {todoAsyncActins} from "../../core/saga/asyncActions.js";
import selectors from "../../core/redux/selectors.js";

function Form() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectors.loader);
    const onSubmit = async (event) => {
        event.preventDefault();

        const todo = event.target.todo;
        if (!todo.value) return alert("Please enter a task");

        dispatch(todoAsyncActins.addTask({
            todo: todo.value,
            completed: false,
        }))
        todo.value = ""
    }

    return (
        <form id="todo-form" onSubmit={onSubmit}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="todo"
                    placeholder="Add new task"
                    aria-label="New task"
                    aria-describedby="button-add"
                />
                <Button
                    className={"btn btn-primary"}
                    type={"submit"}
                    disabled={isLoading}
                >Add</Button>
            </div>
        </form>
    )
}

export default Form;
