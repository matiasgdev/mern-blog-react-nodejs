import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_ERROR,
  POSTS_GET_POPULAR_REQUEST,
  POSTS_GET_POPULAR_SUCCESS,
  POSTS_GET_POPULAR_ERROR,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  NEW_POST_CLEAR,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
  POST_DETAIL_ERROR,  
  POST_UPDATE_LIKES_ERROR,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_REQUEST,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_ERROR,
  POST_DELETE_COMMENT_REQUEST,
  POST_DELETE_COMMENT_SUCCESS,
  POST_DELETE_COMMENT_ERROR,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_ERROR,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_ERROR,
} from '../types/postTypes'
import axios from 'axios'

const BASE_URL = `http://localhost:4000/api/post`

const config = (user = null) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": user ? 
        `Bearer ${user ? user.token : null}` : 
        user
    }
  }
}

export const getPosts = ({ page }) => async (dispatch) => {
  dispatch({ type: POSTS_GET_REQUEST })
  try {
    const { data } = await axios.get(`${BASE_URL}?page=${page}`)

    setTimeout(() => {
      dispatch({ type: POSTS_GET_SUCCESS, payload: data })
    }, 500)

  } catch(e) {  
    dispatch({
      type: POSTS_GET_ERROR,
      payload: e.response && e.response.data.message ?
        e.response.data.message :
        e.message
    })
  }

}

export const getPopularPosts = () => async dispatch => {
  try {
    dispatch({type: POSTS_GET_POPULAR_REQUEST})

    const { data } = await axios.get(`${BASE_URL}/popular`)
    setTimeout(() => {
      dispatch({type: POSTS_GET_POPULAR_SUCCESS, payload: data})
    }, 500)

  }catch(e) {
    dispatch({
      type: POSTS_GET_POPULAR_ERROR,
      payload: e.response.data.message && e.response ?
        e.response.data.message :
        e.message
    })
  }
}

export const createPost = ({ data }) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_POST_REQUEST })
    const { userLogin: { userInfo } } = getState()
    
    const res = await axios.post(BASE_URL, data, config(userInfo))

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

export const updateLikes = ({id, slug}) => async (dispatch, getState) => {

  try {

    dispatch({type: POST_UPDATE_LIKES_REQUEST })
    const { userLogin: { userInfo } } = getState()

    const { data } = await axios.put(
      `${BASE_URL}/like/${id}`,
      null,
      config(userInfo)
    )

    setTimeout(() => {
      dispatch({type: POST_UPDATE_LIKES_SUCCESS, payload: data.num })
    }, 500)

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

    await axios.put(
      `${BASE_URL}/comment/${id}`,
      {comment},
      config(userInfo)
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

    await axios.delete(
      `${BASE_URL}/comment/${postId}/${commentId}`,
      config(userInfo)
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


export const updatePost = ({ newData, id }) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo }} = getState()
    dispatch({type: POST_UPDATE_REQUEST})


    const { data } = await axios.put(
      `${BASE_URL}/${id}`,
      newData,
      config(userInfo)
    )

    dispatch({type: POST_UPDATE_SUCCESS, payload: data})

  } catch (e) {
    dispatch({
      type: POST_UPDATE_ERROR,
      payload: e.response && e.response.data.message ?
        e.response.data.message :
        e.message
    })
  }
}


export const deletePost = ({postId}) => async (dispatch, getState) => {
  try {
    dispatch({type: POST_DELETE_REQUEST})

    const { userLogin: { userInfo }} = getState()

    await axios.delete(`${BASE_URL}/${postId}`, config(userInfo))
    dispatch({type: POST_DELETE_SUCCESS})

  } catch(e) {
    dispatch({
      type: POST_DELETE_ERROR,
      payload: e.response && e.response.data.message ?
        e.response.data.message :
        e.message
    })
  }
}
