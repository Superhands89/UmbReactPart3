import { Link } from "react-router";

function Menu() {
    return <header>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about-us">About Us</Link>
                </li>
                <li>
                    <Link to="/our-work">Our Work</Link>
                </li>
                <li>
                    <Link to="/get-in-touch">Get In Touch</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default Menu;