import styled from 'styled-components'
import { Link } from 'wouter'
import { Button } from '../../style'


export const Community = styled.div`
  min-height: 100vh;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 3em 5em;
  background: #f2f2f2;  
`

export const CommunityContainer = styled.div`
  justify-self: flex-start;
  min-height: calc(100vh - 80px);
  width: 70%;
`

export const ListPostContainer = styled.div`
  margin-top: 1.5em;
`

export const Header = styled.header`
`

export const Title = styled.h2`
  margin-bottom: .5em;
  line-height: 1em;
  font-size: 1.6em;
  color: #590995;
`

export const Subtitle = styled.div`
  color: #5f5f6f;
  font-size: 1.4em;
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


