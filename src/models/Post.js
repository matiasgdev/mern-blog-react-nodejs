import { model, Schema } from 'mongoose'
import slug from 'mongoose-slug-generator';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import marked from 'marked';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);


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
  markedHtml: {
    type: String,
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
  timestamps: true,
  versionKey: false
})

schema.pre('validate', function(next) {
  if (this.content) {
    this.markedHtml = DOMPurify.sanitize(marked(this.content), { USE_PROFILES: { html: true }});
  }
  next();
});


export default model('Post', schema.plugin(slug))