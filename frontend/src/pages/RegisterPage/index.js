import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import { signin, clear } from '../../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'wouter'

import {
  LoginPageContainer,
  LeftContent,
  RightContent,
  Title,
  FormContainer,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from './elements'

export default function FormRegister() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)
  const registerInfo = useSelector(state => state.userRegister)
  const { error: userError, loading: userLoading, success } = registerInfo

  const [ _, pushLocation ] = useLocation()

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const [ message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!email) {
      setMessage('Se requiere un email')
      return
    }
    if(!username) {
      setMessage('Se requiere un nombre de usuario')
      return
    }
    
    if (password !== confirmPassword) {
      setMessage('La contraseña debe coincidir')
      return
    }
    
    dispatch(signin({
      email,
      password,
      username
    }))
    
  }

  useEffect(function() {
    if (success || userInfo) {
      pushLocation('/')
    }

    if (userError) {
      setMessage(userError)
    }
  }, [success, pushLocation, userError, userLoading, userInfo, dispatch])

  return (
    <LoginPageContainer>
      <LeftContent>
        <Title>
          Registrarse
        </Title>
        <FormContainer>
          { message && <Error message={message} /> }
          <Form
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese un email válido"
                message={message.includes('email')}
              >
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Nick</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                message={message.includes('usuario')}
              >
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                message={message.includes('contraseña')}
                
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirmar contraseña</Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                message={message.includes('contraseña')}
              />
            </FormGroup>
            <FormGroup>
              {!userLoading ? (
                <Button>
                  Enviar
                </Button>
              ) : (
                <Loader/>
              )}
            </FormGroup>
          </Form>
        </FormContainer>
      </LeftContent>
      <RightContent>
        
      </RightContent>
    </LoginPageContainer>
  )
}

