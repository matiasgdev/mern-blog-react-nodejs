"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer '))) {
              _context.next = 13;
              break;
            }

            token = req.headers["authorization"].split(' ').pop();
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET_KEY);
            _context.next = 5;
            return _User["default"].findOne({
              _id: decoded.id
            }, {
              password: 0
            });

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            res.status(401);
            throw new Error('Usuario no encontrado. Intente iniciando sesión');

          case 9:
            res.user = user;
            next();
            _context.next = 15;
            break;

          case 13:
            res.status(401);
            throw new Error('Debes proveer un token');

          case 15:
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
exports.verifyToken = verifyToken;