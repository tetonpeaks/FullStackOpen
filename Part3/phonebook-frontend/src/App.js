import { useState, useEffect, React } from "react"
import Form from "./components/Form"
import Numbers from "./components/Numbers"
import Filter from "./components/Filter"
import Notify from "./components/Notify"
import personService from "./services/persons"

function App() {

    const [persons, setPersons] = useState([])
    const [newPerson, setnewPerson] = useState("")
    const [newNum, setnewNum] = useState("")
    const [newFilter, setFilter] = useState("")
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(res => {
                setPersons(res)
            })
    }, [])

    const addnewPerson = (e) => {
        e.preventDefault() // Prevents default action (page reload) of submitting form

        const exists = persons.some(person => person.name === newPerson)
        const currentPerson = persons.find(person => person.name === newPerson)

        if (exists) {
            const numObject = {
                name: newPerson,
                num: newNum,
                id: currentPerson.id
            }
            window.confirm(`${numObject.name} is already in the phonebook, confirm replace?`)
            personService
                .update(numObject.id, numObject)
                .then(res => {
                    const updatedPersons = persons.map(person => person.id !== res.id ? person : res)
                    setPersons(updatedPersons)
                    setMessage(`Phone record for ${numObject.name} has been successfully updated`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
        else
        {
            const numObject = {
                name: newPerson,
                num: newNum,
            }
            personService
                .create(numObject)
                .then(res => {
                    setPersons(persons.concat(res))
                    setnewPerson("")
                    setMessage(`Phone record for ${numObject.name} has been successfully added`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Confirm deletion of ${name}`)) {
            personService
                .remove(id)
                .then(() => {
                    const updatedPersons = persons.filter(p => p.id !== id)
                    setPersons(updatedPersons)
                    setMessage(`${name} has been removed from the phonebook`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const handleChangeName = (e) => {
        setnewPerson(e.target.value)
    }

    const handleChangeNum = (e) => {
        setnewNum(e.target.value)
    }

    const handleChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    let filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleChangeFilter} filter={newFilter} />
            <h2>Add a New Phone Number</h2>
            <Form onSubmit={addnewPerson}
                newName={newPerson}
                onChangeName={handleChangeName}
                newNum={newNum}
                onChangeNum={handleChangeNum}/>
            <h2>Numbers</h2>
            <Notify message={message} />
            <ul>
                {filteredPersons.map(person =>
                    <Numbers key={person.name} person={person} deletePerson={deletePerson} />
                )}
            </ul>
        </div>
    )
}

export default App
