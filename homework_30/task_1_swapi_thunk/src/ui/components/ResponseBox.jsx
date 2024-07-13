import {useDispatch, useSelector} from "react-redux";
import selectors from "../../core/selectors.js";
import {fetchData, clearData} from "../../core/thunks/fetchData.js";
import {useEffect} from "react";
import swapiSlice from "../../core/slices/swapiSlice.js";

function ResponseBox() {
    const dispatch = useDispatch();
    useEffect(() => {
        const value = "people/1/";
        dispatch(swapiSlice.actions.setEndpoint(value))
        dispatch(fetchData(value));
    }, [dispatch]);

    const clearHandle = () => {
        dispatch(clearData());
    };

    const response = useSelector(selectors.response);
    const tags = () => {
        const value = useSelector(selectors.endpoint);
        if (!value) return ['', ''];

        return value.split('/');
    }

    return (
        <div className="mt-3 p-3 response-box">
            <div className="mb-3 d-flex flex-row">
                <div className="response-box__tag">
                    {tags()[0]}
                </div>
                <div className="response-box__tag">
                    {tags()[1]}
                </div>
            </div>

            <pre className="mb-0">{JSON.stringify(response, null, 4)}</pre>

            <button onClick={clearHandle}>Clear</button>
        </div>
    );
}

export default ResponseBox;