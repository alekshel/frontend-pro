import {useDispatch, useSelector} from "react-redux";
import selectors from "../../core/selectors.js";
import {fetchData, clearData} from "../../core/thunks/fetchData.js";
import {useEffect} from "react";

function ResponseBox() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const clearHandle = () => {
        dispatch(clearData());
    };

    const response = useSelector(selectors.response);

    return (
        <div className="mt-3 p-3 response-box">
            <div className="mb-3 d-flex flex-row">
                <div className="response-box__tag">
                    people
                </div>
                <div className="response-box__tag">
                    1
                </div>
            </div>

            <pre className="mb-0">{JSON.stringify(response, null, 4)}</pre>

            <button onClick={clearHandle}>Clear</button>
        </div>
    );
}

export default ResponseBox;