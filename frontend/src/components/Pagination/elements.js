import styled from 'styled-components'


export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  
`

export const PaginationContent = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  height: 26px;
  
  box-shadow: 0 0 0 .5px rgba(33,33,33, 0.075);

`

export const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  height: 100%;

`

export const Item = styled.li`
  cursor: pointer;
  display: grid;
  padding: .2em .5em;
  place-items: center;
  border-left: .5px solid rgba(33,33,33, 0.075);

  color: ${({isActual}) => isActual ? 'white' : 'initial'};
  font-weight: ${({isActual}) => isActual ? '500' : 'normal'};
  background-color: ${({isActual}) => isActual ? '#590995' : 'white'};

  &:hover {
    background-color: ${({isActual}) => isActual ? '#590995' : 'initial'};
    border-left: .5px solid transparent;
  }
`

export const Button = styled.button`
  height: 100%;
  border: none;
  outline: none;
  font-weight: 400;
  color: #2d2d2d;
  cursor: pointer;

  background-color: #e1e1e1; 


  &:hover {
    background-color: #cecece;
    color: whitesmoke;
  }

`