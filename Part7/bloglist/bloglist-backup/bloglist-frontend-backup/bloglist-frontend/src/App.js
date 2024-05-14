import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import BlogList from "./components/BlogList"
import UserList from "./components/UserList"
import Blog from "./components/Blog"
import User from "./components/User"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
//import NavBar from "./components/NavBar"
import { Button, Navbar, Nav } from "react-bootstrap"

import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser } from "./reducers/userReducer"
import userService from "./services/users"

import { login, logoutUser } from "./reducers/loginReducer"

//import { notify } from "./reducers/notificationReducer"

const App = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.login)

    //console.log("user: ", user)

    // Solves refresh issue
    useEffect(() => {
        const validUser = userService.getUser()
        if (validUser) {
            dispatch(login(validUser))
        }
    }, [])

    // key to see users and blogs in components
    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeBlogs())
    }, [])

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    const padding = {
        padding: 5
    }

    const NavBarMenu = () => {

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
                    <Nav className="justify-content-end" style={{ width: "100%" }} >
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/login"><Button onClick={handleLogout}>Logout</Button></Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }


    const postFormRef = useRef()

    if (user === null) {
        return (
            <div className="container">
                <div className='div-app-title'><h2>CMC Blogs</h2></div>
                <div className='div-LoginForm'>
                    <Togglable buttonLabel='Login' ref={postFormRef}><LoginForm /></Togglable>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className='div-app-title'><h2>CMC Blogs</h2></div>
            <div className='div-notify'><Notification /></div>
            <NavBarMenu />
            <div>
                <Routes>
                    <Route path="/" element={<BlogList postFormRef={postFormRef} />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
            </div>
        </div>
    )
}

export default App