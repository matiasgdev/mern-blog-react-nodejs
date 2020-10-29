import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePost } from '../../actions/postsActions'
import { POST_UPDATE_CLEAR } from '../../types/postTypes'
import { useLocation } from 'wouter'
import { deletePost } from '../../actions/postsActions'

import useModal from '../../hooks/useModal'
import { useIsAuth } from '../../hooks/useIsAuth'
import { usePostDetail } from '../../hooks/usePostDetail'

import Modal from '../../components/Modal'
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
  Label,
  DeleteIcon
} from './elements'

export default function PostEditPage({params}) {
  const dispatch = useDispatch()
  const [, pushLocation] = useLocation()
  
  const { userInfo } = useIsAuth()
  const {
    error: errorDetail,
    loading: loadingDetail,
    post
  } = usePostDetail({slug: params.slug})

  const{ openModal, handleOpenModal } = useModal()
  
  const { error: errorUpdate = '', loading: loadingUpdate, postUpdated } = useSelector(state => state.postUpdate)

  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete
  } = useSelector(state => state.postDelete)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: ''
  })


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
    // redirect when success the submit or do not have permisson
    if (postUpdated) {
      pushLocation(`/publicacion/${postUpdated.slug}`)
    }
    // redirect after 500ms when post was deleted
    if(successDelete) {
      setTimeout(() => pushLocation('/comunidad'), 500)
    }

  }, [userInfo, pushLocation, postUpdated, successDelete, post])

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

  const handleDeletePost = () => {
    dispatch(deletePost({postId: post._id}))
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
              Editar - {post.title}
              <DeleteIcon onClick={handleOpenModal}/>
              {openModal &&
                <Modal 
                  open={openModal}
                  handleOpenModal={handleOpenModal}
                  loading={loadingDelete}
                  error={errorDelete}
                  success={successDelete}
                  action={handleDeletePost}
                  message='¿Estás seguro de borrar esta publicación?'
                />
              }
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
