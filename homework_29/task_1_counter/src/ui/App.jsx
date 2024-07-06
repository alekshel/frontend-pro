import { Provider } from 'react-redux';
// ui
import Output from "./components/Output.jsx";
import ButtonDecrement from "./components/ButtonDecrement.jsx";
import ButtonIncrement from "./components/ButtonIncrement.jsx";
// core
import {store} from "../core/store.js";

function App() {
    return (
        <Provider store={store}>
            <Output/>
            <ButtonIncrement/>
            <ButtonDecrement/>
        </Provider>
    )
}

export default App
