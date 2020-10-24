import React from 'react'
import Modal from '../Modal'
import useModal from '../../hooks/useModal'
import { DeleteIcon, DeleteCommentContainer } from './elements'

const DeleteComment = ({commentId, postId, slug}) => {
  const { openModal, handleOpenModal } = useModal()


  return (
    <DeleteCommentContainer>
      <DeleteIcon onClick={handleOpenModal}/>
      {openModal && (
        <Modal 
          open={openModal}
          handleModal={handleOpenModal}
          commentId={commentId}
          postId={postId}
          slug={slug}
        />
      )}
    </DeleteCommentContainer>
  )
}

export default React.memo(DeleteComment)
