"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getImageSizeByFile;

function getImageSizeByFile(file) {
  return new Promise(function (resolve) {
    var fr = new FileReader();

    fr.onload = function () {
      var img = new Image();

      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height
        });
      };

      img.src = fr.result;
    };

    fr.readAsDataURL(file);
  });
}