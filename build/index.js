"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _auth = _interopRequireDefault(require("./src/routes/auth"));

var _post = _interopRequireDefault(require("./src/routes/post"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _errorMiddleware = require("./src/middlewares/errorMiddleware");

var _setup = require("./src/libs/setup");

require("./src/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

(0, _setup.createRoles)();
app.use((0, _cors["default"])());
app.use('/files', _express["default"]["static"]('public'));
app.use(_express["default"].json());

if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan["default"])('dev'));
}

app.use('/api/auth', _auth["default"]);
app.use('/api/post', _post["default"]); // if (process.env.NODE_ENV === 'production') {

app.use(_express["default"]["static"](_path["default"].resolve(__dirname, 'frontend', 'build')));
app.use('*', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, 'frontend', 'build', 'index.html'));
}); // } else {
//   app.get('/', (req, res) => {
//     res.send('API MODE')
//   })
// }

app.use(_errorMiddleware.notFound);
app.use(_errorMiddleware.errorHandler);
var _default = app;
exports["default"] = _default;