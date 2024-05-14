import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/logins"
import userService from "../services/users"
import { notify } from "./notificationReducer"
//import loginService from "../services/logins"


const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return action.payload
        }
    }
})

export const { login, logout } = loginSlice.actions

export const loginUser = credentials => {
    return async (dispatch) => {
        try {

            const { username, pw } = credentials

            const user = await loginService.login({ username, pw })

            userService.setUser(user)
            dispatch(login(user))
            dispatch(notify(`${user.name} has logged in!`))
        } catch (error) {
            dispatch(notify("Wrong credentials!"))
        }

        //userService.setUser(user)
        //dispatch(setUser(user))
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        userService.logout()
        dispatch(logout(null))
    }
}

export default loginSlice.reducer