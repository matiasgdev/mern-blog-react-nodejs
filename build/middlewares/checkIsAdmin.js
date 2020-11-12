"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isAdmin = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var roles, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Role["default"].find({
              _id: {
                $in: res.user.roles
              }
            });

          case 2:
            roles = _context.sent;
            i = 0;

          case 4:
            if (!(i < roles.length)) {
              _context.next = 11;
              break;
            }

            if (!(roles[i].name === "admin")) {
              _context.next = 8;
              break;
            }

            next();
            return _context.abrupt("return");

          case 8:
            i++;
            _context.next = 4;
            break;

          case 11:
            res.status(403);
            throw new Error('Requieres ser administrador');

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
exports.isAdmin = isAdmin;