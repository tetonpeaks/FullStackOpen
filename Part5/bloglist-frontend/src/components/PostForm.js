import { useState } from "react"

const PostForm = ({ createPost }) => {
    const [newPost, setNewPost] = useState({ title: "", author: "", url: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewPost({ ...newPost, [name]: value })
    }

    const addPost = (e) => {
        e.preventDefault()
        createPost({
            title: newPost.title,
            author: newPost.author,
            url: newPost.url,
        })

        setNewPost({ title: "", author: "", url: "" })
    }

    return (
        <div className='div-form'>
            <form onSubmit={addPost}>
                <div>Title: <input className='title-form' type='text' name='title' value={newPost.title} onChange={handleChange}/></div>
                <div>Author: <input className='author-form' type='text' name='author' value={newPost.author} onChange={handleChange}/></div>
                <div>URL: <input className='url-form' type='text' name='url' value={newPost.url} onChange={handleChange} /></div>
                <button className='btn-post' type='submit'>Post</button>
            </form>
        </div>
    )
}

export default PostForm