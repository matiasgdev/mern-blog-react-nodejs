import Post from '../models/Post'

export const create = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ message: 'Ingrese los datos para crear el post' })
  }
  const { title, description, content, category } = req.body

  try {
    const post =  new Post({title, description, content, category })
    const newPost = await post.save()
    return res.status(201).json({ 
      message: 'Post creado correctamente',
      post: { data: newPost }
    })
  } catch(err) {
    return res.status(500).json({ message: 'Hubo un error al crear el post', error: err.message })
  }
  
}

export const list = async (req, res) => {
  try {
    const posts = await Post.find()
    return res.json({ count: posts.length, data: posts })
  } catch(err) {
    res.status(500).json({ message: 'Ocurrio un error, intente luego', error: err.message })
  }
}


export const detail = async (req, res) => {
  res.json({ data: res.post })
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





