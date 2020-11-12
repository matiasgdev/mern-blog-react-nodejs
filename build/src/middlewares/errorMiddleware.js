"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.notFound = void 0;

var notFound = function notFound(req, res, next) {
  var error = new Error("Not Found - ".concat(req.originalUrl));
  res.status(404);
  next(error);
};

exports.notFound = notFound;

var errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  if (err.name === 'TokenExpiredError') {
    return res.json({
      message: 'El token expiro. Intente iniciar sesión nuevamente'
    });
  }

  res.json({
    message: err.message
  });
};

exports.errorHandler = errorHandler;