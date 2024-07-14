import {Provider} from "react-redux";
import {store} from "../core/redux/store.js";

import Form from "./components/Form.jsx";
import TaskList from "./components/TaskList.jsx";
import ClearDataButton from "./components/ClearDataButton.jsx";

function App() {
    return (
        <Provider store={store}>
            <div className="container mt-5">
                <h1 className="mb-4">Task List</h1>

                <Form/>
                <TaskList/>

                <ClearDataButton/>
            </div>
        </Provider>
    )
}

export default App
