import React from 'react'

export default function Post({title, description, content, imagePath}) {
  return (
    <div>
      <img width="200" src={imagePath} />
      <h2>{title}</h2>
      <small>{description}</small>
      <p>{content}</p>
    </div>
  )
}
