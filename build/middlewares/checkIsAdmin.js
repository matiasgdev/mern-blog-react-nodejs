"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isAdmin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var roles, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].find({
              _id: {
                $in: res.user.roles
              }
            });

          case 3:
            roles = _context.sent;
            i = 0;

          case 5:
            if (!(i < roles.length)) {
              _context.next = 12;
              break;
            }

            if (!(roles[i].name === "admin")) {
              _context.next = 9;
              break;
            }

            next();
            return _context.abrupt("return");

          case 9:
            i++;
            _context.next = 5;
            break;

          case 12:
            return _context.abrupt("return", res.status(403).json({
              message: 'Requieres rol de administrador'
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Ocurrio un error',
              error: _context.t0.message
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;