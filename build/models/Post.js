"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

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
  }
}, {
  timestamps: true,
  // 
  versionKey: false
});

var _default = (0, _mongoose.model)('Post', schema);

exports["default"] = _default;