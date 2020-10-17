import styled from 'styled-components'
import { ImBlogger } from 'react-icons/im'
import { BiMenuAltLeft } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { Link } from 'wouter'

const bp = {
  medium: '767px'
}

export const Header = styled.header`
  position: relative;
  height: 80px;
  padding: 0 2em 0 5em;
  border-bottom: 1px solid rgba(103,103,103, .1);
  background-color: #fffdfd;

`

export const HeaderContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LogoContainer = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: baseline;
`

export const LogoIcon = styled(ImBlogger)`
  height: 100%;
  font-size: clamp(22px, 6vmin, 35px);
  display: inline-block;
  color: #3e3e3e;
`

export const Navbar = styled.ul`
  flex-basis: 35%;
  height: 100%;
  display: flex;
  justify-content: auto;
  align-items: center;
  color: #000;

  @media screen and (max-width: 1000px) {
    flex-basis: 50%;
  }

  @media screen and (max-width: ${bp.medium}) {
    height: calc(100vh - 80px);
    margin: 0;
    padding: 0;
    transform: ${({show}) => show ? 'translateX(0%)' : 'translateX(-100%)'};
    position: absolute;
    top: 80px;
    right: 0%;
    left: 0;
    transition: transform 150ms ease;
    flex-direction: column;
    background-color: rgba(0,0,0, 0.8);
    color: white;
  } 
`

export const NavbarItem = styled.li`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: clamp(14px, 3vmin, 15px);
  font-weight: 500;
  /* color: ; */
  cursor: pointer;

  &:hover {
    color: #590995;
  }

  @media screen and (max-width: ${bp.medium}) {
    width: 100%;
    letter-spacing: 1px;

    &:hover {
      color: #d3d3d3;
      &::after {
        display: none;
      }
    }
  }
`

const setActiveStyles = () => {
  return `
  color: #590995;
  &::after {
    display: ${({uneffect}) => uneffect ?  'none' : 'initial'};
    content: '';
    height: 2.5px;
    width: 30%;
    position: absolute;
    bottom: -5px;
    background-color: #590995;
  }
  `
}




export const NavbarLink = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  ${({isActive}) => isActive ? setActiveStyles() : ''  }


`

export const BurguerContainer = styled.div`
  display: none;

  @media screen and (max-width: ${bp.medium}) {
    display: flex;
  }
`

export const BurguerIcon = styled(BiMenuAltLeft)`
  font-size: 2em;
  cursor: pointer;
`

export const BurguerCloseIcon = styled(MdClose)`
  font-size: 2em;
  cursor: pointer;
`