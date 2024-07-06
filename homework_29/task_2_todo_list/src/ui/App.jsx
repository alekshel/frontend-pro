import {Provider} from "react-redux";
import {store} from "../core/store.js";

import AddForm from "./components/AddForm.jsx";
import ItemsList from "./components/ItemsList.jsx";
import Footer from "./components/Footer.jsx";


function App() {
    return (
        <Provider store={store}>
            <AddForm />
            <ItemsList />
            <Footer />
        </Provider>
    )
}

export default App
