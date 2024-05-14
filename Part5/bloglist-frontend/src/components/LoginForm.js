import { useState } from "react"
import PropTypes from "prop-types"

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState("")
    const [pw, setPassword] = useState("")

    const createValidLogin = (e) => {
        e.preventDefault()
        handleLogin(username, pw)

        setUsername("")
        setPassword("")
    }

    return (
        <form onSubmit={createValidLogin}>
            <div>
                Username
                <input
                    className='username'
                    type='text'
                    name='Username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                Password
                <input
                    className='password'
                    type='text'
                    name='Password'
                    value={pw}
                    onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button className='btn-login' type='submit'>Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
}

export default LoginForm