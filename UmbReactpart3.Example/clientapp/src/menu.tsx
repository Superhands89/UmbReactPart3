import { NavLink } from "react-router";
import { NavigationItem } from "./lib/umbracoTypes";

interface MenuProps {
    menuItems: NavigationItem[];
}

function Menu({ menuItems }: MenuProps) {
    return <header>
        <nav>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <NavLink to={item.route.path}>
                            {item.properties.navigationTitle?.toString() || item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
}

export default Menu;
