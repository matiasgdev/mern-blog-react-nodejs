import { model, Schema } from 'mongoose'
import slug from 'mongoose-slug-generator'


const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: false
})


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
  },
  imagePath: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [likeSchema]
}, {
  timestamps: true, // 
  versionKey: false
})


export default model('Post', schema.plugin(slug))