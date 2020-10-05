"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _postController = require("../controller/post.controller.js");

var _findPostById = require("../middlewares/findPostById");

var _verifyToken = require("../middlewares/verifyToken");

var _checkIsAdmin = require("../middlewares/checkIsAdmin");

var router = (0, _express.Router)();
router.get('/', _postController.list);
router.get('/:id', _findPostById.findPostById, _postController.detail); // crear post

router.post('/', _verifyToken.verifyToken, _checkIsAdmin.isAdmin, _postController.create); // actualizar post

router.put('/:id', _verifyToken.verifyToken, _checkIsAdmin.isAdmin, _findPostById.findPostById, _postController.update); // borrar post

router["delete"]('/:id', _verifyToken.verifyToken, _checkIsAdmin.isAdmin, _findPostById.findPostById, _postController.remove);
var _default = router;
exports["default"] = _default;