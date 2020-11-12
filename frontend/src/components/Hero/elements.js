import styled from 'styled-components'
import { Button } from '../../style'

export const HeroContainer = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  overflow: hidden;
  display: flex;
`

export const HeroContent = styled.div`
  text-align: left;
  flex-basis: 55%;
  display: flex;
  padding-left: 5em;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 6em;


  @media screen and (max-width: 767px) {
    flex-basis: 700%;
    text-align: center;
    align-items: center;
    padding: 0;
  }
`

export const Title = styled.h2`
  font-size: 2.9em;
  font-weight: normal;
  margin-bottom: 0;
`

export const Subtitle = styled.p`
  margin: 1em 0;
  font-size: 1.3em;
  color: rgb(153, 153, 153);

  @media screen and (max-width: 767px) {
    color: white;
    text-shadow: 0 0 1px black;
  }

`
export const ImageContainer = styled.div`
  height: 100%;
  position: relative;
  flex-basis: 50%;

  @media screen and (max-width: 767px) {
    flex-basis: 30%;
  }
`

export const ImageItem = styled.img`
  position: absolute;
  right: -15%;
  top: -10%;
  width: 700px;
  height: 700px;
  vertical-align: top;
  object-fit: cover;
  border-radius: 50%;
  z-index: -10000;
  box-shadow: 0px 0px 0px 5px rgba(128, 128, 128, 0.116),
  0px 0px 0px 10px rgba(128, 128, 128, 0.068);


  @media screen and (max-width: 767px) {
    height: 600px;
    width: 600px;
    top: 0%;
  }
`

export const HeroButton = styled(Button)`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.4em;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media screen and (max-width: 767px) {
    font-size: 1em;
  }
`
