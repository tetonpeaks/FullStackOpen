import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"
import NavBarMenu from "./components/NavBarMenu"
import BlogList from "./components/BlogList"
import UserList from "./components/UserList"
import Blog from "./components/Blog"
import User from "./components/User"
import Notification from "./components/Notification"

import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser } from "./reducers/userReducer"
import userService from "./services/users"

import { login } from "./reducers/loginReducer"

//import { notify } from "./reducers/notificationReducer"

const App = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.login)

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

    const postFormRef = useRef()

    if (user === null) {
        return (
            <div className="container">
                <NavBarMenu user={user} postFormRef={postFormRef} />
            </div>
        )
    }

    return (
        <div className="container">
            <div className='div-notify'><Notification /></div>
            <NavBarMenu user={user} postFormRef={postFormRef} />
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