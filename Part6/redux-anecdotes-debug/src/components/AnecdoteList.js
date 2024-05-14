import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, updateVotes } from '../reducers/anecdoteReducer'
import { orderBy } from "lodash"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(state =>
        state.filter
            ? state.anecdotes.filter(anecdote =>
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
                )
            : state.anecdotes
        )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])


    const vote = (anecdote) => {
        //console.log('vote', id)
        dispatch(updateVotes(anecdote))
        dispatch(notify(`you voted '${anecdote.content}'`))
    }

    const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList