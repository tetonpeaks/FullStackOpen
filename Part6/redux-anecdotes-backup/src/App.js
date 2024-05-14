import React from "react"

import AnecdoteList from "./components/AnecdoteList"
import AnecdoteFrom from "./components/AnecdoteForm"

const App = () => {

  return (
    <div>
      <AnecdoteList />
      <AnecdoteFrom />
    </div>
  )
}

export default App