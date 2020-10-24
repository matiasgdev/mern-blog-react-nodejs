import { useState, useCallback } from 'react'

export default function useModal() {
  const [openModal, setOpenModal] = useState(false)
    
  const handleOpenModal = useCallback(
    () => setOpenModal(isOpen => !isOpen)
  , [setOpenModal])

  return {
    openModal,
    handleOpenModal
  }

}

