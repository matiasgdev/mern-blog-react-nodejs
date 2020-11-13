"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var DB_URI = process.env.DB || 'mongodb://localhost:27017/blog-react-node';
var port = process.env.PORT || 4000;

_mongoose["default"].connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  _index["default"].listen(port, function () {
    console.log('server running on port ' + process.env.PORT);
  });
})["catch"](function (err) {
  console.error(err);
});

var _default = _mongoose["default"];
exports["default"] = _default;