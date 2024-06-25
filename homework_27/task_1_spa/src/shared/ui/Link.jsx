import { NavLink } from "react-router-dom";

function Link(props) {
    const { to, children, href } = props;
    if (to) {
        return (
            <NavLink to={to}>
                {children}
            </NavLink>
        )
    } else {
        return (
            <a href={href}>
                {children}
            </a>
        )
    }
}

export default Link;