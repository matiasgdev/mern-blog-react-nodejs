import express from 'express'
const app = express()
import cors from 'cors'

import auth from './routes/auth'
import post from './routes/post'

import { createRoles } from './libs/setup'

createRoles()

import './db'

app.use(cors())
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/post', post)

export default app