import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { orderBy } from "lodash"
import { Table } from "react-bootstrap"

import { useEffect } from "react"
import { initializeBlogs } from "../reducers/blogReducer"
import { initializeUser } from "../reducers/userReducer"

const UserList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeBlogs())
    }, [])

    const users = useSelector(state => state.user)

    if (users.length === 0) return null

    const mostLikedPost = (user) => {
        if (user.blogs.length === 0) return 0

        const blog = user.blogs.reduce((p, c) => p.likes > c.likes ? p : c)

        return <div><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
    }

    const sortedUsers = orderBy(users, ["blogs"], ["desc"])

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs Created</th>
                        <th>Most Liked blog</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                            <td>{mostLikedPost(user)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList