import React from 'react'

export default function Error({error}) {
  return (
    <p>
      {error.message}
    </p>
  )
}
