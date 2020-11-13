"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var imageRoute = '';

if (process.env.NODE_ENV === 'production') {
  imageRoute = 'https://blog-mern-stack-matiasgdev.herokuapp.com/';
}

var manageStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function filename(req, file, cb) {
    var fileName = (0, _nanoid.nanoid)(5) + _path["default"].extname(file.originalname);

    cb(null, fileName);
  }
});

var onlyImagesFilter = function onlyImagesFilter(file, cb) {
  var fileType = /jpg|png|jpeg/;
  var mimetype = fileType.test(_path["default"].extname(file.originalname).toLowerCase());
  var extname = fileType.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imagenes'));
  }
};

var upload = (0, _multer["default"])({
  storage: manageStorage,
  fileFilter: function fileFilter(_, file, cb) {
    onlyImagesFilter(file, cb);
  }
});
var _default = upload;
exports["default"] = _default;