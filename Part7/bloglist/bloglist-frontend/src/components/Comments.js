//import React from "react"
import { useField } from "../hooks/index"
import { useDispatch } from "react-redux"
import { createComment } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"

const Comments = ({ blog }) => {
    const { reset: resetComment, ...comment } = useField("text")

    const dispatch = useDispatch()

    const { id, comments } = blog

    const addComment = (e) => {
        e.preventDefault()

        e.target.value = ""

        dispatch(createComment(id, comment.value.trim()))
        dispatch(notify("Comment posted!"))
        resetComment()
    }

    return (
        <div className='div-form'>
            <strong>Comments</strong>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((c, key) => (<li key={key}>{c}</li>))}
                </ul>
            ) : (
                <p>No comments</p>
            )}
            <form onSubmit={addComment}>
                <span>
                    <input className='cmt-form' type='text' name='comment' {...comment}/>
                    <button className='btn-post' type='submit'>Comment</button>
                </span>
            </form>
        </div>
    )
}

export default Comments