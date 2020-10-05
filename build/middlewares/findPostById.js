"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPostById = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var findPostById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var post;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'Ingrese un ID válido'
            }));

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _Post["default"].findById(req.params.id);

          case 5:
            post = _context.sent;

            if (post) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'No se encontro post con el ID ' + req.params.id
            }));

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            res.status(500).json({
              message: 'Ocurrio un error',
              error: _context.t0.message
            });

          case 13:
            res.post = post;
            next();

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function findPostById(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.findPostById = findPostById;