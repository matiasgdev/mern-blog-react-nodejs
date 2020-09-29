import config from '../config'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]
    if (!token) return res.status(403).json({ message: 'Se requiere un token. Intente iniciando sesión' })

    const decoded = jwt.verify(token, config.SECRET_KEY)
    const user = await User.findOne({ _id: decoded.id}, { password: 0})
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado. Intente iniciando sesión'})

    res.user = user

    next()

  } catch(err) {
    return res.status(401).json({ message: 'La sesión expiro o el token no existe.'})
  }

}




