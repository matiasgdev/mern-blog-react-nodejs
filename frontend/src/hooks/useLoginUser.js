import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGIN_RESET, USER_REGISTER_RESET } from '../types/userTypes'
import { login } from '../actions/userActions'
import { useLocation } from 'wouter'

export const useLoginUser = () => {
  const dispatch = useDispatch()
  const { 
    loading, 
    error, 
    userInfo 
  } = useSelector(state => state.userLogin)
  const [, navigate] = useLocation()


  useEffect(function() {
    if (userInfo) {
      navigate('/')
    }
    return () => {
      if (error) {
        dispatch({ type: USER_LOGIN_RESET })
        dispatch({ type: USER_REGISTER_RESET })
      }
    }
  }, [userInfo, navigate, error, dispatch])

  const requestLogin = ({email, password}) => {
    dispatch(login({email, password}))
  }

  return { loading, error, userInfo, requestLogin }
}