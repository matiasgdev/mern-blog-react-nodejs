import React from 'react'
import heroImage from '../../static/hero.jpeg'
import { Link } from 'wouter'

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

  return (
    <>
      <HeroContainer>
        <HeroContent>
          <Title>Un lugar para encontrar ideas, compartir conocimiento y opiniones</Title>
          <Subtitle>Sientete libre de escribir lo que pienses</Subtitle>
          <HeroButton primary>
            <Link href="/registrarse">
              Ser un miembro
            </Link>
          </HeroButton>
        </HeroContent>
        <ImageContainer>
          <ImageItem src={heroImage} alt="Hero Image"/>
        </ImageContainer>
      </HeroContainer>
    </>
  )
}

export default Hero
