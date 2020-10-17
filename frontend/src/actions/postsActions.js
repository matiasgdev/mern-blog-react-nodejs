import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_ERROR,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  NEW_POST_CLEAR,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
  POST_DETAIL_ERROR,  
  POST_DETAIL_CLEAR
} from '../types/postTypes'
import axios from 'axios'

const BASE_URL = `http://localhost:4000/api/post/`

export const getPosts = ({ page }) => async (dispatch) => {
  dispatch({ type: POSTS_GET_REQUEST })
  try {
    const { data } = await axios.get(`${BASE_URL}?page=${page}`)
    dispatch({ type: POSTS_GET_SUCCESS, payload: data })

  } catch(e) {  
    dispatch({
      type: POSTS_GET_ERROR,
      payload: e.response && e.response.data.message ?
        e.response.data.message : e.message
    })
  }

}

export const createPost = ({ data }) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_POST_REQUEST })
    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
    const res = await axios.post(BASE_URL, data, config)

    dispatch({type: NEW_POST_SUCCESS, payload: res.data })
    dispatch({type: NEW_POST_CLEAR })

  } catch (e) {
    dispatch({ 
      type: NEW_POST_ERROR,
      payload: e.response.data.message
    })
  }
}

export const detail = (slug) => async (dispatch) => {
  try {
    dispatch({type: POST_DETAIL_REQUEST })
    const { data } = await axios.get(`${BASE_URL}/${slug}`)
    dispatch({type: POST_DETAIL_SUCCESS, payload: data })

  } catch(e) {
    console.log(e)
    dispatch({ type: POST_DETAIL_ERROR, payload: e.response.data.message })
  }
}

export const clearDetails = () => (dispatch) => {
  dispatch({type: POST_DETAIL_CLEAR })
}