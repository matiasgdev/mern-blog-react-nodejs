import React, { useState } from 'react'
import { Link } from 'wouter'
import { useLoginUser } from '../../hooks/useLoginUser'

import Error from '../../components/Error'
import MiniLoader from '../../components/MiniLoader'
import Headers from '../../components/Header'
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

  const {
    loading,
    error,
    requestLogin
  } = useLoginUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    requestLogin({email, password})
  }

  return (
    <LoginPageContainer>
      <Headers
          title='Iniciar sesión en Bloggy'
      />
      <LeftContent>
        <Title>
          Iniciar sesión
        </Title>
        <FormContainer>
          {error && <Error message={error} />}
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
              {!loading ? (
                <Button>
                  Entrar
                </Button>
              ) : (
                <MiniLoader />
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
