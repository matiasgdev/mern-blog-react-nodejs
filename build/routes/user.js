"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controller/user.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // list


router.get('/', _user.get); // create

router.post('/', _user.create); // login 

router.post('/login', _user.login); // detail

router.get('/:id', _user.detail); // update

router.patch('/:id', _user.update); // delete

router["delete"]('/:id', _user.remove);
var _default = router;
exports["default"] = _default;