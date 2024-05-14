import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newObject => {
    //const config = { headers: { Authorization: token } }
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

const update = async (anecdote) => {
    //const config = { headers: { Authorization: token } }
    console.log('anecdote: ', anecdote)
    const { id } = anecdote
    const votes = { votes: anecdote.votes + 1}
    const res = await axios.put(`${baseUrl}/${id}`, votes)
    return res.data
}

const remove = async (postObject) => {
    //const config = { headers: { Authorization: token } }

    const res = await axios.delete(`${baseUrl}/${postObject.id}`)
    return res.data
}

const anecdoteService = {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove,
}

export default anecdoteService