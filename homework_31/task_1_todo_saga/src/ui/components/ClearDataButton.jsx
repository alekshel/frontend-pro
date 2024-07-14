import Button from "./Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {todoAsyncActins} from "../../core/saga/asyncActions.js";
import selectors from "../../core/redux/selectors.js";

function ClearDataButton() {
    const dispatch = useDispatch();
    const data = useSelector(selectors.data);
    const handleClearData = () => {
        dispatch(todoAsyncActins.clearData(data))
    }

    return (
        <>
            {data && data.length > 0 &&
                <Button
                    className={"btn btn-danger"}
                    onClick={handleClearData}
                >Clear Data</Button>}
        </>
    )
}

export default ClearDataButton;
