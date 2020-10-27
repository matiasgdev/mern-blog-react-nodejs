import {createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  userLoginReducer,
  userRegisterReducer 
} from './reducers/userReducers'

import {
  getPostsReducer,
  createPostReducer,
  detailPostReducer,
  updateLikesPostReducer,
  createCommentPostReducer,
  deletePostReducer,
  updatePostReducer
} from './reducers/postReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  posts: getPostsReducer,
  postCreate: createPostReducer,
  postDetail: detailPostReducer,
  postUpdateLikes: updateLikesPostReducer,
  postCreateComment: createCommentPostReducer,
  postDelete: deletePostReducer,
  postUpdate: updatePostReducer,
})

const userInfoFromCache = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromCache },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

