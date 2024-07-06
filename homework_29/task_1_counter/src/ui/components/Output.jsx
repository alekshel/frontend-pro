import {useSelector} from "react-redux";
import selector from "../../core/slice/selectors.js";

export default function Output() {
    const value = useSelector(selector.counter.value);
    return <h1>Value: <span>{value}</span></h1>
}
