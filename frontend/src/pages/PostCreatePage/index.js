import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'wouter'
import FormPost from '../../components/FormPost'

export default function NewPost() {

  const [, pushLocation] = useLocation()

  const { userInfo } = useSelector(state => state.userLogin) 

  useEffect(function() {
    if (!userInfo) {
      pushLocation('/iniciar-sesion')
    }
  }, [userInfo, pushLocation])

  if (!userInfo) return null

  return (
    <>
      <h1>
        Crear una nueva publicación
      </h1>
      <FormPost />
    </>
  )
} 
