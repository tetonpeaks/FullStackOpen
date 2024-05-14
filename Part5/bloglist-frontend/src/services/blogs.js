import axios from "axios"
const baseUrl = "/api/blogs"

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newObject => {
    const config = { headers: { Authorization: token } }
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

const update = async (ID, postObject) => {
    const config = { headers: { Authorization: token } }

    const res = await axios.put(`${baseUrl}/${ID}`, postObject, config)
    return res.data
}

const remove = async (postObject) => {
    const config = { headers: { Authorization: token } }

    const res = await axios.delete(`${baseUrl}/${postObject.id}`, config)
    return res.data
}

const blogService = {
    setToken: setToken,
    getAll: getAll,
    create: create,
    update: update,
    remove: remove,
}

export default blogService