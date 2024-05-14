import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { orderBy } from "lodash"
import { initializeBlogs } from "../reducers/blogReducer"
import PostForm from "./PostForm"
import Togglable from "./Togglable"
//import { notify } from "../reducers/notificationReducer"

const BlogList = ({ postFormRef }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const blogs = useSelector(state => state.blogs)

    const sortedBlogs = orderBy(blogs, ["likes"], ["desc"])

    return (
        <div className='div-Blog'>
            <Togglable buttonLabel='New Post' ref={postFormRef}><PostForm  /></Togglable>
            <ul>
                <h5>Most liked blogs</h5>
                {sortedBlogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`}><li>{blog.title} by {blog.author}</li></Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default BlogList