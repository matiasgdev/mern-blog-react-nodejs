"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _post = _interopRequireDefault(require("./routes/post"));

var _setup = require("./libs/setup");

require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _setup.createRoles)();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use('/api/auth', _auth["default"]);
app.use('/api/post', _post["default"]);
var _default = app;
exports["default"] = _default;