import { NavLink } from "react-router";

function Menu() {
    return <header>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about-us">About Us</NavLink>
                </li>
                <li>
                    <NavLink to="/our-work">Our Work</NavLink>
                </li>
                <li>
                    <NavLink to="/get-in-touch">Get In Touch</NavLink>
                </li>
            </ul>
        </nav>
    </header>
}

export default Menu;