import User from '../models/User'
import ash from 'express-async-handler'

export default ash(async (req, res, next) => {
  const emailDuplicated = await User.findOne({email: req.body.email}, 'email')
  
  if (emailDuplicated) {
    res.status(400)
    throw new Error("Ya existe el usuario con ese email")
  } 
  
  const usernameDuplicated = await User.findOne({username: req.body.username}, 'username')
  if (usernameDuplicated) { 
    res.status(400)
    throw new Error("Ya existe el usuario con ese nick")
  }
  next()
})