import {useDispatch} from "react-redux";
import { counter } from "../../core/slice/counterSlice.js";

export default function ButtonIncrement() {
    const dispatcher = useDispatch();
    const onClick = () => {
        dispatcher(counter.actions.increment())
    }
    return <button onClick={onClick}>+</button>
}
