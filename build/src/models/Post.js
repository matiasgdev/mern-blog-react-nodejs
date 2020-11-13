"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongooseSlugGenerator = _interopRequireDefault(require("mongoose-slug-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var likeSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: false
});
var schema = new _mongoose.Schema({
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
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [likeSchema]
}, {
  timestamps: true,
  // 
  versionKey: false
});

var _default = (0, _mongoose.model)('Post', schema.plugin(_mongooseSlugGenerator["default"]));

exports["default"] = _default;