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
  POST_DETAIL_CLEAR,
  POST_UPDATE_LIKES_ERROR,
  POST_UPDATE_LIKES_SUCCESS,
  POST_UPDATE_LIKES_REQUEST,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_ERROR,
  POST_DELETE_COMMENT_REQUEST,
  POST_DELETE_COMMENT_SUCCESS,
  POST_DELETE_COMMENT_ERROR,
  POST_DELETE_COMMENT_CLEAR,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_ERROR,
  POST_UPDATE_CLEAR,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_ERROR,
  POST_DELETE_CLEAR,
  
} from '../types/postTypes'

export const getPostsReducer = (state = { data: [] }, action) => {

  switch(action.type) {
    case POSTS_GET_REQUEST:
      return { ...state, loading: true }
    case POSTS_GET_SUCCESS:
      return {  loading: false, data: action.payload }
    case POSTS_GET_ERROR:
      return { loading: false, error: action.payload }
    default: return state
  }
}

export const getPopularPostsReducer = (state = { popular: [] }, action) => {

  switch(action.type) {
    case POSTS_GET_POPULAR_REQUEST:
      return { ...state, loading: true }
    case POSTS_GET_POPULAR_SUCCESS:
      return {  loading: false, popular: action.payload }
    case POSTS_GET_POPULAR_ERROR:
      return { loading: false, error: action.payload }
    default: return state
  }
}

export const createPostReducer = (state = {}, action) => {
  switch(action.type) {
    case NEW_POST_REQUEST:
      return { loading: true }
    case NEW_POST_SUCCESS:
      return { loading: false, postInfo: action.payload }
    case NEW_POST_ERROR:
      return { loading: false, error: action.payload }
    case NEW_POST_CLEAR:
      return { }
    default: return state
  }
}

export const detailPostReducer = (state = {}, action) => {
  switch(action.type) {
    case POST_DETAIL_REQUEST:
      return { loading: true }
    case POST_DETAIL_SUCCESS:
      return { loading: false, post: action.payload }
    case POST_DETAIL_ERROR:
      return { loading: false, error: action.payload }
    case POST_DETAIL_CLEAR:
      return { }
    default: return state
  }
}

export const updateLikesPostReducer = (state ={}, action) => {
  switch(action.type) {
    case POST_UPDATE_LIKES_REQUEST:
      return { loading: true }
    case POST_UPDATE_LIKES_SUCCESS:
      return { loading: false, likes: action.payload }
    case POST_UPDATE_LIKES_ERROR:
      return { loading: false, error: action.payload }
    default: return state
  }
}

export const createCommentPostReducer = (state = {}, action) => {
  switch(action.type) {
    case POST_CREATE_COMMENT_REQUEST:
      return { loading: true }
    case POST_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true }
    case POST_CREATE_COMMENT_ERROR:
      return { loading: false, error: action.payload }
    default: return state
  }
}

export const deleteCommentPostReducer = (state = {}, action) => {
  switch(action.type) {
    case POST_DELETE_COMMENT_REQUEST:
      return { loading: true }
    case POST_DELETE_COMMENT_SUCCESS:
      return { loading: false, success: true }
    case POST_DELETE_COMMENT_ERROR:
      return { loading: false, error: action.payload }
    case POST_DELETE_COMMENT_CLEAR:
      return { }
    default: return state
  }
}

export const updatePostReducer = (state = {}, action) => {
  switch(action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true }
    case POST_UPDATE_SUCCESS:
      return { loading: false, postUpdated: action.payload }
    case POST_UPDATE_ERROR:
      return { loading: false, error: action.payload }
    case POST_UPDATE_CLEAR: 
      return {}
    default: return state
  }
}

export const deletePostReducer = (state ={}, action) => {
  switch(action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true }
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true}
    case POST_DELETE_ERROR: 
      return { loading: false, error: action.payload }
    case POST_DELETE_CLEAR: 
      return { }
  
    default: return state
  }
}

