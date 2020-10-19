import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
// import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineComment } from 'react-icons/ai'
import { Link } from 'wouter'

export const PostItemContainer = styled(Link)`
  color: none;
  text-decoration: none;
  display: flex;
  width: 100%;
  margin-bottom: .5em;
  background-color: rgb(246,246,246);
  border: 1px solid rgba(33,33,33, 0.1);
  border-radius: 10px;
  padding: .5em;

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
  font-size: 1.3em;
  justify-self: flex-start;
`

export const Content = styled.div`

`
export const Description = styled.div`
  font-size: .9em;
`
export const DetailsContainer = styled.div`

  display: flex;

`
export const DetailItem = styled.div`
  font-size: .8em;
  color: #8f8f8f;
`

export const LikesCounter = styled.span`
`

export const CommentsCounterContainer = styled.span`

`

export const CommentCount = styled.span`

`
export const CommentIcon = styled(AiOutlineComment)`

`

export const LikeCounterContainer = styled.span`

`

export const LikeCount = styled.span`

`

export const LikeIcon = styled(AiOutlineHeart)`
`

