import React from 'react'
import {ErrorContainer} from './elements'

export default function Error({message}) {
  return (
    <ErrorContainer>
      {message}
    </ErrorContainer>
  )
}
