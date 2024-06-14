function Input() {
    return (
        <div className="mt-3">
            <div className="input-group">
                <span
                    className="input-group-text"
                    id="basic-addon3"
                >https://swapi.dev/api/</span>

                <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon3 basic-addon4"
                    placeholder="people/1/"
                />

                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >Get info</button>
            </div>
        </div>
    );
}

export default Input;