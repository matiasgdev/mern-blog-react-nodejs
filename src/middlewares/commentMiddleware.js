import Comment from '../models/Comment'
import Post from '../models/Post'
import ash from 'express-async-handler'

export const createComment = ash(async (req, res, next) => {
  const userId = res.user._id
  const postId = res.post._id

  let content
  if (!req.body.comment || req.body.comment === '') {
    res.status(400)
    throw new Error('No hay ningun comentario para ingresar')
  } else {
    content = req.body.comment
  }
  const comment = new Comment({ user: userId, post: postId, content })
  const commentSuccess = await comment.save()
  res.comment = commentSuccess

  next()
})

export const isOwnerOfComment = ash(async (req, res, next) => {
  const userId = res.user._id
  const post = res.post

  const commentId = req.params.commentId
  
  const comment = await Comment.findOne({_id: commentId })
  if (!comment) {
    res.status(400)
    throw new Error('Comentario no encontrado')
  }
  
  // verify is owner of post or owner of comment
  const commentOwner = comment.user.toString() === userId.toString()
  const postOwner = post.user.toString() === userId.toString()

  if (commentOwner || postOwner) {
    next()
  } else {
    res.status(403)
    throw new Error('No tienes permisos para borrar el comentario')
  }

})