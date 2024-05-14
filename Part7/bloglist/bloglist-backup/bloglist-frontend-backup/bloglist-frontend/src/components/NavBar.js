import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const padding = {
    padding: 5
}

const NavBar = () => {

    const user = useSelector(state => state.login)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/blogs">Blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">Users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {user
                            ? <em style={padding}>{user} logged in</em>
                            : <Link style={padding} to="/login">login</Link>
                        }
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar