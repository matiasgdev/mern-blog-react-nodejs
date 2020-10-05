"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.login = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, passwordIsTrue, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            }).populate('roles');

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'No existe el usuario'
            }));

          case 6:
            _context.next = 8;
            return user.validatePassword(req.body.password);

          case 8:
            passwordIsTrue = _context.sent;

            if (passwordIsTrue) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'La contraseña no coincide'
            }));

          case 11:
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, _config["default"].SECRET_KEY, {
              expiresIn: 86400 // one day

            });
            return _context.abrupt("return", res.json({
              message: 'Ha iniciado sesion',
              user: {
                user: user,
                token: token
              }
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Ocurrio un error. Intente luego'
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var create = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, email, password, username, roles, newUser, foundRole, role, _role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Ingrese los datos necesarios para crear el usuario"
            }));

          case 2:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username, roles = _req$body.roles;
            newUser = new _User["default"]({
              email: email,
              password: password,
              username: username
            });

            if (!roles) {
              _context2.next = 18;
              break;
            }

            _context2.next = 7;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 7:
            foundRole = _context2.sent;

            if (!(foundRole.length <= 0)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 11;
            return _Role["default"].findOne({
              name: "user"
            });

          case 11:
            role = _context2.sent;
            newUser.roles = [role._id];
            _context2.next = 16;
            break;

          case 15:
            newUser.roles = foundRole.map(function (role) {
              return role._id;
            });

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.next = 20;
            return _Role["default"].findOne({
              name: "user"
            });

          case 20:
            _role = _context2.sent;
            newUser.roles = [_role._id];

          case 22:
            _context2.prev = 22;
            _context2.next = 25;
            return newUser.save();

          case 25:
            savedUser = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET_KEY, {
              expiresIn: 86400 // one day

            });
            res.status(201).json({
              message: "Usuario creado correctamente",
              user: savedUser,
              token: token
            });
            _context2.next = 33;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t0 = _context2["catch"](22);
            res.status(500).json({
              message: "Hubo un error al crear el usuario",
              error: _context2.t0.message
            });

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[22, 30]]);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;