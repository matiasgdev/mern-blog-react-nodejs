"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var commentSchema = new _mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Comment', commentSchema);

exports["default"] = _default;