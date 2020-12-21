import { Router } from 'express'
import { create, login, getUsers} from '../controller/auth.controller.js'
import checkDuplicatedUser from '../middlewares/checkDuplicatedUser'

const router = Router()

// create
router.post('/signup', checkDuplicatedUser, create)
// login 
router.post('/login', login)

export default router