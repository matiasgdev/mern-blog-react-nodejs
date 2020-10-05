import Post from '../models/Post'
import cloudinary from 'cloudinary'

export const create = async (req, res) => {

  if (req.body.title === '') {
    return res.status(400).json({ message: 'Se requiere un titulo', field: "title", error: true })
  }
  if (req.body.description === '') {
    return res.status(400).json({ message: 'Se requiere una descripcion ', field: "description", error: true })
  }
  if (req.body.content === '') {
    return res.status(400).json({ message: 'Se requiere un contenido', field: "content", error: true })
  }

  if(!req.file) {
    return res.status(400).json({ message: 'Se requiere una imagen', field: "imagePath", error: true })
  }

  const { title, description, content, category } = req.body

  try {
    const isTitleUnique = await Post.findOne({ title })
    if (isTitleUnique) {
      return res.status(400).json({ message: 'Ya existe un post con ese titulo', field: 'title', error: true })
    }
    const image = await cloudinary.v2.uploader.upload(req.file.path)
    const post =  new Post({title, description, content, category, imagePath: image.url })

    const newPost = await post.save()
    return res.status(201).json({
      message: 'Post creado correctamente',
      status: 201,
      error: false, 
      data: newPost
    })
    
  } catch(err) {
    return res.status(500).json({ message: 'Hubo un error al crear el post', error: err.message, status: 500 })
  }
  
}

export const list = async (req, res) => {
  try {
    const posts = await Post.find()
    return res.json({ count: posts.length, posts: posts })
  } catch(err) {
    res.status(500).json({ message: 'Ocurrio un error, intente luego', error: err.message })
  }
}


export const detail = async (req, res) => {
  res.json({ post: res.post })
}


export const update = async (req, res) => { 
  if (!req.body) {
    return res.status(400).json({ message: 'Ingrese algun dato para actualizar el post' })
  }

  Object.keys(req.body).map(key => {
    if (req.body[key] != '') {
      res.post[key] = req.body[key]
    }
  })

  try {
    const updatedPost = await res.post.save()
    res.json({message: 'Post actualizado correctamente', post: updatedPost })

  } catch(err) {
    res.status(400).json({ message: 'Ocurrio un error', error: err.message })
  }

}

export const remove = async (req, res) => { 
  try {
    await res.post.remove()
    res.json({message: 'Post eliminado correctamente'})

  } catch(err) {
    res.status(500).json({ message: 'Ocurrio un error', error: err.message })
  }

}





