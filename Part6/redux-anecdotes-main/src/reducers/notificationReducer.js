import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            console.log("action: ", action)
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions

export const notify = (msg) => {
    setNotification(msg)
}

export default notificationSlice.reducer