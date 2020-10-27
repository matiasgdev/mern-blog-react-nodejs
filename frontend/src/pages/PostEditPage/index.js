import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePost, detail } from '../../actions/postsActions'
import { POST_UPDATE_CLEAR } from '../../types/postTypes'
import { useLocation } from 'wouter'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import {
  PostEditContainer,
  Form,
  FormGroup,
  Input,
  Button,
  Title,
  FormContainer,
  Label
} from './elements'

export default function PostEditPage({params}) {
  const dispatch = useDispatch()
  const [, pushLocation] = useLocation()
  
  const { userInfo } = useSelector(state => state.userLogin)
  const { error: errorUpdate = '', loading: loadingUpdate, postUpdated } = useSelector(state => state.postUpdate)
  const { error: errorDetail = '', loading: loadingDetail, post } = useSelector(state => state.postDetail)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: ''
  })
  
  // fetching data
  useEffect(function() {
    dispatch(detail(params.slug)) 
  }, [detail, params, dispatch])

  // fill form
  useEffect(function() {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        description: post.description
      })
    }
    return () => { 
      if(post) dispatch({type: POST_UPDATE_CLEAR}) 
    }

  }, post, setFormData, postUpdated, dispatch)


  useEffect(function() {
    // redirect if not logged
    if (!userInfo) {
      pushLocation('/iniciar-sesion')
    }
    // redirect when success the submit or do not have permisson
    if (postUpdated) {
      pushLocation(`/publicacion/${postUpdated.slug}`)
    }

  }, [userInfo, pushLocation, postUpdated, post])

  const handleChange = e => { 
    const input = e.target
    setFormData(prevFormData => {
      return {...prevFormData, [input.name]: input.value}
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updatePost({newData: formData, id: post._id}))
  }

  if (!userInfo) return null

  return (
    <PostEditContainer>
      {loadingDetail ? <Loader /> : 
        errorDetail ? <Error message={errorDetail} /> : 
        post 
        ? (
          <>
            <Title>
              Editar post - {post.title}
            </Title>
            <FormContainer>
              {errorUpdate && <Error message={errorUpdate} />}
              <Form
                onSubmit={handleSubmit}
              >
                <FormGroup>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">Descripción</Label>
                  <Input 
                    type="text" 
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="content">Contenido</Label>
                  <Input
                    as="textarea"
                    type="text"
                    name="content"
                    id="content"
                    value={formData.content}
                    onChange={handleChange}
                    textarea/>
                </FormGroup>
                <FormGroup>
                  <Button type="submit" disabled={loadingUpdate}>
                    {loadingUpdate ? 'Enviando...' : 'Confirmar'}
                  </Button>
                </FormGroup>
              </Form>
            </FormContainer>
          </>
        ) : null
      }
    </PostEditContainer>
  )
}
