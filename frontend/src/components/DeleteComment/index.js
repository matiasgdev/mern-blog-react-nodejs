import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useModal from '../../hooks/useModal'
import { deleteComment } from '../../actions/postsActions'
import { POST_DELETE_COMMENT_CLEAR } from '../../types/postTypes'
import Modal from '../Modal'
import { DeleteIcon, DeleteCommentContainer } from './elements'


const DeleteComment = ({commentId, postId, slug}) => {
  const dispatch = useDispatch()
  const {loading, error, success} = useSelector(state => state.postDeleteComment)

  const handleDeleteComment = () => {
    dispatch(deleteComment({postId, commentId, slug}))
  }
  
  useEffect(() => {
    return () => {
      dispatch({type: POST_DELETE_COMMENT_CLEAR })
    }
  }, [])

  const { openModal, handleOpenModal } = useModal()

  return (
    <DeleteCommentContainer>
      <DeleteIcon onClick={handleOpenModal}/>
      {openModal && (
        <Modal 
          open={openModal}
          handleOpenModal={handleOpenModal}
          action={handleDeleteComment}
          loading={loading}
          error={error}
          success={success}
          message='¿Estás seguro de borrar este comentario?'
        />
      )}
    </DeleteCommentContainer>
  )
}

export default React.memo(DeleteComment)
