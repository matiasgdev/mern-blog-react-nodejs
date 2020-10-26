import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPost } from '../../actions/postsActions'
import Loader from '../Loader'
import { useLocation } from 'wouter'

export default function FormPost() {

  const dispatch = useDispatch()

  const formRef = useRef()
  const newPostInfo = useSelector(state => state.postCreate)
  const { error, loading, postInfo } = newPostInfo

  const [ _, pushLocation ] = useLocation()

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    dispatch(createPost({data}))
  }

  useEffect(() => {
    if (postInfo) {
      pushLocation(`/comunidad`) // push to community for now
    }
  }, [postInfo, pushLocation])

  return (
    <>
      { loading && <Loader />}
      { error && error }
      <form
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input 
          type="text"
          placeholder="Title"
          name="title"
        />
        <input 
          type="text"
          placeholder="Description"
          name="description"
        />
        <input 
          type="text"
          placeholder="Content"
          name="content"
        />
        <input 
          type="file"
          name="post_image"
        />
        <button
          disabled={loading}
          type="submit"
        >
          Crear post
        </button>
      </form>
    </>
  )
}
