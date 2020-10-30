import React from 'react'
import Navigator from './components/Navigator'
import HomePage from './pages/HomePage'
import CommunityPage from './pages/CommunityPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PostCreatePage from './pages/PostCreatePage'
import PostDetailPage from './pages/PostDetailPage'
import ErrorPage from './pages/ErrorPage'
import { Route, Switch } from 'wouter'
import PostEditPage from './pages/PostEditPage'


function App() {
  return ( 
  <>
    <Navigator />
    <Switch>
      <Route path="/" component={HomePage} />
      <Route exact path="/comunidad/:page?" component={CommunityPage}  />
      <Route path="/registrarse" component={RegisterPage} />
      <Route path="/iniciar-sesion" component={LoginPage} />

      <Route path="/nueva/publicacion" component={PostCreatePage} />
      <Route path="/editar/publicacion/:slug" component={PostEditPage} />
      <Route path="/publicacion/:slug" component={PostDetailPage} />
      <Route path="/:rest*">
        {({rest}) => {
          return `404 - /${rest} Not Found`
        }}
      </Route>
    </Switch>
  </> 
  )
}
export default App
