import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import {deleteComment} from '../../actions/postsActions'
import { POST_DELETE_COMMENT_CLEAR } from '../../types/postTypes'

import {
  ModalContainer,
  ModalWrapper,
  ModalTitle,
  ModalDetails,
  Button,
  CloseButton
} from './elements'

const Modal = ({ open, handleModal, postId, commentId, slug }) => {
  const dispatch = useDispatch()
  const {loading, error, success} = useSelector(state => state.postDelete)

  const handleDeleteComment = () => {
    dispatch(deleteComment({postId, commentId, slug}))
  }
  
  useEffect(() => {
    return () => {
      dispatch({type: POST_DELETE_COMMENT_CLEAR })
    }
  }, [])
  

  if (!open) return null


  return createPortal(
    <ModalContainer>
      <ModalWrapper open={open}>
        {error ? error : (
          <>
            <ModalTitle>¿Estás seguro de borrar este comentario?</ModalTitle>
            {success && 'Se borro exitosamente'}
            {loading ? null : (
              <ModalDetails>
                <Button confirm onClick={handleDeleteComment}>Seguro</Button>
                <Button cancel onClick={handleModal}>Cancelar</Button>
              </ModalDetails>
            )}
          </>
        )}
        <CloseButton onClick={handleModal}/>
      </ModalWrapper>
    </ModalContainer>,
    document.getElementById('modal')
  )
}

export default Modal
