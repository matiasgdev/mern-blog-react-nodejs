import Post from '../models/Post'
import ash from 'express-async-handler'

export const findPostById = ash(async (req, res, next) => {

  const id = req.params.id ? req.params.id : req.params.postId

  if (!id.match(/^[0-9a-fA-F]{24}$/) ) {
    res.status(404)
    throw new Error('Ingrese un ID válido')
  }

  const post = await Post.findById(id)
  if (!post) {
    res.status(404)
    throw new Error(`No se encontro post con el ID ${id}`)
  }
  
  res.post = post
  next()
})