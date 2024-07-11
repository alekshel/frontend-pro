import {store} from "../core/store.js";
import Input from "./components/Input.jsx";
import ResponseBox from "./components/ResponseBox.jsx";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <h1 className="mt-3">SWAPI</h1>
                <Input/>
                <ResponseBox/>
            </div>
        </Provider>
    )
}

export default App
