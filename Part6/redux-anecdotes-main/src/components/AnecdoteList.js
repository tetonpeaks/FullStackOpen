import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { orderBy } from "lodash"
import { notify } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    console.log('anecdotes: ', anecdotes)
    const dispatch = useDispatch()

    const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

    const vote = (id) => {
        //console.log('vote', id)
        dispatch(updateVotes(id))
        //dispatch(notify(`Your vote has be placed`))
    }

    return (
        <div>
            {sortedAnecdotes.map((anecdote, idx) =>
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