import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            //console.log("action: ", action)
            return action.payload
        },
        resetNotification(state, action) {
            return {
                msg: null,
            }
        }
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions

let timeoutId = null

export const notify = (msg) => {
    return (dispatch) => {
        resetNotification(timeoutId)
        dispatch(setNotification(msg))
        timeoutId = setTimeout(() => {
            dispatch(setNotification(null))}, 5000)
    }
}

export default notificationSlice.reducer