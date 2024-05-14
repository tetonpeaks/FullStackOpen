import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    updateVote(state, action) {
      const votedAnecdote = action.payload;
      const { id } = votedAnecdote;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export const { updateVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  return state
}

//export const initializeAnecdotes = () => {
//return async (dispatch) => {
//   const anecdotes = await anecdoteService.getAll();
//    dispatch(setAnecdotes(anecdotes));
//  };
//};

export const votedAnecdote = (anecdote) => {
  console.log("anecdote: ", anecdote)
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote)
    console.log("votedAnecdote: ", votedAnecdote)
    dispatch(updateVote(votedAnecdote))
  }

}

export default anecdoteSlice.reducer