import { useField } from "../hooks/index"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../reducers/loginReducer"
import Notification from "./Notification"

import { Form, Button } from "react-bootstrap"

const LoginForm = () => {
    const { reset: resetUsername, ...username } = useField("text")
    const { reset: resetPassword, ...pw } = useField("pw")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const credentials = { username: username.value, pw: pw.value }

        dispatch(loginUser(credentials))
        resetUsername()
        resetPassword()
        navigate("/")
    }

    return (
        <div>
            <div className='div-notify'><Notification /></div>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control {...username} type="text" name="username" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...pw} type="password" />
                    <Button variant="primary" type='submit'>Login</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm