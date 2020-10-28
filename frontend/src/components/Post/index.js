import React from 'react'
import {
  PostItemContainer,
  ImageContainer,
  ContentContainer,
  Title,
  Description,
  DetailsContainer,
  CreatedBy,
  LikesCounterContainer,
  LikeIcon,
  LikeCount,
  CommentsCounterContainer,
  CommentCount,
  CommentIcon,
  Content 
} from './elements'

export default function Post({
    title, 
    description,
    content,
    imagePath,
    slug,
    likes,
    comments,
    popular,
    user = {}}
){
  return (
    <PostItemContainer to={`/publicacion/${slug}`}>
      {imagePath &&
        <ImageContainer src={imagePath} loading="lazy" />
      }
      <ContentContainer>
        <Title popular={popular ? popular : false}>{title}</Title>
        <Description>{description}</Description>
        <CreatedBy> 
          Creado por {user.username}
        </CreatedBy>
        <DetailsContainer>
          <LikesCounterContainer>
            <LikeCount>{likes.length}</LikeCount>
            <LikeIcon />
          </LikesCounterContainer>
          {comments &&
            <CommentsCounterContainer>
              <CommentCount>{comments.length}</CommentCount>
              <CommentIcon />
            </CommentsCounterContainer>
          }
        </DetailsContainer>
      </ContentContainer>
    </PostItemContainer>
  )
}
