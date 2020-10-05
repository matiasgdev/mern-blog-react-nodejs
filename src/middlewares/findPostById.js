import Post from '../models/Post'

export const findPostById = async (req, res, next) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      let error = new Error('Ingrese un ID válido para el encontrar el post')
      error.status = 404
      throw error
    }
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'No se encontro post con el ID ' + req.params.id })
    }
  } catch(err) {
    return res.status(err.status || 500).json({ message: 'Ocurrio un error', error: err.message })
  }

  res.post = post
  next()
  
}