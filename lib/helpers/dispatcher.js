"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dispatcher = function Dispatcher() {
  var _this = this;

  _classCallCheck(this, Dispatcher);

  _defineProperty(this, "callbacks", {});

  _defineProperty(this, "data", {});

  _defineProperty(this, "update", function (namespace) {
    (_this.callbacks[namespace] || []).forEach( // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (callback) {
      try {
        var data = _this.data[namespace];
        callback(data);
      } catch (e) {
        callback(undefined);
      }
    });
  });
};

exports["default"] = Dispatcher;