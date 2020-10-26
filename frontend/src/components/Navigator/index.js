import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions'
import { Link, useRoute, useLocation } from 'wouter'
import {
  Header,
  HeaderContainer,
  LogoContainer,
  LogoIcon,
  Navbar,
  NavbarItem,
  NavbarLink,
  BurguerContainer,
  BurguerIcon,
  BurguerCloseIcon
} from './elements'
import { Button } from '../../style'

const ActiveLink = props => {
  const match = props.href.includes('comunidad') ? '/comunidad' : props.href

  const [isActive] = useRoute(match);
  return (
    <Link {...props}>
      <NavbarLink isActive={isActive}> {props.children} </NavbarLink>
    </Link>
  );  
};

const Navigator = () => {
  const dispatch = useDispatch()
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const [show, setShow] = useState()
  const showSidebar = () => {
    setShow(preShow => !preShow)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Header>
      <HeaderContainer>
        <LogoContainer>
          <LogoIcon />
        </LogoContainer>
        <Navbar show={show} onClick={showSidebar}>
          <NavbarItem>
            <ActiveLink href="/">Inicio</ActiveLink>
          </NavbarItem>
          <NavbarItem>
            <ActiveLink href="/comunidad">Comunidad</ActiveLink>
          </NavbarItem>
          <NavbarItem>
            <ActiveLink href="/reglas">Reglas</ActiveLink>
          </NavbarItem>
          {userInfo ? (
            <>
              <NavbarItem uneffect onClick={handleLogout}>
                <NavbarLink href="/">Cerrar sesión</NavbarLink>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem uneffect>
                <NavbarLink as={Link} href="/iniciar-sesion">
                  <Button primary> Ingresar </Button>
                </NavbarLink>
              </NavbarItem>
            </>
            )
          }
        </Navbar>
        <BurguerContainer>
          {!show ?
            <BurguerIcon onClick={showSidebar}/> :
            <BurguerCloseIcon onClick={showSidebar}/>
          }
        </BurguerContainer>
      </HeaderContainer>
    </Header>
  )
}

export default Navigator