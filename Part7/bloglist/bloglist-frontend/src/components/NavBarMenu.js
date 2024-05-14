import { useDispatch } from "react-redux"
import { Button, Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/loginReducer"
import LoginForm from "./LoginForm"
import Togglable from "./Togglable"

const NavBarMenu = ({ user, postFormRef }) => {
    const dispatch = useDispatch()

    const handleLogout = () => dispatch(logoutUser())

    const padding = { padding: 5 }

    if (!user) return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-start" style={{ width: "100%" }}>
                    <Nav.Link href="#" as="span"></Nav.Link>
                    <Nav.Link href="#" as="span"></Nav.Link>
                </Nav>
                <Nav className="justify-content-center" style={{ width: "100%", color: "white", padding: "20px" }}>
                    <h3 style={padding}>CMC Blogs</h3>
                </Nav>
                <Nav className="justify-content-end" style={{ width: "100%" }} >
                    <Nav.Link href="#" as="span">
                        <Togglable buttonLabel='Login' ref={postFormRef}><LoginForm /></Togglable>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-start" style={{ width: "100%" }}>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/"><Button>Blogs</Button></Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users"><Button>Users</Button></Link>
                    </Nav.Link>
                </Nav>
                <Nav className="justify-content-center" style={{ width: "100%", color: "white", padding: "20px" }}>
                    <h3 style={padding}>CMC Blogs</h3>
                </Nav>
                <Nav className="justify-content-end" style={{ width: "100%" }} >
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/login"><Button onClick={handleLogout}>Logout</Button></Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarMenu