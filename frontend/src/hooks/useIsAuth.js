import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'wouter'

export const useIsAuth = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [, navigate] = useLocation()

  useEffect(() => {
    if (!userInfo) {
      navigate('/iniciar-sesion')
    }
  }, [userInfo, navigate])

  return { loading, error, userInfo }
}

