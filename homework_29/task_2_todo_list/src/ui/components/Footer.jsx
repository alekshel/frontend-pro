import {useSelector} from "react-redux";
import selectors from "../../core/selectors.js";

export default function Footer() {
    const items = useSelector(selectors.items);
    const length = items.length;
    return (
        <>
            {
                length > 0
                    ? <p>Items count: {length}</p>
                    : null
            }
        </>
    )
}