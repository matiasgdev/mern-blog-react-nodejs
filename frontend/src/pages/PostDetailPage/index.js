import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detail, clearDetails, updateLikes, createComment } from '../../actions/postsActions'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

import {
  DetailPageContainer,
  PostContainer,
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

function PostDetailPage({params}) {
  const dispatch = useDispatch()
  const slug = params.slug

  const inputRef = useRef(null)
  const [showComment, setShowComment] = useState(false)
  const [postComment, setPostComment] = useState('')
  
  const { post, loading, error } = useSelector(state => state.postDetail)
  
  const { userInfo } = useSelector(state => state.userLogin)
  
  const { likes: likesCount, loading: loadingLike, error: errorLike } = useSelector(state => state.postUpdateLikes)


  const seeComments = () => {
    setShowComment(prevShowComment => !prevShowComment)
  }
  
  const [showIconLike, setShowIconLike] = useState(false)
  
  const handleUpdateLikes = () => {
    if (!userInfo) return
    // handle submit likes
    dispatch(updateLikes({id: post._id, slug }))
    setShowIconLike(iconState => !iconState)
  }


  useEffect(function() {
    if (inputRef.current) {
      inputRef.current.focus()
      window.scrollTo(0, window.innerHeight + 200)
    }
  }, [showComment, inputRef])



  useEffect(function() {
    dispatch(detail(slug))
    return () => dispatch(clearDetails())

  }, [dispatch, detail, slug, clearDetails])

  useEffect(function() {
    let isLiked
    if (post && userInfo) {
      isLiked = post.likes.find(like => like.user === userInfo.user._id)
    }
    if (isLiked) {
      setShowIconLike(true)
    }
  }, [post, userInfo, setShowIconLike])

  return (
    <DetailPageContainer>
      {
        loading ? <Loader size={80} scale="mini"/>
        : error ? <Error message={error} /> : 
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
                  {!showIconLike ? 
                    <LikeIconUnfill onClick={handleUpdateLikes} /> : 
                    <LikeIconFill onClick={handleUpdateLikes} />
                  }
                  {loadingLike && !errorLike ? 
                    <Loader /> : (
                    <LikesCount >
                      {post.likes.length}
                    </LikesCount>)
                  }
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
                      dispatch(createComment({ slug, id: post._id, comment: postComment}))
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
                    {post.comments.map((comment) => (
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
                            <DeleteComment postId={comment.post} slug={slug} commentId={comment._id}/>
                        }
                      </UserComment>
                    ))}
                  </UserCommentsContainer>
                )
                }
              </CommentContainer>
            </MainContent>
          </PostContainer>
        ) : null
      }
    </DetailPageContainer>
  )
}

export default PostDetailPage