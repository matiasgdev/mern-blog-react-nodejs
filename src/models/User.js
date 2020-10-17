import { model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "Role" 
  }]
}, {
  timestamps: true,
  versionKey: false,
}
)

schema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch(err) {
    return next(err)
  }
})

schema.methods.validatePassword =  function validatePassword(password) {
  return bcrypt.compare(password, this.password)
}

export default model('User', schema)