import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLikes, createComment } from '../../actions/postsActions'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import MiniLoader from '../../components/MiniLoader'

import {
  DetailPageContainer,
  PostContainer,
  EditPostWrapper,
  EditPostIcon,
  EditPostText,
  EditPostButton,
  LeftInfo,
  RightInfo,
  DateInfo,
  UserInfo,
  Title,
  MainContent,
  Image,
  TextContainer,
  Description,
  Content,
  MoreDetails,
  CommentContainer,
  SeeCommentsButton,
  CreateCommentContainer,
  FormComment,
  InputComment,
  ButtonComment,
  UserCommentsContainer,
  UserComment,
  UserCommentContent,
  UserCommentInfo,
  UserCommentDate,
  LikesContainer,
  LikesCount,
  LikeIconUnfill,
  LikeIconFill,
  NoCommentsYet

} from './elements'
import DeleteComment from '../../components/DeleteComment'
import { usePostDetail } from '../../hooks/usePostDetail'

function PostDetailPage({params}) {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { post, loading, error } = usePostDetail({slug: params.slug })

  const isOwnerOfPost = post && userInfo && post.user._id === userInfo.user._id

  const inputRef = useRef(null)
  const [showComment, setShowComment] = useState(false)
  const [showIconLike, setShowIconLike] = useState(false)
  const [postComment, setPostComment] = useState('')
  
  const { loading: loadingLike } = useSelector(state => state.postUpdateLikes)

  const seeComments = useCallback(() => {
    setShowComment(prevShowComment => !prevShowComment)
  }, [])
  
  // update like
  const handleUpdateLikes = useCallback(() => {
    if (!userInfo) return
    // handle submit likes
    dispatch(updateLikes({id: post._id, slug: params.slug }))
    setShowIconLike(iconState => !iconState)
  }, [showIconLike, setShowIconLike, userInfo, post, updateLikes, dispatch])

  // focus input when open comments info
  useEffect(function() {
    if (inputRef.current) {
      inputRef.current.focus()
      window.scrollTo(0, window.innerHeight + 200)
    }
  }, [showComment, inputRef])

  // verify like-icon state
  useEffect(function() {
    let isLiked
    if (post && userInfo) {
      isLiked = post.likes.some(like => like.user === userInfo.user._id)
    }
    if (isLiked) {
      setShowIconLike(true)
    }
  }, [post, userInfo, setShowIconLike])

  return (
    <DetailPageContainer>
      {/* edit post  */}
      {isOwnerOfPost &&
        <EditPostWrapper>
          <EditPostButton to={`/editar/publicacion/${post.slug}`}>
            <EditPostText>
              Editar
            </EditPostText>
            <EditPostIcon />
          </EditPostButton>
        </EditPostWrapper>
      }
      {
        loading ? <Loader /> : 
        error ? <Error message={error} /> : 
        post ? (
          <PostContainer>
            <LeftInfo>
              <Title> {post.title} </Title>
              <Description>{post.description}</Description>
            </LeftInfo>
            <RightInfo>
              <DateInfo> {new Date(post.createdAt).toLocaleDateString()} </DateInfo>
              <UserInfo> Creado por{' '}
                <strong>{post.user.username}</strong> 
              </UserInfo>
            </RightInfo>
            <MainContent>
              <Image src={post.imagePath} alt={post.title} />
              <TextContainer>
                <Content>
                  {post.content}
                </Content>
              </TextContainer>
              <MoreDetails>
                <LikesContainer>
                  {loadingLike ? 
                    <MiniLoader /> : (
                      <>
                        {!showIconLike ? 
                          <LikeIconUnfill onClick={handleUpdateLikes} /> : 
                          <LikeIconFill onClick={handleUpdateLikes} />
                        }
                        <LikesCount >
                          {post.likes.length}
                        </LikesCount>
                      </>
                  )}
                </LikesContainer>
                <SeeCommentsButton onClick={seeComments}>
                  {showComment ? 'Ocultar comentarios' : `Ver comentarios (${post.comments.length})`}
                </SeeCommentsButton>
              </MoreDetails>
              
              <CommentContainer showComment={showComment}>
                {userInfo && (
                  <CreateCommentContainer>
                    <FormComment onSubmit={(e) => {
                      e.preventDefault()
                      dispatch(createComment({slug: params.slug, id: post._id, comment: postComment}))
                      setPostComment('')
                    }}>
                      <InputComment 
                        type="text" 
                        ref={inputRef}
                        value={postComment}
                        onChange={(e) => setPostComment(e.target.value)}/>
                      <ButtonComment 
                        type="submit"
                        disabled={postComment.length === 0 ? true : false}
                      > Enviar
                      </ButtonComment>
                    </FormComment>
                    {/*  */}
                  </CreateCommentContainer>
                )
                }
    
                {post.comments.length === 0 ? ( 
                  <NoCommentsYet>No hay comentarios</NoCommentsYet> 
                  ) : (
                  <UserCommentsContainer>
                    {post.comments.map(comment => (
                      <UserComment key={comment._id}>
                        <UserCommentInfo>
                          {comment.user.username}
                        </UserCommentInfo>
                        <UserCommentDate>
                          {new Date(comment.createdAt).toLocaleString().replace(/PM|MP/, '')}
                        </UserCommentDate>
                        <UserCommentContent>
                          {comment.content}
                        </UserCommentContent>
                        {/* post's owner or comment's owner */}
                        {userInfo && 
                          ( 
                            userInfo.user._id === comment.user._id ||
                            userInfo.user._id === post.user._id
                          ) &&
                            <DeleteComment postId={comment.post} slug={params.slug} commentId={comment._id}/>
                        }
                      </UserComment>
                    ))}
                  </UserCommentsContainer>
                )}
              </CommentContainer>
            </MainContent>
          </PostContainer>
        ) : null
      }
    </DetailPageContainer>
  )
}

export default PostDetailPage