'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _koa = require('koa');

var koa = _interopRequireWildcard(_koa);

var _path = require('path');

var _config = require('../config/config');

var _nomiRouter = require('nomi-router');

var _nomiRouter2 = _interopRequireDefault(_nomiRouter);

var _nomiLogger = require('nomi-logger');

var _nomiLogger2 = _interopRequireDefault(_nomiLogger);

var _nomiMwloader = require('nomi-mwloader');

var _nomiMwloader2 = _interopRequireDefault(_nomiMwloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mwConfig = require((0, _path.join)(process.cwd(), 'config', 'middleware'));

var Server = function () {
  /**
   * @param listen : listen server port 
   */
  function Server(conf) {
    _classCallCheck(this, Server);

    if (!conf) {
      console.log('nomi-core module need the config file of the application project!');
      return;
    }
    this._initLogger(_extends({}, conf.log, _config.defaultLog));
    if (conf.port && isNaN(conf.port)) {
      this.SysLogger.ERROR("date is {}, app.listen must be a number!", new Date());
      return;
    }
    var app = new koa.default();
    this.app = app;
    this._setDefaultConf(_extends({ log: _config.defaultLog }, conf));
    this._startApp(); // start app 
    app.listen(Number(conf.port) || _config.port); //listen port
  }

  _createClass(Server, [{
    key: '_initLogger',
    value: function _initLogger(config) {
      _nomiLogger2.default.init(config);
      this.SysLogger = _nomiLogger2.default.SysLogger; // logger instance for system
      this.logger = _nomiLogger2.default.Logger; // logger instance for user
    }
  }, {
    key: 'match',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var _router$match, action, paras, middleware, act, params, startTime, endTime;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _router$match = this.router.match(ctx.request.url, ctx.request.method.toLocaleLowerCase()), action = _router$match.action, paras = _router$match.paras;
                middleware = action.middleware, act = action.act;
                params = _extends({}, ctx.request.query, paras);
                startTime = null;

                if (this.config.log.user.requestLog) {
                  this.requestLogger = _nomiLogger2.default.newInstance({ level: 'INFO', path: this.config.log.user.requestPath });
                  startTime = new Date();
                  this.requestLogger && this.requestLogger.INFO("date is {}, request[{}][{}] start, params is {}", startTime, ctx.url, ctx.method, params);
                }
                // mwsLoader module handle global middlewares and local middlewares
                _context.next = 7;
                return this.middleware.use(ctx, middleware, function () {
                  //exec controller.action 
                  act(ctx.request, ctx.response, params, ctx);
                });

              case 7:
                next();
                if (this.config.log.user.requestLog) {
                  endTime = new Date();

                  this.requestLogger && this.requestLogger.INFO("date is {}, request[{}][{}] end, request take {} milliseconds", endTime, ctx.url, ctx.method, endTime.getTime() - startTime.getTime());
                }

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function match(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return match;
    }()
    /**
     * start application - precompile code
     */

  }, {
    key: '_startApp',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var config, router, mws;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.SysLogger.INFO("date is {}, application start!", new Date());
                config = this._formateConfig(this._getDefaultConf());
                _context2.next = 4;
                return this._loadRouter(config);

              case 4:
                router = _context2.sent;

                this.SysLogger.INFO("date is {}, the router module loaded", new Date());
                mws = this._loadMw();

                this.SysLogger.INFO("date is {}, the middlewares module loaded", new Date());
                this.app.use(this.match.bind(this)); // handle all middlewares
                this._setConfig(_extends({}, this._getDefaultConf(), config));
                this._setRouter(router);
                this._setMws(mws); //gather middlewares 
                // this._setPlugin(this._loadPlugin()); // gather plugins dependencies
                this._loadExe(); // exec the custom entry file

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _startApp() {
        return _ref2.apply(this, arguments);
      }

      return _startApp;
    }()
    /**
     * all configuration files of the application formate to the configuration of the core-nomi module
     * @param config 
     */

  }, {
    key: '_formateConfig',
    value: function _formateConfig(config) {
      var servicePath = config.serviceDir || _config.serviceDir;
      var controllerPath = config.controllerDir || _config.controllerDir;
      return { servicePath: servicePath, controllerPath: controllerPath };
    }
  }, {
    key: '_getDefaultConf',
    value: function _getDefaultConf() {
      return this.defaultConfig;
    }
    /** setter  */

  }, {
    key: '_setConfig',
    value: function _setConfig(config) {
      this.config = config;
    }
  }, {
    key: '_setDefaultConf',
    value: function _setDefaultConf(conf) {
      this.defaultConfig = conf;
    }
  }, {
    key: '_setRouter',
    value: function _setRouter(router) {
      this.router = router;
    }
  }, {
    key: '_setMws',
    value: function _setMws(mws) {
      this.middleware = mws;
    }
  }, {
    key: '_loadRouter',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dirObj) {
        var router;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _nomiRouter2.default.init(dirObj);

              case 2:
                router = _context3.sent;
                return _context3.abrupt('return', router);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _loadRouter(_x3) {
        return _ref3.apply(this, arguments);
      }

      return _loadRouter;
    }()
    /**
     * exec the custom entry file
     */

  }, {
    key: '_loadExe',
    value: function _loadExe() {
      var app = this.app;
      try {
        requrie((0, _path.join)(process.cwd(), 'app.js'))(app);
      } catch (err) {
        return '';
      }
    }
  }, {
    key: '_loadMw',
    value: function _loadMw() {
      var mwl = new _nomiMwloader2.default(mwConfig(this.app), this._getDefaultConf().middlewareDir || _config.middlewareDir);
      return mwl;
    }
  }]);

  return Server;
}();

exports.default = Server;
;