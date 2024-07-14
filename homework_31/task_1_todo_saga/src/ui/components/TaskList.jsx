import {useDispatch, useSelector} from "react-redux";
import selectors from "../../core/redux/selectors.js";
import {useEffect} from "react";
import {todoAsyncActins} from "../../core/saga/asyncActions.js";
import Task from "./Task.jsx";

function TaskList() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectors.loader);
    const tasks = useSelector(selectors.data);

    useEffect(() => {
        dispatch(todoAsyncActins.getTasks())
    }, [dispatch]);

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : (<ul className="list-unstyled">
                    {tasks && tasks.length === 0 && <p>No tasks</p>}
                    {tasks && tasks.map((task, index) => (
                        <Task key={index} {...task} />
                    ))}
                </ul>)}
        </>
    )
}

export default TaskList;
