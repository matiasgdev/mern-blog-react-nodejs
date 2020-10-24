import express from 'express'
const app = express()
import cors from 'cors'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
import auth from './routes/auth'
import post from './routes/post'
import { errorHandler, notFound } from './middlewares/errorMiddleware'

cloudinary.config({
  cloud_name: 'matiasgdev',
  api_key: '492784665818165',
  api_secret: 'mc6A2z7f71vMbODsvkKCDfRR-gY'
})



import { createRoles } from './libs/setup'

createRoles()

import './db'

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public/images'))
app.use(express.json())


app.use('/api/auth', auth)
app.use('/api/post', post)

app.use(notFound)
app.use(errorHandler)

export default app