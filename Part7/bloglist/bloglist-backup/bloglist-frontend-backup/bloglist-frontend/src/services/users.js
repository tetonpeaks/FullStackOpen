import axios from "axios"
const baseUrl = "/api/users"

let token = null

const setUser = (user) => {
    window.localStorage.setItem("validUser", JSON.stringify(user)) // saving to local storage
    token = user.token
}

const getUser = () => {
    const validUserJSON = window.localStorage.getItem("validUser") // Obtain information from local storage
    if (validUserJSON) {
        const user = JSON.parse(validUserJSON)
        token = user.token
        return user
    }
    return null
}

const logout = () => {
    localStorage.clear()
    token = null
}

const getToken = () => token

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export default {
    setUser,
    getUser,
    logout,
    getToken,
    getAll,
}