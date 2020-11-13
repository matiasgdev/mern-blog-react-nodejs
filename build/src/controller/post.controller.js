"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.deleteComment = exports.addCommentToPost = exports.updateLikesOfPost = exports.update = exports.detailBySlug = exports.listPopular = exports.list = exports.create = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

var _User = _interopRequireDefault(require("../models/User"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config(); // create new post


var create = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, title, description, content, category, isTitleUnique, serverPath, filePath, post, userData, newPost;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.title === '')) {
              _context.next = 3;
              break;
            }

            res.status(400);
            throw new Error("Se requiere un título");

          case 3:
            if (!(req.body.description === '')) {
              _context.next = 6;
              break;
            }

            res.status(400);
            throw new Error("Se requiere una descripción");

          case 6:
            if (!(req.body.content === '')) {
              _context.next = 9;
              break;
            }

            res.status(400);
            throw new Error("Se requiere un contenido");

          case 9:
            if (req.file) {
              _context.next = 12;
              break;
            }

            res.status(400);
            throw new Error("Se requiere al menos una imagen");

          case 12:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, content = _req$body.content, category = _req$body.category;
            _context.next = 15;
            return _Post["default"].findOne({
              title: title
            });

          case 15:
            isTitleUnique = _context.sent;

            if (!isTitleUnique) {
              _context.next = 19;
              break;
            }

            res.status(400);
            throw new Error('Ya existe un post con ese titulo');

          case 19:
            serverPath = "http://localhost:".concat(process.env.SERVER_PORT, "/");

            if (process.env.NODE_ENV === 'production') {
              serverPath = "https://blog-mern-stack-matiasgdev.herokuapp.com/";
            }

            filePath = req.file.path.replace('public', 'files');
            post = new _Post["default"]({
              title: title,
              description: description,
              content: content,
              category: category,
              imagePath: serverPath + filePath
            });
            _context.next = 25;
            return _User["default"].findOne({
              _id: res.user._id
            });

          case 25:
            userData = _context.sent;
            post.user = userData._id;
            _context.next = 29;
            return post.save();

          case 29:
            newPost = _context.sent;
            return _context.abrupt("return", res.status(201).json(newPost));

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // list posts

exports.create = create;
var list = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var pageLimit, page, count, posts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pageLimit = 5;
            page = Number(req.query.page) || 1;
            _context2.next = 4;
            return _Post["default"].countDocuments();

          case 4:
            count = _context2.sent;
            _context2.next = 7;
            return _Post["default"].find().populate([{
              path: 'user',
              select: 'username'
            }, {
              path: 'comments'
            }]).limit(pageLimit).skip(pageLimit * (page - 1)).sort({
              createdAt: -1
            });

          case 7:
            posts = _context2.sent;
            return _context2.abrupt("return", res.json({
              count: count,
              posts: posts,
              page: page,
              pages: Math.ceil(count / pageLimit)
            }));

          case 9:
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
exports.list = list;
var listPopular = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var popularPosts;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Post["default"].find({}).sort({
              likes: -1
            }).limit(3).populate('user', 'username');

          case 2:
            popularPosts = _context3.sent;
            res.json(popularPosts);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // detail posd by slug

exports.listPopular = listPopular;
var detailBySlug = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var detailOfPost;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Post["default"].findOne({
              slug: req.params.slug
            }).populate('user', 'username').populate({
              path: 'comments',
              populate: {
                path: 'user',
                select: 'username'
              }
            });

          case 2:
            detailOfPost = _context4.sent;

            if (detailOfPost) {
              _context4.next = 6;
              break;
            }

            res.status(400);
            throw new Error("No existe el post ".concat(req.params.slug));

          case 6:
            res.json(detailOfPost);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // update post

exports.detailBySlug = detailBySlug;
var update = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var isSomethingToModify, updatedPost;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isSomethingToModify = 0;
            Object.keys(req.body).map(function (key) {
              if (req.body[key] !== '') {
                res.post[key] = req.body[key];
                isSomethingToModify++;
              }
            });

            if (!(isSomethingToModify === 0)) {
              _context5.next = 4;
              break;
            }

            throw new Error("No existen datos para modificar");

          case 4:
            _context5.next = 6;
            return res.post.save();

          case 6:
            updatedPost = _context5.sent;
            res.json(updatedPost);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // update likes 

exports.update = update;
var updateLikesOfPost = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var post, user, isAlreadyLike, updatedPost, numOfLikes, like, _updatedPost, _numOfLikes;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            post = res.post;
            user = res.user;
            isAlreadyLike = post.likes.find(function (like) {
              return like.user.toHexString() === user._id.toHexString();
            });

            if (!isAlreadyLike) {
              _context6.next = 12;
              break;
            }

            post.likes = post.likes.filter(function (like) {
              return like.user.toHexString() !== user._id.toHexString();
            });
            _context6.next = 7;
            return post.save();

          case 7:
            updatedPost = _context6.sent;
            numOfLikes = updatedPost.likes.length;
            res.status(201).json({
              message: 'removed',
              num: numOfLikes
            });
            _context6.next = 19;
            break;

          case 12:
            like = {
              user: user._id
            };
            post.likes.push(like);
            _context6.next = 16;
            return post.save();

          case 16:
            _updatedPost = _context6.sent;
            _numOfLikes = _updatedPost.likes.length;
            res.status(201).json({
              message: 'added',
              num: _numOfLikes
            });

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); // add comment

exports.updateLikesOfPost = updateLikesOfPost;
var addCommentToPost = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            res.post.comments.push(res.comment._id);
            _context7.next = 3;
            return res.post.save();

          case 3:
            _context7.next = 5;
            return _Post["default"].findOne({
              _id: res.post._id
            });

          case 5:
            res.json({
              message: 'Se envió el comentario correctamente'
            });

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); // delete comment 

exports.addCommentToPost = addCommentToPost;
var deleteComment = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var isDeleted;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Post["default"].findOneAndUpdate({
              _id: req.params.postId
            }, {
              $pull: {
                comments: req.params.commentId
              }
            }, {
              "new": true
            });

          case 2:
            isDeleted = _context8.sent;
            _context8.next = 5;
            return _Comment["default"].findOneAndDelete({
              _id: req.params.commentId
            });

          case 5:
            res.json(isDeleted);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
exports.deleteComment = deleteComment;
var remove = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return res.post.remove();

          case 2:
            res.json({
              message: "Publicacion ".concat(res.post._id, " eliminada correctamente")
            });

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
exports.remove = remove;