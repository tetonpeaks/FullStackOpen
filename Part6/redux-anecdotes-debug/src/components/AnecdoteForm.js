import React from "react"
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ""
        props.createAnecdote(content)
        props.notify(`New anecdote '${content}'`)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    notify
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)