import React, { useReducer } from 'react'
import { SET_TOKEN, GET_TOKEN, GET_USER_ID } from '../types/userTypes'
const Context = React.createContext({})

function reduce(user, action) {
  switch(action.type) {
    case SET_TOKEN:
      window.localStorage.setItem('TOKEN', action.payload.token )
      return {...user, token: action.payload.token }
    case GET_TOKEN:
      return { token: window.localStorage.getItem('TOKEN') }
    default:
      return user
  }
}

export function UserProvider({ children }) {

  const [user, dispatch] = useReducer(reduce, { user: {} })

  return (
    <Context.Provider value={{ user, dispatch }}>
      { children }
    </Context.Provider>
  )

}

export default Context