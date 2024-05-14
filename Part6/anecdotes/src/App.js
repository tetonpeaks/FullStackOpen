import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote, initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  //useEffect(() => {
  //  dispatch(initializeAnecdotes());
  //}, [dispatch]);

  const vote = (id) => {
    //console.log('vote', id)
    const idx = anecdotes.map(anecdote => anecdote.id).indexOf(id)
    //console.log('idx: ', idx)

    dispatch(votedAnecdote(anecdotes[idx]))
  }

  //const updateVotes = () => {
	//	const newVotes = [...votes]
	//	newVotes[selected] += 1
	//	setVotes(newVotes)
	//}

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App