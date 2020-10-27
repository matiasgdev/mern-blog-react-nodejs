import Post from '../models/Post'
import User from '../models/User'
import Comment from '../models/Comment'
import ash from 'express-async-handler'
import dotenv from 'dotenv'

dotenv.config()

// create new post
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

  const serverPath = `http://localhost:${process.env.SERVER_PORT}/`
  const filePath = req.file.path.replace('public', 'files')

  const post =  new Post({
    title,
    description,
    content,
    category,
    imagePath: serverPath + filePath
  })

  const userData = await User.findOne({ _id: res.user._id })
  post.user = userData._id

  const newPost = await post.save()
  return res.status(201).json(newPost)
  
})

// list posts
export const list = ash(async (req, res) => {
  const pageLimit = 5
  const page = Number(req.query.page) || 1

  const count = await Post.countDocuments()
  
  const posts = await Post.find()
    .populate([
      {
        path: 'user',
        select: 'username'
      },
      {
        path: 'comments'
      }
    ])
    .limit(pageLimit)
    .skip(pageLimit * (page - 1))

  return res.json({ 
    count,
    posts,
    page,
    pages: Math.ceil(count / pageLimit)
  })
})

// export const detail = async (req, res) => {
//   res.json({ post: res.post })
// }

// detail posd by slug
export const detailBySlug = ash(async (req, res) => {
  const detailOfPost = await Post.findOne({ slug: req.params.slug })
    .populate('user', 'username').populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'username'
      }
    })

  if (!detailOfPost) {    
    res.status(400)
    throw new Error(`No existe el post ${req.params.slug}`)
  }
  res.json(detailOfPost)
})

// update post
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

// update likes 
export const updateLikesOfPost = ash(async (req, res) => {
  const post = res.post
  const user = res.user

  const isAlreadyLike = post.likes.find((like) => {
    return like.user.toHexString() === user._id.toHexString()
  })

  if (isAlreadyLike) {
    post.likes = post.likes.filter((like) => {
      return like.user.toHexString() !== user._id.toHexString()
    })

    const updatedPost = await post.save()
    const numOfLikes = updatedPost.likes.length

    res.status(201).json({message: 'removed', num: numOfLikes })

  } else {
    const like = {
      user: user._id
    }
    post.likes.push(like)

    const updatedPost = await post.save()
    const numOfLikes = updatedPost.likes.length
    
    res.status(201).json({message: 'added', num: numOfLikes })
  }

})

// add comment
export const addCommentToPost = ash(async (req, res) => {
  res.post.comments.push(res.comment._id)
  await res.post.save()

  await Post.findOne({_id: res.post._id})

  res.json({message: 'Se envió el comentario correctamente'})
})


// delete comment 
export const deleteComment = ash(async (req, res) => {

  const isDeleted = await Post.findOneAndUpdate(
    { _id: req.params.postId },
    { $pull: { comments: req.params.commentId}},
    { new: true }
  )

  await Comment.findOneAndDelete({ _id: req.params.commentId })

  res.json(isDeleted)
})


export const remove = ash(async (req, res) => { 
  await res.post.remove()
  res.json({message: `Publicacion ${res.post._id} eliminada correctamente`})
})





