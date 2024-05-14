import React from "react"
import { connect } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"
import { useState } from "react"

import { Form, Button } from "react-bootstrap"

const PostForm = (props) => {
    const [newPost, setNewPost] = useState({ title: "", author: "", url: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewPost({ ...newPost, [name]: value })
    }

    const addPost = (e) => {
        e.preventDefault()
        //console.log("e: ", e.target[0].value)
        const newPost = {
            title: e.target[0].value,
            author: e.target[1].value,
            url: e.target[2].value,
        }

        e.target[0].value = ""
        e.target[1].value = ""
        e.target[2].value = ""

        props.createBlog(newPost)
        props.notify(`New blog '${newPost.title}'`)
    }

    return (
        <div className='div-form'>
            <Form onSubmit={addPost}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name ="title" onChange={handleChange} />
                    <Form.Label>Author:</Form.Label>
                    <Form.Control type="text" name ="author" onChange={handleChange} />
                    <Form.Label>URL:</Form.Label>
                    <Form.Control type="text" name ="url" onChange={handleChange} />
                    <Button variant="primary" type='submit'>Post</Button>
                </Form.Group>
            </Form>
        </div>
    )

}

const mapDispatchToProps = {
    createBlog,
    notify
}

export default connect(null, mapDispatchToProps)(PostForm)