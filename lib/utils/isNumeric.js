"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNumeric;

function isNumeric(str) {
  if (typeof str !== "string") {
    return false;
  }

  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
}