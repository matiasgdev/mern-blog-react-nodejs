import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clear } from '../../actions/userActions'
import { useLocation } from 'wouter'

function FormLogin() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [_, pushLocation] = useLocation()

  useEffect(function() {
    if (userInfo) {
      pushLocation('/')
    }
    return () => {
      if (error) {
        dispatch(clear())
      }
    }
  }, [userInfo, pushLocation, error])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return <>
    { loading && 'Loading...'}
    { error && <> {error} </>}
    { userInfo && <pre> { JSON.stringify(userInfo, null, 2)} </pre>}
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        autoComplete="new-password"
      />
      <button>
        Login
      </button>
    </form>
  </>
}

export default FormLogin
