import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'
import ash from 'express-async-handler'

export const login = ash(async (req, res) => {
  if (req.body.email === '') {
    res.status(400)
    throw new Error('Se requiere un email')
  }
  if (req.body.password === '') {
    res.status(400)
    throw new Error('Debes ingresar una contraseña')
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    res.status(404)
    throw new Error('El usuario no existe')
  }

  const passwordIsTrue = await user.validatePassword(req.body.password)
  if (!passwordIsTrue) {
    return res.status(401).json({ message: 'La contraseña no coincide' })
  }
  
  const token = jwt.sign({ id: user._id }, config.SECRET_KEY , {
    expiresIn: "24h" // one day
  })
  
  return res.json({ 
    message: 'Ha iniciado sesion', 
    data: { user, token}
  })
  
})


export const create = ash(async (nextData, req, res, next) => {
  if (req.body.email === '') {
    res.status(400)
    throw new Error('Se requiere un email')
  }
  if (req.body.username === '') {
    res.status(400)
    throw new Error('Ingresa un nombre de usuario')
  }
  if (req.body.password === '') {
    res.status(400)
    throw new Error('Debes ingresar una contraseña')
  }
  
  const { email, password, username, roles } = req.body

  const newUser = new User({ email, password, username })
  
  if (roles) {
    const foundRole = await Role.find({ name: { $in: roles }})
    if (foundRole.length <= 0) {
      const role = await Role.findOne({ name: "user"})
      newUser.roles = [role._id]
    } else {
      newUser.roles = foundRole.map(role => role._id)
    }
  } else {
    const role = await Role.findOne({ name: "user"})
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save()

  const token = jwt.sign({ id: savedUser._id }, config.SECRET_KEY , {
    expiresIn: 86400 // one day 
  })

  res.status(201).json({
    user: {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    },
    token
  })
})