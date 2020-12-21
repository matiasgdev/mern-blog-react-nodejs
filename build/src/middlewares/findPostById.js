"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPostById = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var findPostById = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var id, post;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id ? req.params.id : req.params.postId;

            if (id.match(/^[0-9a-fA-F]{24}$/)) {
              _context.next = 4;
              break;
            }

            res.status(404);
            throw new Error('Ingrese un ID válido');

          case 4:
            _context.next = 6;
            return _Post["default"].findById(id);

          case 6:
            post = _context.sent;

            if (post) {
              _context.next = 10;
              break;
            }

            res.status(404);
            throw new Error("No se encontro post con el ID ".concat(id));

          case 10:
            res.post = post;
            res.pepito = 'pepito';
            next();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.findPostById = findPostById;