"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultLog = exports.middlewareDir = exports.controllerDir = exports.serviceDir = exports.port = undefined;

var _path = require("path");

var port = exports.port = 3000;
var serviceDir = exports.serviceDir = "/service/";
var controllerDir = exports.controllerDir = "/controller/";
var middlewareDir = exports.middlewareDir = "middleware";
var defaultLog = exports.defaultLog = {
  system: {
    path: (0, _path.join)(process.cwd(), 'log', 'system'),
    level: 'DEBUG'
  },
  user: {
    path: (0, _path.join)(process.cwd(), 'log', 'user'),
    level: 'WARN',
    requestLog: true,
    requestPath: (0, _path.join)(process.cwd(), 'log', 'request')
  },
  error: {
    path: (0, _path.join)(process.cwd(), 'log', 'error'),
    level: 'ERROR'
  }
};