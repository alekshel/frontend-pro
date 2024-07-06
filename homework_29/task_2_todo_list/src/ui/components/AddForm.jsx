import {useDispatch} from "react-redux";
import todoSlice from "../../core/slices/todoSlice.js";

export default function AddForm() {
    const dispatch = useDispatch();
    const onSubmit = event => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(event.target));

        if (!values.inputValue) {
            return;
        }

        dispatch(todoSlice.actions.addItem({id: Math.random(), text: values.inputValue}));
        event.target.reset();
    }

    return (
        <>
            <h1>Task add form</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="inputValue"/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}