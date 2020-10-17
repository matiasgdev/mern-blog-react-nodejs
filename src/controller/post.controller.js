import Post from '../models/Post'
import User from '../models/User'
import ash from 'express-async-handler'
import cloudinary from 'cloudinary'

export const create = ash(async (req, res) => {
  if (req.body.title === '') {
    res.status(400)
    throw new Error("Se requiere un título")
  }

  if (req.body.description === '') {
    res.status(400)
    throw new Error("Se requiere una descripción")
  }
  
  if (req.body.content === '') {
    res.status(400)
    throw new Error("Se requiere un contenido")
  }

  if(!req.file) {
    res.status(400)
    throw new Error("Se requiere al menos una imagen")
  }

  const { title, description, content, category } = req.body
  const isTitleUnique = await Post.findOne({ title })

  if (isTitleUnique) {
    res.status(400)
    throw new Error('Ya existe un post con ese titulo')
  }

  const image = await cloudinary.v2.uploader.upload(req.file.path)
  const post =  new Post({title, description, content, category, imagePath: image.url })

  const userData = await User.findOne({ _id: res.user._id })
  post.user = userData._id

  const newPost = await post.save()
  return res.status(201).json(newPost)
  
})

export const list = async (req, res) => {
  const pageLimit = 5
  const page = Number(req.query.page) || 1

  try {
    const count = await Post.countDocuments()
    const posts = await Post.find().populate('user', 'username')
      .limit(pageLimit)
      .skip(pageLimit * (page - 1))
    return res.json({ count, posts: posts, page, pages: Math.ceil(count / pageLimit) })
  } catch(err) {
    res.status(500).json({ message: 'Ocurrio un error, intente luego', error: err.message })
  }
}
// export const detail = async (req, res) => {
//   res.json({ post: res.post })
// }

export const detailBySlug = ash(async (req, res) => {
  const detailOfPost = await Post.findOne({ slug: req.params.slug }).populate('user', 'username')

  if (!detailOfPost) {
    res.status(400)
    throw new Error(`No existe el post ${req.params.slug}`)
  }
  res.json(detailOfPost)
})


export const update = ash(async (req, res) => {
  let isSomethingToModify = 0

  Object.keys(req.body).map(key => {
    if (req.body[key] !== '') {
      res.post[key] = req.body[key]
      isSomethingToModify++
    }
  })
  if (isSomethingToModify === 0) {
    throw new Error("No existen datos para modificar")
  }
  const updatedPost = await res.post.save()
  res.json(updatedPost)
  
})


export const updateLikesOfPost = ash(async (req, res) => {

  if (req.query.like === 'add') {
    res.post.likes = res.post.likes + 1
    const updatedPost = await res.post.save()
    res.json(updatedPost)
  } else if (req.query.like === 'decrement') {
    res.post.likes = res.post.likes - 1
    const updatedPost = await res.post.save()
    res.json(updatedPost)
  } else {
    res.status(400)
    throw new Error('Error al actualizar el post')
  }

})

export const

export const remove = ash(async (req, res) => { 
  await res.post.remove()
  res.status(204)
})





