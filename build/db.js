"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

_mongoose["default"].connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  _index["default"].listen(process.env.SERVER_PORT, function () {
    console.log('server running on port ' + process.env.SERVER_PORT);
  });
})["catch"](function (err) {
  console.error(err);
});

var _default = _mongoose["default"];
exports["default"] = _default;