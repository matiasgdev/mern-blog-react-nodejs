import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String
}, {
  versionKey: false
})

export default model('Role', schema)