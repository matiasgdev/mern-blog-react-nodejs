import ash from 'express-async-handler'

export const isOwner = ash(async (req, res, next) => {
  
  if (res.user._id.toString() !== res.post.user.toString()) {
    res.status(403)
    throw new Error('No tienes permisos para actualizar este post')
  } else {
    next()
  }

})