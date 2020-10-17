import { Router } from 'express'
import { findPostById } from '../middlewares/findPostById'
import { verifyToken } from '../middlewares/verifyToken'
import { isAdmin } from '../middlewares/checkIsAdmin'
import uploadFile from '../middlewares/uploadFile'

import { 
  create,
  list,
  detail, 
  update, 
  remove,
  detailBySlug,
  updateLikesOfPost
} from '../controller/post.controller.js'

const router = Router()

// list posts
router.get('/', list)
// router.get('/:id', findPostById, detail)
router.get('/:slug', detailBySlug)

// create post
router.post('/', verifyToken, isAdmin, uploadFile.single('post_image'), create)
// router.post('/', uploadFile.single('post_image'), create)
  
// update post
router.put('/:id', verifyToken, isAdmin,  findPostById, update)

// handle likes post]
router.put('/like/:id', verifyToken, findPostById, updateLikesOfPost)

// delete post
router.delete('/:id', verifyToken, isAdmin, findPostById, remove)


export default router