import { Router } from 'express'
import {create, login } from '../controller/auth.controller.js'
import checkDuplicatedUser from '../middlewares/checkDuplicatedUser'

const router = Router()

// create
router.post('/signup', checkDuplicatedUser, create)
// login 
router.post('/login', login)

export default router