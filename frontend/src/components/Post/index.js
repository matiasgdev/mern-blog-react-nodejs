import React from 'react'
import {
  PostItemContainer,
  ImageContainer,
  ContentContainer,
  Title,
  Description,
  DetailsContainer,
  DetailItem,
  Content
} from './elements'

export default function Post({
    title, 
    description,
    content,
    imagePath,
    slug,
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
        </DetailsContainer>
      </ContentContainer>
    </PostItemContainer>
  )
}
