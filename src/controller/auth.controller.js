import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate('roles')

    if (!user) {
      return res.status(404).json({ message: 'No existe el usuario'})
    }
    
    const passwordIsTrue = await user.validatePassword(req.body.password)
    if (!passwordIsTrue) {
      return res.status(401).json({ message: 'La contraseña no coincide' })
    }

    const token = jwt.sign({ id: user._id }, config.SECRET_KEY , {
      expiresIn: 86400 // one day
    })
    
    return res.json({ message: 'Ha iniciado sesion', user: {
      user: user,
      token
    }})
  } catch(err) { 
    res.status(500).json({ message: 'Ocurrio un error. Intente luego' })
  }

}

export const create = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Ingrese los datos necesarios para crear el usuario"})
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

  try {
    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, config.SECRET_KEY , {
      expiresIn: 86400 // one day
    })

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: savedUser,
      token
    })

  } catch(err) {
    res.status(500).json({ message: "Hubo un error al crear el usuario", error: err.message})
  }

}