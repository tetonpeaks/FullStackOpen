import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { orderBy } from "lodash"
import { initializeBlogs } from "../reducers/blogReducer"
import PostForm from "./PostForm"
import Togglable from "./Togglable"
//import { notify } from "../reducers/notificationReducer"s

import { Table } from "react-bootstrap"

const BlogList = ({ postFormRef }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const blogs = useSelector(state => state.blogs)

    const sortedBlogs = orderBy(blogs, ["likes"], ["desc"])

    return (
        <div className='div-Blog'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Most Liked Blogs</th>
                        <th>Author</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedBlogs
                        .sort((a, b) => b.likes - a.likes)
                        .map(blog => (
                            <tr key={blog.id}>
                                <td><Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                                <td><Link key={blog.id} to={`/users/${blog.user[0].id}`}>{blog.author}</Link></td>
                                <td>{blog.likes}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Togglable buttonLabel='New Post' ref={postFormRef}><PostForm  /></Togglable>
        </div>
    )
}

export default BlogList