import Role from '../models/Role'
import ash from 'express-async-handler'

export const isAdmin = ash(async (req, res, next) => {

  const roles = await Role.find({_id: { $in: res.user.roles }})

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next()
      return
    }
  }
  res.status(403)
  throw new Error('Requieres ser administrador')

})