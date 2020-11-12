import styled, { css } from 'styled-components'
import { Link } from 'wouter'

export const Community = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 3em 3.5em;
  background: #f2f2f2;

  @media screen and (max-width: 1200px) {
    padding: 3em 2em;
  }
`

export const CommunityContainer = styled.div`
  justify-self: flex-start;
  min-height: calc(100vh - 80px);
`

export const PostsWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  display: grid;
  grid-template-columns: 65% 1fr;
  gap: 3em;

  @media screen and (max-width: 1200px) {
    gap: 2em;
    grid-template-columns: 50% 1fr;
  }

  @media screen and (max-width: 1200px) {
    gap: 2em;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

`

export const LeftContent = styled.div`
  width: 100%;
`

export const RightContent = styled.div`
  width: 100%;

  @media screen and (max-width: 1200px) {
    width: 60%;
  }
`

export const ListPostContainer = styled.div`
  min-height: 200px;
  position: relative;
  margin-top: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`

export const Header = styled.header`
  width: 100%;
`

export const Title = styled.h2`
  margin-bottom: .5em;
  line-height: 1em;
  font-size: 1.6em;
  color: #590995;

  ${({right}) => right &&
    css`
      font-size: 1.3em;
      font-weight: 500;
    `
  }
`

export const Subtitle = styled.div`
  color: #5f5f6f;
  font-size: 1.3em;

  ${({right}) => right &&
    css`
      font-size: 1em;
      font-weight: 400;
    `
  }
`

export const CreatePostItem = styled(Link)`
  margin: 1.5em 0 0 0;
  font-size: 1em;
  display: inline-block;
  text-decoration: none;
  right: 0;
  top: 0;
  color: rgb(89,9,149);

  &:hover {
    text-decoration: underline;
  }
`


