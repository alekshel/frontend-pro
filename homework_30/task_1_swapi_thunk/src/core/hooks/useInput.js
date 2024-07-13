import {useDispatch} from "react-redux";
import {fetchData} from "../thunks/fetchData.js";
import swapiSlice from "../slices/swapiSlice.js";

export function useInput() {
    const dispatch = useDispatch();

    const handleChange = event => {
        dispatch(swapiSlice.actions.setEndpoint(event.target.value));
    };

    const handleClick = (value) => {
        dispatch(fetchData(value));
    };

    return {
        onChange: handleChange,
        onClick: handleClick,
    };
}