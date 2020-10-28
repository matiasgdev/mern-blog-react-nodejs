import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'wouter'
import { getPosts, getPopularPosts } from '../../actions/postsActions'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import Post from '../../components/Post'
import Pagination from '../../components/Pagination'

import {
  Community,
  CommunityContainer,
  PostsWrapper,
  LeftContent,
  RightContent,
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

  const {
    error: errorPopular,
    loading: loadingPopular,
    popular
  } = useSelector(state => state.postsPopular)

  const { userInfo } = useSelector(state => state.userLogin)

  const { posts = [], page, pages } = data

  useEffect(function() {
    if (!pageInfo || pageInfo < 0) {
      pushLocation('/comunidad/1')
    } else {
      dispatch(getPosts({page: pageInfo }))
    }
  }, [pushLocation, pageInfo])

  // get popular posts
  useEffect(function() {
    dispatch(getPopularPosts())
  }, [])
  
  return (
    <Community>
        <CommunityContainer>
          <PostsWrapper>
            <LeftContent>
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
                {loading ? (
                  <Loader /> 
                ) : 
                error ? (
                  error
                ) : (
                  <>
                  {posts && posts.length === 0 ? ('No hay posts aun') : (
                    <> 
                      {posts.map(post => (
                        <Post key={post._id} {...post} />
                      ))}
                      <Pagination pages={pages} page={page}/>
                    </>
                  )}
                  </>
                )}
                </ListPostContainer>
            </LeftContent>
            <RightContent>
              <Header>
                <Title right>
                  Populares
                </Title>
                <Subtitle right>
                  Observa lo que a la comunidad más le gusta!
                </Subtitle>
              </Header>
              <ListPostContainer>
                {loadingPopular ? (
                  <Loader /> 
                ) : 
                errorPopular ? (
                  errorPopular
                ) : (
                  <>
                  {popular && popular.length === 0 ? ('No hay post populares') : (
                    <> 
                      {popular.map(popularItem => (
                        <Post
                          key={popularItem._id}
                          title={popularItem.title}
                          likes={popularItem.likes}
                          user={popularItem.user}
                          slug={popularItem.slug}
                          popular={true}
                        />
                      ))}
                    </>
                  )}
                  </>
                )}
                </ListPostContainer>
            </RightContent>
          </PostsWrapper>
        </CommunityContainer>
    </Community>
  )
}
