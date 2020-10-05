
import { useState, useEffect } from 'react'

export default function useFetchPost({ id } = {}) {
  
  let API_URL = `http://localhost:4000/api/post/`

  const [ posts, setPosts ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  useEffect(function() {
    setLoading(true)
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data.posts)) {
          setPosts(data.posts.reverse())
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })

    return () => null
  }, [])


  return { posts, loading, error }

}