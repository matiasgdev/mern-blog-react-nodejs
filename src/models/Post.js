import { model, Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  category: {
    type: String
  }
}, {
  timestamps: true, // 
  versionKey: false
})

export default model('Post', schema)