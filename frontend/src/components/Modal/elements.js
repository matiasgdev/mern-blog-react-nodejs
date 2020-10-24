import styled, { css, keyframes } from 'styled-components'
import {GrClose} from 'react-icons/gr'


const animation = keyframes`
  0% {
    transform: translateX(80%);
    opacity: 0;
  }
  100% {
    transform: translateX(50%);
    opacity: 1;
  }
`


export const ModalContainer = styled.div`
  display: grid;
  place-items: center;
  color: white;
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

`

export const ModalWrapper = styled.div`
  width: 400px;
  height: 120px;
  padding: .5em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid rgba(33,33,33,0.1);
  animation: ${animation} 150ms ease-in backwards;
  color: black;

`
export const ModalTitle = styled.p`
  font-size: .8em;
  color: gray;
  color: black;
  font-weight: 400;
  margin: 0;
  width: 100%;
  text-align: center;
`

export const ModalDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const Button = styled.button`
  border: none;
  outline: none;
  padding: 8px 16px;
  border-radius: 8px;
  margin-right: 1.5em;
  cursor: pointer;


  ${({confirm}) => confirm &&
    css`
      background-color: #590995;
      color: white;
      &:hover {
        background-color: #4e0882;
      }
    `
  }

  ${({cancel}) => cancel &&
    css`
      background-color: brown;
      color: white;
      &:hover {
        background-color: red;
      }
    `
  }
`

export const CloseButton = styled(GrClose)`
  position: absolute;
  cursor: pointer;
  top: .5em;
  right: .5em;

`