"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOwnerOfComment = exports.createComment = void 0;

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createComment = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var userId, postId, content, comment, commentSuccess;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = res.user._id;
            postId = res.post._id;

            if (!(!req.body.comment || req.body.comment === '')) {
              _context.next = 7;
              break;
            }

            res.status(400);
            throw new Error('No hay ningun comentario para ingresar');

          case 7:
            content = req.body.comment;

          case 8:
            comment = new _Comment["default"]({
              user: userId,
              post: postId,
              content: content
            });
            _context.next = 11;
            return comment.save();

          case 11:
            commentSuccess = _context.sent;
            res.comment = commentSuccess;
            next();

          case 14:
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
exports.createComment = createComment;
var isOwnerOfComment = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var userId, post, commentId, comment, commentOwner, postOwner;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = res.user._id;
            post = res.post;
            commentId = req.params.commentId;
            _context2.next = 5;
            return _Comment["default"].findOne({
              _id: commentId
            });

          case 5:
            comment = _context2.sent;

            if (comment) {
              _context2.next = 9;
              break;
            }

            res.status(400);
            throw new Error('Comentario no encontrado');

          case 9:
            // verify is owner of post or owner of comment
            commentOwner = comment.user.toString() === userId.toString();
            postOwner = post.user.toString() === userId.toString();

            if (!(commentOwner || postOwner)) {
              _context2.next = 15;
              break;
            }

            next();
            _context2.next = 17;
            break;

          case 15:
            res.status(403);
            throw new Error('No tienes permisos para borrar el comentario');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
exports.isOwnerOfComment = isOwnerOfComment;