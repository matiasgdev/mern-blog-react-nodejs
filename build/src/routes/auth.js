"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authController = require("../controller/auth.controller.js");

var _checkDuplicatedUser = _interopRequireDefault(require("../middlewares/checkDuplicatedUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // create

router.post('/signup', _checkDuplicatedUser["default"], _authController.create); // login 

router.post('/login', _authController.login);
var _default = router;
exports["default"] = _default;