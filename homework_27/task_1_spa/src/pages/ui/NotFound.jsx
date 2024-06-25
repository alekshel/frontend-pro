import { NavLink } from "react-router-dom";

function NotFound() {
    return (
        <>
            <h1>404 Not Found</h1>
            <NavLink to="/">Go to home</NavLink>
        </>
    )
}

export default NotFound;