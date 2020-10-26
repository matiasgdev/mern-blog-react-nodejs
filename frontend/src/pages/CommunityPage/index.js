import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'wouter'
import { getPosts } from '../../actions/postsActions'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import Post from '../../components/Post'
import Pagination from '../../components/Pagination'

import {
  Community,
  CommunityContainer,
  ListPostContainer,
  Header,
  Title,
  Subtitle,
  CreatePostItem
} from './elements'



export default function CommunityPage({ params }) {
  const pageInfo = params.page ? Number(params.page) : 1
  const [_, pushLocation]  = useLocation()

  const dispatch = useDispatch()
  const { error, loading, data = {} } = useSelector(state => state.posts)

  const { userInfo } = useSelector(state => state.userLogin)

  const { posts = [], page, pages } = data

  useEffect(function() {
    if (!pageInfo || pageInfo < 0) {
      pushLocation('/comunidad/1')
    } else {
      dispatch(getPosts({page: pageInfo }))
    }
  }, [pushLocation, pageInfo])
  
  return (
    <Community>
      {loading ? (
          <Loader /> 
        ) : 
        error ? (
          error
        ) : (
        <CommunityContainer>
          <Header>
            <Title>Últimas entradas de la comunidad</Title>
            <Subtitle>Lee los mejores articulos</Subtitle>
            {userInfo &&
              <>
                Aporta a la comunidad, {' '}
                <CreatePostItem to="/nueva/publicacion">
                  crea tu propia publicación
                </CreatePostItem>
              </>
            }
          </Header>
              <ListPostContainer>
                {posts.length === 0 ? ('No hay posts aun') : (
                  <> 
                    {posts.map(post => (
                      <Post key={post._id} {...post} />
                    ))}
                    <Pagination pages={pages} page={page}/>
                  </>
                )}
              </ListPostContainer>
        </CommunityContainer>
        )
      }
    </Community>
  )
}
