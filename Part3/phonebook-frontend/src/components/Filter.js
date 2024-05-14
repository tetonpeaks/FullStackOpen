import React from "react"

export default function Filter({onChange, newFilter}) {
    return (
        <div>Search: <input defaultValue={newFilter} onChange={onChange} /></div>
    )
}