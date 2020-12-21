"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongooseSlugGenerator = _interopRequireDefault(require("mongoose-slug-generator"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _jsdom = require("jsdom");

var _marked = _interopRequireDefault(require("marked"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var window = new _jsdom.JSDOM('').window;
var DOMPurify = (0, _dompurify["default"])(window);
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
  markedHtml: {
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
  versionKey: false
});
schema.pre('validate', function (next) {
  if (this.content) {
    this.markedHtml = DOMPurify.sanitize((0, _marked["default"])(this.content), {
      USE_PROFILES: {
        html: true
      }
    });
  }

  next();
});

var _default = (0, _mongoose.model)('Post', schema.plugin(_mongooseSlugGenerator["default"]));

exports["default"] = _default;