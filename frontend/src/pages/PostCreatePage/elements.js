import styled, { css } from 'styled-components'

export const PostCreateContainer = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column; 
  align-items: center;
  
`

export const Title = styled.h2`
  font-size: 1.6em;
  margin: 2.3em 0 1.2em 0;
  font-weight: 500;
  color: #5e5d5d;
  width: 70%;
`

export const FormContainer = styled.div`
  height: 100%;
  width: 70%;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  font-size: 1.2em;
  font-weight: 400;
  margin-bottom: .5em;
  color: black;
`
export const Input = styled.input`
  margin-bottom: .7em;
  font-size: 1.1em;
  padding: .8em .5em;
  border: 1px solid rgba(105,105,105, 0.4);
  color: gray;

  &:focus {
    border: 1px solid transparent;
    outline: 2px solid rgba(33,33,33,0.2);
  }

  ${({textarea}) => textarea &&

    css`
      width: 100%;
      min-height: 300px;
      max-height: 500px;
      resize: none;
    `
  }

  ${({error}) => error &&
    css`
      border-color: red;
    `
  }

`


export const Button = styled.button`
  border: none;
  outline: none;
  margin: 2.5em 0;
  font-size: 1.1em;
  align-self: flex-start;
  padding: .7em 1.3em;
	color: #fdfdfd;
	cursor: pointer;
  background-color: #219509;
  
  &:hover, &:focus {
    outline: 2px solid #219509;
  }

`