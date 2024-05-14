import React from "react"

export default function Notify({ message }) {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>{message}</div>
    )
}