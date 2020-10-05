import React from 'react'
import ListPostsPage from './pages/ListPostsPage'
import NewPostPage from './pages/NewPostPage'
import ErrorPage from './pages/ErrorPage'
import RegisterPage from './pages/RegisterPage'
import { UserProvider }  from './context/UserContext'
import { Route, Link } from 'wouter'

function App() {
  return ( 
  <UserProvider>
    <header>
      <h1>Welcome!</h1>
      <ul>
        <li>
          <Link to="/posts"> Posts </Link>
        </li>
        <li>
          <Link to="/new/post"> Crear Post </Link>
        </li>
        <li>
          <Link to="/register"> Registrarse </Link>
        </li>
      </ul>
    </header>
    <Route
      path="/posts"
      component={ListPostsPage}
    />
    <Route
      path="/new/post"
      component={NewPostPage}
    />
    <Route
      path="/404"
      component={ErrorPage}
    />
    <Route
      path="/register"
      component={RegisterPage}
    />
  </UserProvider> 
  )
}
export default App
