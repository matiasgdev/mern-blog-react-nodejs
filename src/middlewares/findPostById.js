import Post from '../models/Post'
import ash from 'express-async-handler'

export const findPostById = ash(async (req, res, next) => {

  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404)
    throw new Error('Ingrese un ID válido')
  }

  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404)
    throw new Error(`No se encontro post con el ID ${req.params.id}`)
  }
  
  res.post = post
  next()
})