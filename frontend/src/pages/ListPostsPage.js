import React from 'react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import {useLocation} from 'wouter'
import useFetchPosts from '../hooks/useFetchPosts'
import ListOfPosts from '../components/ListOfPosts'

export default function ListPostsPage() {

  const { posts, loading, error } = useFetchPosts()
  const [ location, setLocation ] = useLocation()

  if (error && !loading) setLocation('/404')
  
  return <>
    { loading
      ? <Loader /> 
      : <ListOfPosts posts={posts} loading={loading}/>
    }
  </>
}
