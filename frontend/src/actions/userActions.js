import axios from 'axios'

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL
} from '../types/userTypes'

const API_LOGIN = 'https://blog-mern-stack-matiasgdev.herokuapp.com/api/auth/login'
const API_SIGNIN = 'https://blog-mern-stack-matiasgdev.herokuapp.com/api/auth/login'

const config = {
  headers: {
    'Content-Type': 'application/json'
  },
}

export const login = ({email, password}) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    
    const { data } = await axios.post(
      API_LOGIN,
      { email, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data })
    localStorage.setItem('userInfo', JSON.stringify(data.data))
    
  } catch(err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message  })
  }
} 

export const signin = ({email, password, username}) => async (dispatch) => {
  try {
    dispatch({type: USER_REGISTER_REQUEST})

    const { data } = await axios.post(
      API_SIGNIN,
      { username, email, password },
      config
    )

    dispatch({ type: USER_REGISTER_SUCCESS })
    
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data.data))
  } catch(err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data.message })
  }

}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}