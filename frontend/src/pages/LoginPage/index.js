
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clear } from '../../actions/userActions'
import { useLocation } from 'wouter'
import { Link } from 'wouter'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

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

const  LoginPage = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading: loadingUser, error: errorUser, userInfo } = userLogin

  const [_, pushLocation] = useLocation()

  useEffect(function() {
    if (userInfo) {
      pushLocation('/')
    }
    return () => {
      if (errorUser) {
        dispatch(clear())
      }
    }
  }, [userInfo, pushLocation, errorUser, dispatch])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <LoginPageContainer>
      <LeftContent>
        <Title>
          Iniciar sesión
        </Title>
        <FormContainer>
          { errorUser && <Error message={errorUser} />}
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
              />
            </FormGroup>
            <FormGroup>
              {!loadingUser ? (
                <Button>
                  Entrar
                </Button>
              ) : (
                <Loader/>
              )}
            </FormGroup>
            <FormGroup>
              Aún no tienes una cuenta creada? {' '}
              <Link to='/registrarse'>
                Registrate aqui
              </Link>
            </FormGroup>
          </Form>
        </FormContainer>
      </LeftContent>
      <RightContent>
        
      </RightContent>
    </LoginPageContainer>
  )
}


export default LoginPage
