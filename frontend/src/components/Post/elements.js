import styled, { css } from 'styled-components'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import { Link } from 'wouter'

export const PostItemContainer = styled(Link)`
  min-height: 50px;
  width: 100%;
  align-self: flex-start;
  display: flex;
  margin-bottom: .5em;
  padding: .5em;
  position: relative;

  color: none;
  text-decoration: none;
  background-color: rgb(246,246,246);
  border: 1px solid rgba(33,33,33, 0.1);
  border-radius: 10px;

  &:hover {
    background-color: rgb(250,250,250);
  }


  &:hover {
    box-shadow: 0px 0px 12px 0px rgba(103,103,103, .1);
  }

`
export const ImageContainer = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 1em;

`
export const ContentContainer = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #3f3f3f;
  
  `
export const Title = styled.div`
  justify-self: flex-start;

  ${({popular}) => popular ?
    css`
      font-size: 1.1em;
      margin-bottom: .5em;
    ` :
    css`
      font-size: 1.3em;
    `
  }
`

export const Content = styled.div`

`
export const Description = styled.div`
  font-size: .9em;
  width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const DetailsContainer = styled.div`
  position: absolute;
  width: max-content;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;

`
export const CreatedBy = styled.div`
  font-size: .8em;
  color: #8f8f8f;
`

export const LikesCounter = styled.span`
  color: #590995;
  font-size: 1em;

`

export const CommentsCounterContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;  
`

export const LikesCounterContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: .5em;
`

export const CommentCount = styled.span`
  color: #590995;
  font-size: .9em;
  font-weight: 400;

`
export const CommentIcon = styled(AiOutlineComment)`
  font-size: 1.2em;
  margin-right: .3em;
  color: #590995;
  margin-left: .1em;
`



export const LikeCount = styled.span`
  color: #590995;
  font-size: .9em;
  font-weight: 400;

`

export const LikeIcon = styled(AiOutlineHeart)`
  font-size: 1.2em;
  margin-left: .1em;
  color: #590995;

`

export const LikesCount = styled.span`
  color: #590995;
  font-size: 1em;

`
