import Role from '../models/Role'

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) {
      return
    }
    
    await Promise.all([
      new Role({name: 'user'}).save(),
      new Role({name: 'moderator'}).save(),
      new Role({name: 'admin'}).save()
    ])

  } catch(err) {
    console.log(err)
  }

}