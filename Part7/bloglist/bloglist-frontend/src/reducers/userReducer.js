import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

const { setUser } = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
        const user = await userService.getAll()
        dispatch(setUser(user))
    }
}

export default userSlice.reducer