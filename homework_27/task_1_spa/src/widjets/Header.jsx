import Link from "../shared/ui/Link.jsx";
import routes from "../shared/config/routes.js";
import ThemeSwitcher from "../shared/ui/ThemeSwitcher.jsx";

function Header() {
    return (
        <header className="header">
            <ul className="header__menu">
                {routes.map((route, index) => (
                    <li key={index}>
                        <Link to={route.path}>
                            {route.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ThemeSwitcher className="header__theme_switcher"/>
        </header>
    )
}

export default Header
