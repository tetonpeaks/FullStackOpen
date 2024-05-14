import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import anecdoteReducer from './reducers/anecdoteReducer'
import store from "./store"

//const store = createStore(anecdoteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
