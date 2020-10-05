import React, { useState, useContext, useRef } from 'react'
import UserContext from '../../context/UserContext'
import useNewUser from '../../hooks/useNewUser'

export default function FormRegister() {

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { user } = useContext(UserContext)

  const { error, loading, createNewUser } = useNewUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createNewUser({ payload: {
      email, username, password
    }})
  }

  const formStyles = {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start'
  }

  return <>
    { loading && 'Loading...'}
    { user && <pre> {JSON.stringify(user, null, 2)} </pre> }
    <form
      onSubmit={handleSubmit}
      style={formStyles}
    >
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
        style={{color: error.field === 'email' ? 'red' : 'black'}}
      />
      { error.field === 'email' && error.message }
      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        style={{color: error.field === 'username' ? 'red' : 'black'}}
      />
      { error.field === 'username' && error.message }
      <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button>
        Register Now
      </button>
    </form>
  </>
}
