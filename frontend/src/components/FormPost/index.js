import React, { useState, useEffect, useRef } from 'react'
import Loader from '../Loader'
import fetchNewPost from '../../services/fetchNewPost'
import { useLocation } from 'wouter'

export default function FormPost() {

  const formRef = useRef(null)
  // const [ title, setTitle ] = useState('')
  // const [ description, setDescription ] = useState('')
  // const [ content, setContent ] = useState('')
  // const [ image, setImage ] = useState(null)
  const [ error, setError ] = useState({})
  const [ loading, setLoading ] = useState(false)
  const [ idTimeout, setIdTimeout ] = useState(null)
  const [ location, setLocation ] = useLocation()

  useEffect(function() {  
    return () => {
      if (idTimeout) clearInterval(idTimeout)
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(formRef.current)

    try {
      if (idTimeout) clearInterval(idTimeout)
      
      const res = await fetchNewPost({ payload: data })
      setLoading(false)
      if (res.error) {
        setError(res)
        const id = setTimeout(() => setError({}), 1500)
        setIdTimeout(id)
        return
      }
      setLocation('/posts')
    } catch(e) {
      setLocation('/404')
    }
  }

  const formStyles = {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start'
  }

  return (
    <>
      { loading && <Loader />}
      <form
        style={formStyles}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input 
          type="text"
          placeholder="Title"
          name="title"
        />
        { error.field === 'title' && <span> {error.message} </span> }
        <input 
          type="text"
          placeholder="Description"
          name="description"
        />
        { error.field === 'description' && <span> {error.message} </span> }
        <input 
          type="text"
          placeholder="Content"
          name="content"
        />
        { error.field === 'content' && <span> {error.message} </span> }
        <input 
          type="file"
          name="post_image"
        />
        { error.field === 'imagePath' && <span> {error.message} </span> }
        <button>Crear post</button>
      </form>
    </>
  )
}
