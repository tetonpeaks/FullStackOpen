import React from "react"
import "../styles/Numbers.css"


export default function Numbers({person, deletePerson}) {
    return <li className='person'>{person.name}: {person.num} <button onClick={() => deletePerson(person.id, person.name)}>Delete</button></li>
}