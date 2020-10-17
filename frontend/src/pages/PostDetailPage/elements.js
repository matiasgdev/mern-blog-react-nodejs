import styled from 'styled-components'

export const DetailPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
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


export const Title = styled.div`
  font-size: 1.9em;
  line-height: 1em;
  white-space: nowrap;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: black;
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
  height: 100%;
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
  justify-content: space-space-between;
`

export const SeeCommentsButton = styled.a`
  text-decoration: none;
  font-size: .9em;
  font-weight: 400;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 1.5em;
  color: gray;
  padding: .5em 1em;
  border: 1px solid rgba(33,33,33, 0.2);
  cursor: pointer;

  &:hover {
    color: black;
    border-color: black;
  }
`