require('dotenv').config()
import mongoose from 'mongoose'
import app from './index'

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
// ok
.then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log('server running on port ' + process.env.SERVER_PORT)
  })
})
// error
.catch(err => {
  console.error(err)
})

export default mongoose