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
    //console.log("users: ", users)

    if (users.length === 0) return null

    const mostLikedPost = (user) => {
        //console.log("user.blogs: ", user.blogs)
        if (user.blogs.length === 0) return 0

        const post = user.blogs.reduce((p, c) => p.likes > c.likes ? p : c)
        return post.likes
    }
    //console.log( "max: ", mostLikedPost(users[2]))

    const sortedUsers = orderBy(users, ["blogs"], ["desc"])
    return (
        <div>
            <h2>Users</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                        <th>Most like post</th>
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