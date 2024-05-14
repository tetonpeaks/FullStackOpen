import React from "react"

export default function Form({onSubmit, newName, onChangeName, newNum, onChangeNum}) {
    return (
        <form onSubmit={onSubmit}>
            <div>Name: <input defaultValue={newName} onChange={onChangeName} /></div>
            <div>Number: <input defaultValue={newNum} onChange={onChangeNum} /></div>
            <div><button type='submit'>Add</button></div>
        </form>
    )
}