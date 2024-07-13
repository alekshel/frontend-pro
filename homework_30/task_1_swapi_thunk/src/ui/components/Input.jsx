import { useInput } from "../../core/hooks/useInput.js";
import { useSelector } from "react-redux";
import selectors from "../../core/selectors.js";

function Input() {
    const { onChange, onClick } = useInput();
    const value = useSelector(selectors.endpoint) || '';

    return (
        <div className="mt-3">
            <div className="input-group">
                <span className="input-group-text" id="basic-addon3">https://swapi.dev/api/</span>
                <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon3 basic-addon4"
                    placeholder="people/1/"
                    value={value}
                    onChange={onChange}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => onClick(value)}
                >Get info</button>
            </div>
        </div>
    );
}

export default Input;