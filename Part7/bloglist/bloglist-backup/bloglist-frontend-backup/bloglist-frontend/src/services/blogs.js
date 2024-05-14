import axios from "axios"
import userService from "./users"

const baseUrl = "/api/blogs"

const config = () => {
    const token = userService.getToken()
    return { headers: { Authorization: `bearer ${token}` } }
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newObject => {
    const res = await axios.post(baseUrl, newObject, config())
    return res.data
}

const update = async (blog) => {
    const { id } = blog
    const likes = { likes: blog.likes + 1 }

    const res = await axios.put(`${baseUrl}/${id}`, likes, config())
    return res.data
}

const remove = async (blog) => {
    const { id } = blog

    const res = await axios.delete(`${baseUrl}/${id}`, config())
    return res.data
}

const addComment = async (id, comment) => {
    //console.log("id: ", id, "comment: ", { comment })
    const res = await axios.post(`${baseUrl}/${id}/comments`, { comment } , config())
    return res.data
}

const blogService = {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove,
    addComment: addComment,
}

export default blogService