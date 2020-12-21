import config from '../config'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import ash from 'express-async-handler'

export const verifyToken = ash(async (req, res, next) => {
  
  if( 
    req.headers['authorization'] &&
    req.headers['authorization'].startsWith('Bearer ')
  ){
    const token = req.headers["authorization"].split(' ').pop()
    const decoded = jwt.verify(token, config.SECRET_KEY)
    
    const user = await User.findOne({ _id: decoded.id}, { password: 0})
    
    if (!user) {
      res.status(401)
      throw new Error('Usuario no encontrado. Intente iniciando sesión')
    }

    res.user = user
    next()

  } else {
    res.status(401)
    throw new Error('Debes proveer un token')
  }
})




