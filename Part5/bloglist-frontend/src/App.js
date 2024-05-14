import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import PostForm from "./components/PostForm"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/logins"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [msg, setMessage] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null)
        }, 5000)
        return () => {
            clearTimeout(timer)
        }
    }, [msg])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const validUserJSON = window.localStorage.getItem("validUser") // Obtain information from local storage
        if (validUserJSON) {
            const user = JSON.parse(validUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, []) // empty [] param ensures effect only executed when component is rendered for the first time

    console.log("user from App: ", user)

    const handleLogin = async (username, pw) => {
        try {
            const user = await loginService.login( { username, pw } ) // try getting the user
            console.log("user_handleLogin: ", user)
            console.log("token_handleLogin: ", user.token)
            window.localStorage.setItem("validUser", JSON.stringify(user)) // saving to local storge
            blogService.setToken(user.token)
            setUser(user)
            setMessage(`${user.name} has logged in!`)
            setTimeout(() => {setMessage(null)}, 5000)
        } catch (exception) {
            setMessage("Wrong credentials!")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const createPost = (postObject) => {
        postFormRef.current.toggleVisibility()

        blogService
            .create(postObject)
            .then(returnedBlogs => {
                setBlogs(blogs.concat(returnedBlogs))
            })
    }

    const likePost = async (ID, postObject) => {
        const updatedBlog = await blogService.update(ID, postObject)
        const newBlogs = blogs.map((blog) =>
            blog.id === ID ? updatedBlog : blog
        )

        setBlogs(newBlogs)
    }

    const deletePost = async (postObject) => {
        try {
            if (user) {
                await blogService.remove(postObject)
                const updatedBlog = blogs.filter(post => post.id !== postObject.id)
                setBlogs(updatedBlog)
                setMessage(`${postObject.title} has been removed!`)
            } else {
                setMessage("You must have a registered account and login to delete posts")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }
        } catch (exception) {
            setMessage("error" + exception.response.data.error)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const postFormRef = useRef()

    return (
        <div>
            <div className='div-app-title'>
                <h2>CMC Blogs</h2>
            </div>
            <div className='div-notify'>
                <Notification msg={msg} />
            </div>
            {user === null ? (
                <div className='div-LoginForm'>
                    <Togglable buttonLabel='Login' ref={postFormRef}>
                        <LoginForm
                            handleLogin={handleLogin} />
                    </Togglable>
                </div> ) : (
                <div>
                    <div className='div-PostForm'>
                        <Togglable buttonLabel='New Post' ref={postFormRef}>
                            <PostForm createPost={createPost} />
                        </Togglable>
                    </div>
                    <div className='div-Blog'>
                        <div className='div-logout'>
                            <p><button onClick={handleLogout}>Logout</button></p>
                        </div>
                        {blogs
                            .sort((a, b) => b.likes - a.likes)
                            .map(blog => (
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    likePost={likePost}
                                    deletePost={deletePost} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default App