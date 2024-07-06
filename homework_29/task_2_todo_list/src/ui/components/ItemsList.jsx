import {useSelector} from "react-redux";
import selectors from "../../core/selectors.js";

export default function ItemsList() {
    const items = useSelector(selectors.items);
    return (
        <>
            <h1>Items list</h1>
            {
                items.length === 0
                    ? <p>No items</p>
                    : <ul>{items.map(item => <li key={item.id}>{item.text}</li>)}</ul>
            }
        </>
    )
}