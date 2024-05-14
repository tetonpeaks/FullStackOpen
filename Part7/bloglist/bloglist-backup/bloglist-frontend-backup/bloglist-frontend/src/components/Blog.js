import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Comments from "./Comments"

import { updateLikes, deleteBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"

//import { useEffect } from "react"
//import { initializeBlogs } from "../reducers/blogReducer"
//import { initializeUser } from "../reducers/userReducer"

const Blog = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //useEffect(() => {
    //    dispatch(initializeUser())
    //    dispatch(initializeBlogs())
    //}, [])

    const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

    const validUser = useSelector(state => state.login)
    const user  = useSelector(state => state.user.find(user => user.username === validUser.username))

    if (!blog || !user) return null

    const handleLike = (blog) => {
        dispatch(updateLikes(blog))
        dispatch(notify(`you liked '${blog.title}' by '${blog.author}'`))
    }

    const handleDelete = (blog, userId) => {
        if (blog.user[0].id !== userId) {
            dispatch(notify("blog posts can only be deleted by the creator"))
            dispatch(deleteBlog(blog, userId))
            navigate("/")
        } else {
            dispatch(deleteBlog(blog, userId))
            dispatch(notify(`'${blog.title}' by '${blog.author}' has been deleted`))
            navigate("/")
        }
    }

    return (
        <div className='blogStyle'>
            <div>
                <span className='title-post'>{blog.title} by {" "}</span>
                <span className='author'>{blog.author}</span>{" "}
            </div>
            <div className='togglableContent'>
                <p>{blog.url}</p>
                <p className='likes'>Likes: {blog.likes} {" "}<button className='btn-like' onClick={() => handleLike(blog)}>Like</button></p>
                <button className='btn-rm' onClick={() => handleDelete(blog, user.id)}>Remove</button>
            </div>
            <div>
                <Comments blog={blog}/>
            </div>
        </div>
    )
}

export default Blog