"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _verifyToken = require("../middlewares/verifyToken");

var _checkIsAdmin = require("../middlewares/checkIsAdmin");

var _findPostById = require("../middlewares/findPostById");

var _commentMiddleware = require("../middlewares/commentMiddleware");

var _postMiddleware = require("../middlewares/postMiddleware");

var _uploadFile = _interopRequireDefault(require("../middlewares/uploadFile"));

var _postController = require("../controller/post.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // list posts

router.get('/', _postController.list); // list popular post

router.get('/popular', _postController.listPopular); // router.get('/find/:id', findPostById, detail)

router.get('/:slug', _postController.detailBySlug); // create post

router.post('/', _verifyToken.verifyToken, _uploadFile["default"].single('post_image'), _postController.create); // router.post('/', uploadFile.single('post_image'), create)
// update post

router.put('/:id', _verifyToken.verifyToken, _findPostById.findPostById, _postMiddleware.isOwner, _postController.update); // update likes post

router.put('/like/:id', _verifyToken.verifyToken, _findPostById.findPostById, _postController.updateLikesOfPost); // add comment

router.put('/comment/:id', _verifyToken.verifyToken, _findPostById.findPostById, _commentMiddleware.createComment, _postController.addCommentToPost); // delete comment

router["delete"]('/comment/:postId/:commentId', _verifyToken.verifyToken, _findPostById.findPostById, _commentMiddleware.isOwnerOfComment, _postController.deleteComment); // delete post

router["delete"]('/:id', _verifyToken.verifyToken, _findPostById.findPostById, _postController.remove);
var _default = router;
exports["default"] = _default;