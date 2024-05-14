import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"

const User = () => {

    const id = useParams().id

    //const user = useSelector(state => state.user)
    const user = useSelector(state => state.user.find(user => user.id === id))
    if (!user) return null


    //console.log("id: ", id, "user: ", user)
    //note the => () instead of {}, maping to a function not an object
    return (
        <div className='blogStyle'>
            <h2>{user.name}</h2>
            {user.blogs.length > 0 ? (
                <div>
                    <h4>Most recently updated posts:</h4>
                    <ul>
                        {user.blogs.map(blog => (
                            <Link key={blog.id} to={`/blogs/${blog.id}`}><li>{blog.title}</li></Link>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>no blogs yet</p>
            )}
        </div>
    )
}

export default User