import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { isAdmin } from '../middlewares/checkIsAdmin'
import { findPostById } from '../middlewares/findPostById'
import { createComment, isOwnerOfComment } from '../middlewares/commentMiddleware'
import {isOwner} from '../middlewares/postMiddleware'
import uploadFile from '../middlewares/uploadFile'

import { 
  create,
  list,
  detail, 
  update, 
  remove,
  detailBySlug,
  updateLikesOfPost,
  addCommentToPost,
  deleteComment,
  listPopular
} from '../controller/post.controller.js'

const router = Router()

// list posts
router.get('/', list)

// list popular post
router.get('/popular', listPopular)

// router.get('/find/:id', findPostById, detail)
router.get('/:slug', detailBySlug)

// create post
router.post('/', verifyToken, uploadFile.single('post_image'), create)
// router.post('/', uploadFile.single('post_image'), create)
  
// update post
router.put('/:id', verifyToken, findPostById, isOwner, update)

// update likes post
router.put('/like/:id', verifyToken, findPostById, updateLikesOfPost)

// add comment
router.put('/comment/:id', verifyToken, findPostById, createComment, addCommentToPost)

// delete comment
router.delete('/comment/:postId/:commentId', verifyToken, findPostById, isOwnerOfComment, deleteComment)

// delete post
router.delete('/:id', verifyToken, findPostById, remove)


export default router