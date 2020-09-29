"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detail = exports.remove = exports.update = exports.create = exports.login = exports.get = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var get = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].find().select('username email');

          case 3:
            users = _context.sent;
            return _context.abrupt("return", res.json({
              users: users
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: _context.t0.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function get(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.get = get;

var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, passwordIsTrue;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'No existe el usuario'
            }));

          case 6:
            _context2.next = 8;
            return user.validatePassword(req.body.password);

          case 8:
            passwordIsTrue = _context2.sent;

            if (passwordIsTrue) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              message: 'La contraseña no coincide'
            }));

          case 11:
            return _context2.abrupt("return", res.json({
              message: 'Ha iniciado sesion',
              user: {
                username: user.username
              }
            }));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'Ocurrio un error. Intente luego'
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;

var create = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, newUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.body) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Ingrese los datos necesarios para crear el usuario"
            }));

          case 2:
            _context3.prev = 2;
            user = new _User["default"]({
              email: req.body.email,
              password: req.body.password,
              username: req.body.username
            });
            _context3.next = 6;
            return user.save();

          case 6:
            newUser = _context3.sent;
            res.status(201).json({
              message: "Usuario creado correctamente",
              user: {
                username: newUser.username
              }
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            res.status(500).json({
              message: "Hubo un error al crear el usuario",
              error: _context3.t0.message
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 10]]);
  }));

  return function create(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = create;

var update = function update(req, res) {
  res.send('update user ' + req.params.id);
};

exports.update = update;

var remove = function remove(req, res) {
  res.send('delete user ' + req.params.id);
};

exports.remove = remove;

var detail = function detail(req, res) {
  res.send('detail of user ' + req.params.id);
};

exports.detail = detail;