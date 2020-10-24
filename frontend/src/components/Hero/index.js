import React from 'react'
import heroImage from '../../static/hero.jpeg'
import { Link } from 'wouter'
import { useSelector } from 'react-redux'

import { 
  HeroContainer,
  HeroContent,
  Title,
  Subtitle,
  HeroButton,
  ImageContainer,
  ImageItem
} from './elements'

const Hero = () => {

  const { userInfo } = useSelector(state => state.userLogin)

  return (
    <>
      <HeroContainer>
        <HeroContent>
          <Title>Un lugar para encontrar ideas, compartir conocimiento y opiniones</Title>
          <Subtitle>Sientete libre de escribir lo que pienses</Subtitle>
            {!userInfo &&
              <HeroButton primary>
                <Link to="/registrarse">
                  Ser un miembro
                </Link>
              </HeroButton>
            }
        </HeroContent>
        <ImageContainer>
          <ImageItem src={heroImage} alt="Hero Image"/>
        </ImageContainer>
      </HeroContainer>
    </>
  )
}

export default Hero
