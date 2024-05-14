import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async (content) => {
    const obj = { content, votes: 0 }
    const res = await axios.post(baseUrl, obj)
    return res.data
}

const update = async (anecdote) => {
    //console.log('anecdote: ', anecdote)
    const { id } = anecdote
    const votes = { votes: anecdote.votes + 1 }
    //console.log('votes: ', votes)
    const res = await axios.patch(`${baseUrl}/${id}`, votes)
    return res.data
}

const anecdoteService = {
    getAll: getAll,
    create: create,
    update: update,
}
export default anecdoteService