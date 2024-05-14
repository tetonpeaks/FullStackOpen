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
                notification: null,
            }
        }
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions

let timeoutId = null

export const notify = (notification) => {
    return (dispatch) => {
        resetNotification(timeoutId)
        dispatch(setNotification(notification))
        timeoutId = setTimeout(() => {
            dispatch(setNotification(null))}, 5000)
    }
}

export default notificationSlice.reducer