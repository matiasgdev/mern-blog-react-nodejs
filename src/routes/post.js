import { Router } from 'express'
import { create, list, detail, update, remove } from '../controller/post.controller.js'
import { findPostById } from '../middlewares/findPostById'
import { verifyToken } from '../middlewares/verifyToken'
import { isAdmin } from '../middlewares/checkIsAdmin'
import uploadFile from '../middlewares/uploadFile'

const router = Router()

// list posts
router.get('/', list)
router.get('/:id', findPostById, detail)

// create post
// router.post('/', verifyToken, isAdmin, uploadFile.single('post_image'), create)
router.post('/', uploadFile.single('post_image'), create)
  
// update post
router.put('/:id', verifyToken, isAdmin,  findPostById, update)

// delete post
router.delete('/:id', verifyToken, isAdmin, findPostById, remove)


export default router