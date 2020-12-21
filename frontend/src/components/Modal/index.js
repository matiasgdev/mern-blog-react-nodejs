import React from 'react'
import PropTypes from 'prop-types'
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
        {error 
          ? error 
          : (
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
          )
        }
        <CloseButton onClick={handleOpenModal}/>
      </ModalWrapper>
    </ModalContainer>,
    document.body
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  mesagge: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default Modal
