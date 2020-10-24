import styled, {css} from 'styled-components'
import {GrFormClose} from 'react-icons/gr'

export const DeleteIcon = styled(GrFormClose)`
  color: white;
  cursor: pointer;

  &:hover {
    color: black;
  }
`

export const DeleteCommentContainer = styled.div`
  position: absolute;
  top: .5em;
  right: .5em;
`