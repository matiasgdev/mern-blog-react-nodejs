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
  POST_DETAIL_CLEAR,
  POST_UPDATE_LIKES_ERROR,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_REQUEST,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_ERROR,
  POST_DELETE_COMMENT_REQUEST,
  POST_DELETE_COMMENT_SUCCESS,
  POST_DELETE_COMMENT_ERROR
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
        e.response.data.message :
        e.message
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
      payload: e.response && e.response.data.message ?
        e.response.data.message :
        e.message
    })
  }
}

export const detail = (slug) => async (dispatch) => {
  try {
    dispatch({type: POST_DETAIL_REQUEST })
    const { data } = await axios.get(`${BASE_URL}/${slug}`)
    dispatch({type: POST_DETAIL_SUCCESS, payload: data })

  } catch(e) {
    dispatch({ 
      type: POST_DETAIL_ERROR,
      payload: e.response && e.response.data.message ?
        e.response.data.message :
        e.message
    })
  }
}

export const clearDetails = () => (dispatch) => {
  dispatch({type: POST_DETAIL_CLEAR })
}

export const updateLikes = ({id, slug}) => async (dispatch, getState) => {

  try {

    dispatch({type: POST_UPDATE_LIKES_REQUEST })
    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`${BASE_URL}/like/${id}`, null, config)

    dispatch({type: POST_UPDATE_LIKES_SUCCESS, payload: data.num })

    const { data: dataPost } = await axios.get(`${BASE_URL}/${slug}`)
    dispatch({type: POST_DETAIL_SUCCESS, payload: dataPost })

  } catch(e) {
    dispatch({ type: POST_UPDATE_LIKES_ERROR,
      payload: e.response && e.response.data.message ? 
        e.response.data.message : 
        e.message
    })
  }
}

export const createComment = ({id, comment, slug}) => async (dispatch, getState) => {
  try {
    dispatch({type: POST_CREATE_COMMENT_REQUEST})
    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    }

    await axios.put(
      `${BASE_URL}/comment/${id}`,
      {comment},
      config
    )
    dispatch({type: POST_CREATE_COMMENT_SUCCESS})

    const { data: dataPost } = await axios.get(`${BASE_URL}/${slug}`)
    dispatch({type: POST_DETAIL_SUCCESS, payload: dataPost })

  }catch(e) {
    dispatch({ type: POST_CREATE_COMMENT_ERROR,
      payload: e.response && e.response.data.message ? 
        e.response.data.message : 
        e.message
    })
  }
}

export const deleteComment = ({postId, commentId, slug}) => async (dispatch, getState) => {
  
  try {
    const { userLogin: { userInfo } } = getState()
    dispatch({type: POST_DELETE_COMMENT_REQUEST})

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo ? userInfo.token : null}`
      }
    }

    await axios.delete(
      `${BASE_URL}/comment/${postId}/${commentId}`,
      config
    )

    dispatch({type: POST_DELETE_COMMENT_SUCCESS})

    const { data: dataPost } = await axios.get(`${BASE_URL}/${slug}`)
    dispatch({type: POST_DETAIL_SUCCESS, payload: dataPost })

  }catch(e) {
    dispatch({ type: POST_DELETE_COMMENT_ERROR,
      payload: e.response && e.response.data.message ? 
        e.response.data.message : 
        e.message
    })
  }
}

