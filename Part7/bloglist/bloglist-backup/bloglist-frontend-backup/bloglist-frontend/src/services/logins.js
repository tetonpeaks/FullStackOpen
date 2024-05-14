import axios from "axios"
const baseUrl = "/api/login"

const login = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

const loginService = {
    login: login,
}
export default loginService