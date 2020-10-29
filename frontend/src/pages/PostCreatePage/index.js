import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPost } from '../../actions/postsActions'
import { useLocation } from 'wouter'
import { useIsAuth } from '../../hooks/useIsAuth'
import Error from '../../components/Error'

import {
  PostCreateContainer,
  Form,
  FormGroup,
  Input,
  Button,
  Title,
  FormContainer,
  Label
} from './elements'

export default function PostCreatePage() {
  const formRef = useRef()
  
  const dispatch = useDispatch()
  const [, pushLocation] = useLocation()
  
  const { userInfo } = useIsAuth()
  
  const { error: errorCreate = '', loading: loadingCreate, postInfo} = useSelector(state => state.postCreate)

  useEffect(function() {
    // redirect when success the submit
    if (postInfo) {
      pushLocation(`/publicacion/${postInfo.slug}`)
    }

  }, [pushLocation, postInfo])

  const handleSubmit = e => {
    e.preventDefault()

    const data = new FormData(formRef.current)
    dispatch(createPost({data}))
  }

  if (!userInfo) return null

  return (
    <PostCreateContainer>
      <Title>
        Nueva publicación
      </Title>
      <FormContainer>
        {errorCreate && <Error message={errorCreate} />}
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label htmlFor="title">Título</Label>
            <Input type="text" name="title" id="title" error={errorCreate.includes('título')}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Descripción</Label>
            <Input 
              type="text" 
              name="description"
              id="description"
              error={errorCreate.includes('descripción')}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">Contenido</Label>
            <Input
              as="textarea"
              type="text"
              name="content"
              id="content"
              error={errorCreate.includes('contenido')}
              textarea/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="postImage">Imagen principal</Label>
            <Input
              type="file"
              name="post_image"
              id="postImage"
              error={errorCreate.includes('imagen')}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" disabled={loadingCreate}>
              Crear publicación
            </Button>
          </FormGroup>
        </Form>
      </FormContainer>
    </PostCreateContainer>
  )
}
