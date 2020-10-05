import User from '../models/User'

export default async (req, res, next) => {
  try {
    const emailDuplicated = await User.findOne({email: req.body.email}, 'email')
    if (emailDuplicated) {
      return res.status(400).json({
        message: 'Ya existe el usuario con ese email',
        field: 'email',
        error: true
      })
    }
    
    const usernameDuplicated = await User.findOne({username: req.body.username}, 'username')
    if (usernameDuplicated) { 
      return res.status(400).json({
        message: 'Ya existe el usuario con ese username',
        field: 'username',
        error: true
      }) 
    }

  } catch(err) {
      return res.status(500).json({ message: 'Ocurrio un error', error: err.message })
  }
  next()
}