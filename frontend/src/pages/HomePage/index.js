import React from 'react'
import Header from '../../components/Header'
import Hero from '../../components/Hero'

function Home() {
  return (
    <>
      <Header
        title="Bloggy | Inicio"
        description="Bloggy is a nice blog to read everything about our users" />
      <Hero />
    </>
  )
}

export default Home