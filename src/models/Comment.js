import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
},{
  timestamps: true,
  versionKey: false
})



export default model('Comment', commentSchema)