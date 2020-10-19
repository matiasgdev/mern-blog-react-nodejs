import React from 'react'
import Navigator from './components/Navigator'
import HomePage from './pages/HomePage'
import CommunityPage from './pages/CommunityPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import NewPostPage from './pages/NewPostPage'
import PostDetailPage from './pages/PostDetailPage'
import ErrorPage from './pages/ErrorPage'
import { Route } from 'wouter'


function App() {
  return ( 
  <>
    <Navigator />
    <Route path="/" component={HomePage} />
    <Route exact path="/comunidad/:page?" component={CommunityPage}  />
    <Route path="/registrarse" component={RegisterPage} />
    <Route path="/iniciar-sesion" component={LoginPage} />
    <Route path="/new/post" component={NewPostPage} />
    <Route path="/publicacion/:slug" component={PostDetailPage} />
    <Route path="/404" component={ErrorPage} />
  </> 
  )
}
export default App