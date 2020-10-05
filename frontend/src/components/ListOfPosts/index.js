import React from 'react'
import Post from '../Post'

export default function ListOfPosts({ posts, loading }) {

  if (loading) return

  return (
    posts.map(post => {
      return <Post key={post._id} {...post} />
    })
  )
}
