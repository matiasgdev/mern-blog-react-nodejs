import Post from '../models/Post'

export const findPostById = async (req, res, next) => {

  let post

  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: 'Ingrese un ID válido'})
  }

  try {
    post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'No se encontro post con el ID ' + req.params.id })
    }
  } catch(err) {
    res.status(500).json({ message: 'Ocurrio un error', error: err.message })
  }

  res.post = post
  next()
  
}