import '@babel/polyfill'
import express from 'express'
import cors from 'cors'
import auth from './src/routes/auth'
import post from './src/routes/post'
import path from 'path'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './src/middlewares/errorMiddleware'

const app = express()
dotenv.config()

import { createRoles } from './src/libs/setup'

createRoles()

import './src/db'

app.use(cors())
app.use('/files', express.static('public'))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  import morgan from 'morgan'
  app.use(morgan('dev'))
}

app.use('/api/auth', auth)
app.use('/api/post', post)


// if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
// } else {
//   app.get('/', (req, res) => {
//     res.send('API MODE')

//   })
// }



app.use(notFound)
app.use(errorHandler)

export default app