import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import fetchNewUser from '../services/fetchNewUser'
import {SET_TOKEN} from '../types/userTypes'

export default function useNewPost() {

  const [ loading, setLoading ] = useState()
  const [ error, setError ] = useState({})
  const { dispatch } = useContext(UserContext)

  const createNewUser = ({payload } = {}) => {
    setLoading(true)
    return fetchNewUser({payload})
      .then(data => {
        if (data.error) {
          setError(data)
          setLoading(false)
          return
        } else {
          dispatch({type: SET_TOKEN, payload: data})
        }
        setLoading(false)
        return data
      })
  }
  return { loading, error, createNewUser }
  
}
