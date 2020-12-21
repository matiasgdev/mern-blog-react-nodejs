import mongoose from 'mongoose'
import app from '../index'

require('dotenv').config()
const DB_URI = process.env.DB || 'mongodb://localhost/blog-react-node'
const port = process.env.PORT || 4000

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log('server running on port ' + port)
    })
  })
  .catch(err => {
    console.error(err)
  })

export default mongoose