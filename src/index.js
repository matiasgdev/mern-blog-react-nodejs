import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import auth from './routes/auth'
import post from './routes/post'
import { errorHandler, notFound } from './middlewares/errorMiddleware'

const app = express()

import { createRoles } from './libs/setup'

createRoles()

import './db'

app.use(cors())
app.use(morgan('dev'))
app.use('/files', express.static('public'))
app.use(express.json())


app.use('/api/auth', auth)
app.use('/api/post', post)

app.use(notFound)
app.use(errorHandler)

export default app