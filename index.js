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
app.use(express.json())
app.use('/files', express.static('public'))
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))


app.use('/api/auth', auth)
app.use('/api/post', post)


if (process.env.NODE_ENV === 'production') {
  app.use('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.use("/", (_, res) => {
    res.send("API Working...");
  });
}


app.use(notFound)
app.use(errorHandler)

export default app