import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detail, clearDetails } from '../../actions/postsActions'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import fetchComments from '../../services/fetchComments'

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
  SeeCommentsButton
} from './elements'

function PostDetailPage({params}) {
  const dispatch = useDispatch()
  const slug = params.slug

  const { data } = useSelector(state => state.posts)
  const postFromCache = data.posts ? data.posts.find(post => slug === post.slug) : null
  
  const { postInfo, loading, error } = useSelector(state => state.postDetail)
  const post = postFromCache ? postFromCache : postInfo

  const [showComment, setShowComment] = useState(false)

  const seeComments = () => {
    setShowComment(prevShowComment => !prevShowComment)
  }



  useEffect(function() {
    if (!postFromCache) {
      dispatch(detail(slug))
    }
    return () => {
      dispatch(clearDetails())
    }
  }, [dispatch, detail, slug, clearDetails])


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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus rem sequi voluptatibus veniam non sed voluptate, facilis fugit ab excepturi suscipit, adipisci et, incidunt consequuntur voluptates assumenda? Similique, facere ratione.
                </Content>
              </TextContainer>
              <MoreDetails>
                <SeeCommentsButton onClick={seeComments}>
                  ver comentarios
                </SeeCommentsButton>
              </MoreDetails>
              <div style={{ display: showComment ? 'block' : 'none'}}>
                {
                post.comments.length === 0 ? 'No hay comentarios aún' : 
                post.comments.map(comment => {
                  return (
                    <div  key={comment._id}>
                      <p> {comment.content} </p>
                      <p> {comment.user} </p>
                    </div>
                  )
                })
                }
              </div>
            </MainContent>
          </PostContainer>
        ) : null
      }
    </DetailPageContainer>
  )
}

export default PostDetailPage