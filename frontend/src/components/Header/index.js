import React from 'react'
import {Helmet} from 'react-helmet'

const Header = ({description, title}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
    </>
  )
}

export default Header
