import styled, { css } from 'styled-components'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart, AiOutlineEdit} from 'react-icons/ai'
import { Link } from 'wouter'

export const DetailPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`


export const PostContainer = styled.div`
  margin: 3em 0;
  width: 90%;

  display: grid;
  grid-template-columns: 70% 1fr;
  grid-template-rows: 200px 1fr;

  grid-template-areas: 'left right'
                      'content content';

  border: 1px solid rgba(33,33,33,0.1);

`

export const EditPostWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3em;  
`

export const EditPostButton = styled(Link)`
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;

`

export const EditPostIcon = styled(AiOutlineEdit)`
  font-size: 1.2em;
  margin-left: .3em;
`

export const EditPostText = styled.span`
  display: inline-block;

`


export const Title = styled.div`
  font-size: 1.9em;
  line-height: 1em;
  white-space: nowrap;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #590995;
`

export const Description = styled.div`
  color: gray;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
  font-size: 1.1em;
`

export const LeftInfo = styled.div`

  padding: 4em 3em;
  grid-area: left;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(33,33,33,0.1);

`
export const RightInfo = styled.div`
  grid-area: right;
  height: 100%;
  width: 100%;
  padding: 4em 3em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(33,33,33,0.1);
  border-left: 1px solid rgba(33,33,33,0.1);
`
export const DateInfo = styled.div`
  font-size: 1.2em;
  color: gray;
  text-transform: uppercase;
  font-weight: 300;

`
export const UserInfo = styled.div`
  font-size: 1.1em;
  color: #4a4a4a;
  font-weight: 300;

  strong {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const MainContent = styled.div`
  grid-area: content;
  padding-top: 3em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Image = styled.img`
  height: 36em;
  width: calc(100% - 6em);
  object-fit: cover;
`
export const TextContainer = styled.div`
  margin-bottom: 1em;
  width: calc(100% - 6em);
`

export const Content = styled.p`
  width: calc(100%);
  font-size: 1.2em;
  line-height: 1.4em;
  font-weight: 200;
  color: gray;
  text-align: left;
`

export const MoreDetails = styled.div`
  width: calc(100% - 6em);
  height: max-content;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;

`

export const SeeCommentsButton = styled.a`
  text-decoration: none;
  font-size: .9em;
  font-weight: 400;
  text-transform: uppercase;
  display: inline-block;
  color: gray;
  padding: .5em 1em;
  border: 1px solid rgba(33,33,33, 0.2);
  cursor: pointer;

  &:hover {
    color: black;
    border-color: black;
  }
`

export const CreateCommentContainer = styled.div`
  width: 100%;
`

export const FormComment = styled.form`
  width: 100%;
  display: flex;
  height: 4em;

  &:focus-within {
    outline: 2px solid rgba(89,9,149, .4);
  }
`

export const InputComment = styled.textarea`
  width: 100%;
  height: 100%;
  padding: .5em;
  border: 1px solid rgba(33,33,33, 0.1);
  border-right: none;
  resize: none;
  margin: 0;

  
`
export const ButtonComment = styled.button`
  border: none;
  outline: none;
  display: inline-block;
  height: 100%;
  width: 20%;
  border: 1px solid rgba(33,33,33, 0.1);
  font-size: .9em;
  font-weight: 400;
  text-transform: uppercase;
  color: gray;

  ${({disabled}) => !disabled &&
    css`
      cursor: pointer;
      background-color: #590995;
      color: white;
      &:hover {
        background-color: #4e0882;
      }
    `
  }
  

`
export const CommentContainer = styled.div`
  width: calc(100% - 6em);
  display: ${({showComment}) => {
    return showComment ? 'block' : 'none'
  }};

`


export const UserCommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1.5em 0;
  
`

export const UserComment = styled.div`
  /* height: ${({showMoreComment}) => {
    return showMoreComment ? 'auto' : ' 3em';
  }}; */
  margin-bottom: 1em;
  padding: .3em 0;
  border-bottom: 1px solid rgba(0,0,0, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
`
export const UserCommentContent = styled.p`
  width: 100%;
  margin: 0;
  text-align: left;
  color: #535353;
  font-size: 1.2em;
  margin-bottom: .3em;
  font-weight: 300;
`
export const UserCommentInfo = styled.span`
  display: inline-block;
  width: min-content;
  font-size: 1.1em;
  margin-bottom: .3em;
  font-weight: 400;
`

export const UserCommentDate = styled.span`
  display: inline-block;
  color: gray;
  font-size: .8em;
  margin-bottom: 1em;
  text-transform: uppercase;
`

export const LikesContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LikeIconUnfill = styled(AiOutlineHeart)`
  font-size: 1.2em; 
  margin-right: .3em;
  color: #590995;

  transition: all 150ms ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.075);
  }
`

export const LikeIconFill = styled(AiFillHeart)`
  font-size: 1.2em;
  margin-right: .3em;
  color: #590995;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.075);
  }
`

export const LikesCount = styled.span`
  color: #590995;
  font-size: 1em;

`

export const NoCommentsYet = styled.span`
  display: inline-block;
  margin: 1.5em 0;
  color: gray;
  font-size: .9em;
  font-style: italic;

`

