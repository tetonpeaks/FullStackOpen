import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const update = (id, numObject) => {
    const req = axios.put(`${baseUrl}/${id}`, numObject)
    return req.then(res => res.data)
}

const personService = {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}

export default personService