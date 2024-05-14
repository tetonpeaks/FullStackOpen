import { useState } from "react"
import "../styles/styles.css"

const Blog = ({ blog, likePost, deletePost }) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    const handleLike = (e) => {
        e.preventDefault()

        const postObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        likePost(blog.id, postObject)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        deletePost(blog)
    }

    return (
        <div className='blogStyle'>
            <div>
                <span className='title-post'>{blog.title} by {" "}</span>
                <span className='author'>{blog.author}</span>{" "}
                <button className='btn-visible' onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button>
            </div>
            {visible && (
                <div className='togglableContent'>
                    <p>{blog.url}</p>
                    <p className='likes'>Likes: {blog.likes} {" "}<button className='btn-like' onClick={handleLike}>Like</button></p>
                    <button className='btn-rm' onClick={handleDelete}>Remove</button>
                </div>
            )}
        </div>
    )
}

export default Blog