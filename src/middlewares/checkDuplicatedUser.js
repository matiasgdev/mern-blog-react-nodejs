import User from '../models/User'

export default async (req, res, next) => {
  try {
    const usernameDuplicated = await User.findOne({email: req.body.email})
    if (usernameDuplicated) return res.status(400).json({ message: 'Ya existe el usuario con ese email'})

    const emailDuplicated = await User.findOne({username: req.body.username})
    if (emailDuplicated) return res.status(400).json({ message: 'Ya existe el usuario con ese username'})

  } catch(err) {
      res.status(500).json({ message: 'Ocurrio un error', error: err.message })
  }
  next()
}