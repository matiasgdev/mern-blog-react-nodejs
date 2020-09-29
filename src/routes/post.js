import { Router } from 'express'
import { create, list, detail, update, remove } from '../controller/post.controller.js'
import { findPostById } from '../middlewares/findPostById'
import { verifyToken } from '../middlewares/verifyToken'
import { isAdmin } from '../middlewares/checkIsAdmin'

const router = Router()


router.get('/', list)
router.get('/:id', findPostById, detail)

// crear post
router.post('/', verifyToken, isAdmin,  create)
// actualizar post
router.put('/:id', verifyToken, isAdmin,  findPostById, update)
// borrar post
router.delete('/:id', verifyToken, isAdmin, findPostById, remove)


export default router