import { Schema, model } from 'mongoose'

const commentSchema = new schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true,
  versionKey: false
})


export default model('Comment', commentSchema)