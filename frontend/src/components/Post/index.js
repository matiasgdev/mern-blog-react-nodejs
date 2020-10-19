import React from 'react'
import {
  PostItemContainer,
  ImageContainer,
  ContentContainer,
  Title,
  Description,
  DetailsContainer,
  DetailItem,
  LikesCounterContainer,
  LikeIcon,
  LikeCount,
  CommentsCounterContainer,
  CommentCount,
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
    user = {}}
){
  return (
    <PostItemContainer to={`/publicacion/${slug}`}>
      <ImageContainer  src={imagePath} loading="lazy" />
      <ContentContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <DetailsContainer>
          <DetailItem> 
            Creado por {user.username}
          </DetailItem>
          <LikesCounterContainer>
            <LikeCount>{likes.length}</LikeCount>
            <LikeIcon />
          </LikesCounterContainer>
          <CommentsCounterContainer>
            <CommentCount>{comments.length}</CommentCount>
          </CommentsCounterContainer>
        </DetailsContainer>
      </ContentContainer>
    </PostItemContainer>
  )
}
