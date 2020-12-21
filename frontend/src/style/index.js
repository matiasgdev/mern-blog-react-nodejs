import styled from 'styled-components'

export const Button = styled.button`
  font-weight: inherit;
  font-size: inherit;
  outline: none;
  border: none;
  height: initial;
  padding: 8px 16px;
  border-radius: 5px;
  background: ${({primary})  => primary ? '#590995' : 'black'};
  color: white;
  border: 4px solid ${({primary})  => primary ? '#590995' : 'black'};
  cursor: pointer;
  transition: background 150ms ease-out;
  
  &:hover {
    background: none;
    color: ${({primary})  => primary ? '#590995' : 'black'};;
    &::after {
      display: none;
    }
  }

  @media screen and (max-width: 767px){
    padding: 12px 44px;
    color: white;
  }
`