import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_DETAIL_CLEAR } from '../types/postTypes'
import { detail } from '../actions/postsActions'

export const usePostDetail = ({slug}) => {
  const dispatch = useDispatch()
  const { error, loading, post } = useSelector(state => state.postDetail)

  useEffect(() => {
    dispatch(detail(slug)) 

    return () => {
      dispatch({type: POST_DETAIL_CLEAR })
    }

  }, [detail, slug, dispatch])

  return { error, loading, post }

}