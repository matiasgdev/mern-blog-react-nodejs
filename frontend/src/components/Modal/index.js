import React from 'react'
import { createPortal } from 'react-dom'

import {
  ModalContainer,
  ModalWrapper,
  ModalTitle,
  ModalDetails,
  Button,
  CloseButton
} from './elements'

const Modal = ({
  open,
  handleOpenModal,
  message,
  action,
  loading,
  error,
  success
}) => {
  
  
  if (!open) return null

  return createPortal(
    <ModalContainer>
      <ModalWrapper open={open}>
        {error ? error : (
          <>
            <ModalTitle>{message}</ModalTitle>
            {success && 'Se borro exitosamente'}
            {loading ? null : (
              <ModalDetails>
                <Button confirm onClick={action}>Seguro</Button>
                <Button cancel onClick={handleOpenModal}>Cancelar</Button>
              </ModalDetails>
            )}
          </>
        )}
        <CloseButton onClick={handleOpenModal}/>
      </ModalWrapper>
    </ModalContainer>,
    document.body
  )
}
export default Modal
