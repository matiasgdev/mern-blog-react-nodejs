"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.login = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, passwordIsTrue, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.email === '')) {
              _context.next = 3;
              break;
            }

            res.status(400);
            throw new Error('Se requiere un email');

          case 3:
            if (!(req.body.password === '')) {
              _context.next = 6;
              break;
            }

            res.status(400);
            throw new Error('Debes ingresar una contraseña');

          case 6:
            _context.next = 8;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            res.status(404);
            throw new Error('El usuario no existe');

          case 12:
            _context.next = 14;
            return user.validatePassword(req.body.password);

          case 14:
            passwordIsTrue = _context.sent;

            if (passwordIsTrue) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'La contraseña no coincide'
            }));

          case 17:
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, _config["default"].SECRET_KEY, {
              expiresIn: "24h" // one day

            });
            return _context.abrupt("return", res.json({
              message: 'Ha iniciado sesion',
              data: {
                user: user,
                token: token
              }
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
exports.login = login;
var create = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, email, password, username, roles, newUser, foundRole, role, _role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.body.email === '')) {
              _context2.next = 3;
              break;
            }

            res.status(400);
            throw new Error('Se requiere un email');

          case 3:
            if (!(req.body.username === '')) {
              _context2.next = 6;
              break;
            }

            res.status(400);
            throw new Error('Ingresa un nombre de usuario');

          case 6:
            if (!(req.body.password === '')) {
              _context2.next = 9;
              break;
            }

            res.status(400);
            throw new Error('Debes ingresar una contraseña');

          case 9:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username, roles = _req$body.roles;
            newUser = new _User["default"]({
              email: email,
              password: password,
              username: username
            });

            if (!roles) {
              _context2.next = 25;
              break;
            }

            _context2.next = 14;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 14:
            foundRole = _context2.sent;

            if (!(foundRole.length <= 0)) {
              _context2.next = 22;
              break;
            }

            _context2.next = 18;
            return _Role["default"].findOne({
              name: "user"
            });

          case 18:
            role = _context2.sent;
            newUser.roles = [role._id];
            _context2.next = 23;
            break;

          case 22:
            newUser.roles = foundRole.map(function (role) {
              return role._id;
            });

          case 23:
            _context2.next = 29;
            break;

          case 25:
            _context2.next = 27;
            return _Role["default"].findOne({
              name: "user"
            });

          case 27:
            _role = _context2.sent;
            newUser.roles = [_role._id];

          case 29:
            _context2.next = 31;
            return newUser.save();

          case 31:
            savedUser = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET_KEY, {
              expiresIn: 86400 // one day

            });
            res.status(201).json({
              user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt
              },
              token: token
            });

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
exports.create = create;