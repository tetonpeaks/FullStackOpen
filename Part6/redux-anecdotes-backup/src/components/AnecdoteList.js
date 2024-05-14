import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { orderBy } from "lodash"

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

    const vote = (id) => {
        //console.log('vote', id)
        dispatch(updateVotes(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList