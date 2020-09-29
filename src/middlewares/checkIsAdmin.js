import Role from '../models/Role'

export const isAdmin = async (req, res, next) => {

  try {
    const roles = await Role.find({_id: { $in: res.user.roles }})
    
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next()
        return
      }
    }
  
    return res.status(403).json({ message: 'Requieres rol de administrador'})

  } catch(err) {
    res.status(500).json({ message: 'Ocurrio un error', error: err.message })
  }
  
}