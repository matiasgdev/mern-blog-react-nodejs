import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detail, clearDetails, updateLikes } from '../../actions/postsActions'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
// import fetchComments from '../../services/fetchComments'

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
  LikesContainer,
  LikesCount,
  LikeIconUnfill,
  LikeIconFill,
  NoCommentsYet

} from './elements'

function PostDetailPage({params}) {
  const dispatch = useDispatch()
  const slug = params.slug
  const inputRef = useRef(null)
  
  const { data } = useSelector(state => state.posts)
  const postFromCache = data.posts ? data.posts.find(post => slug === post.slug) : null
  
  const { postInfo, loading, error } = useSelector(state => state.postDetail)
  const post = postFromCache ? postFromCache : postInfo
  
  const { userInfo } = useSelector(state => state.userLogin)
  
  const { likes: likesCount, loading: loadingLike, error: errorLike } = useSelector(state => state.postUpdateLikes)
  const [showComment, setShowComment] = useState(false)

  const seeComments = () => {
    setShowComment(prevShowComment => !prevShowComment)
  }
  
  const [showIconLike, setShowIconLike] = useState(false)
  
  const handleUpdateLikes = () => {
    // handle submit likes
    dispatch(updateLikes({id: post._id, slug: post.slug }))
    setShowIconLike(iconState => !iconState)
  }


  useEffect(function() {
    if (inputRef.current) {
      inputRef.current.focus()
      window.scrollTo(0, window.innerHeight + 200)
    }
  }, [showComment])



  useEffect(function() {
    if (!postFromCache) {
      dispatch(detail(slug))
    }
    return () => {
      dispatch(clearDetails())
    }
  }, [dispatch, detail, slug, clearDetails])

  useEffect(function() {
    let isLiked
    if (post) {
      isLiked = post.likes.find(like => like.user === userInfo.user._id)
    }
    if (isLiked) {
      setShowIconLike(true)
    }
  }, [post, userInfo])

  return (
    <DetailPageContainer>
      {
        loading ? <Loader />
        : error ? ( <Error message={error} />) : 
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
              <Image src={post.imagePath} />
              <TextContainer>
                <Content>
                  {post.content}
                </Content>
              </TextContainer>
              <MoreDetails>
                <LikesContainer>
                  { !showIconLike ? 
                    <LikeIconUnfill onClick={handleUpdateLikes} /> : 
                    <LikeIconFill onClick={handleUpdateLikes} />
                  }
                  { loadingLike ? 'Loading' : (
                  <LikesCount >
                    { post.likes.length }
                  </LikesCount>)}
                </LikesContainer>
                <SeeCommentsButton onClick={seeComments}>
                  { showComment ? 'Ocultar comentarios' : `Ver comentarios (${ post.comments.length})`}
                </SeeCommentsButton>
              </MoreDetails>
              
              <CommentContainer showComment={showComment}>
                {userInfo && (
                  <CreateCommentContainer>
                    <FormComment>
                      <InputComment type="text" ref={inputRef}/>
                      <ButtonComment>Enviar</ButtonComment>
                    </FormComment>
                  </CreateCommentContainer>
                )}

                {post.comments.length === 0 ? <NoCommentsYet>No hay comentarios aún</NoCommentsYet> : (
                  <UserCommentsContainer>
                    {post.comments.map(comment => {
                      return (
                        <UserComment key={comment._id}>
                          <UserCommentContent> {comment.content} </UserCommentContent>
                          <UserCommentInfo> {comment.user} </UserCommentInfo>
                        </UserComment>
                      )
                    })}
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