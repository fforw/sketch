/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/golden.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/golden.js":
/*!***********************!*\
  !*** ./src/golden.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _shadesFactory = __webpack_require__(/*! ./util/shadesFactory */ "./src/util/shadesFactory.js");

var _shadesFactory2 = _interopRequireDefault(_shadesFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.getElementById("root");

var canvas = (0, _shadesFactory2.default)();

container.appendChild(canvas);

var ratios = (0, _shadesFactory.countPixelRatio)(canvas.getContext("2d"));

console.log("Ratios: ", ratios.map(function (e, i) {
  return "#" + i + ": ratio = " + e.ratio + "(error = " + Math.round(e.error * 1000) / 1000 + ")";
}).join("\n"));

/***/ }),

/***/ "./src/util/noise.js":
/*!***************************!*\
  !*** ./src/util/noise.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * A fast javascript implementation of simplex noise by Jonas Wagner
 *
 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 *
 *
 * Copyright (C) 2016 Jonas Wagner
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

// Code take from NPM module "simplex-noise", but only the noise2D code

var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

var SimplexNoise = function () {
    function SimplexNoise(random) {
        _classCallCheck(this, SimplexNoise);

        if (!random) {
            random = Math.random;
        }
        this.p = buildPermutationTable(random);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (var i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
        this.grad3 = new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]);
        this.grad4 = new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]);
    }

    _createClass(SimplexNoise, [{
        key: "noise2D",
        value: function noise2D(xin, yin) {
            var permMod12 = this.permMod12;
            var perm = this.perm;
            var grad3 = this.grad3;
            var n0 = 0; // Noise contributions from the three corners
            var n1 = 0;
            var n2 = 0;
            // Skew the input space to determine which simplex cell we're in
            var s = (xin + yin) * F2; // Hairy factor for 2D
            var i = Math.floor(xin + s);
            var j = Math.floor(yin + s);
            var t = (i + j) * G2;
            var X0 = i - t; // Unskew the cell origin back to (x,y) space
            var Y0 = j - t;
            var x0 = xin - X0; // The x,y distances from the cell origin
            var y0 = yin - Y0;
            // For the 2D case, the simplex shape is an equilateral triangle.
            // Determine which simplex we are in.
            var i1 = void 0,
                j1 = void 0; // Offsets for second (middle) corner of simplex in (i,j) coords
            if (x0 > y0) {
                i1 = 1;
                j1 = 0;
            } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            else {
                    i1 = 0;
                    j1 = 1;
                } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
            // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
            // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
            // c = (3-sqrt(3))/6
            var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
            var y1 = y0 - j1 + G2;
            var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
            var y2 = y0 - 1.0 + 2.0 * G2;
            // Work out the hashed gradient indices of the three simplex corners
            var ii = i & 255;
            var jj = j & 255;
            // Calculate the contribution from the three corners
            var t0 = 0.5 - x0 * x0 - y0 * y0;
            if (t0 >= 0) {
                var gi0 = permMod12[ii + perm[jj]] * 3;
                t0 *= t0;
                n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
            }
            var t1 = 0.5 - x1 * x1 - y1 * y1;
            if (t1 >= 0) {
                var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
                t1 *= t1;
                n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
            }
            var t2 = 0.5 - x2 * x2 - y2 * y2;
            if (t2 >= 0) {
                var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
                t2 *= t2;
                n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
            }
            // Add contributions from each corner to get the final noise value.
            // The result is scaled to return values in the interval [-1,1].
            return 70.0 * (n0 + n1 + n2);
        }
    }]);

    return SimplexNoise;
}();

function buildPermutationTable(random) {
    var i = void 0;
    var p = new Uint8Array(256);
    for (i = 0; i < 256; i++) {
        p[i] = i;
    }
    for (i = 0; i < 255; i++) {
        var r = i + 1 + ~~(random() * (255 - i));
        var aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    return p;
}
SimplexNoise._buildPermutationTable = buildPermutationTable;

exports.default = SimplexNoise;

/***/ }),

/***/ "./src/util/shadesFactory.js":
/*!***********************************!*\
  !*** ./src/util/shadesFactory.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.countPixelRatio = countPixelRatio;

exports.default = function () {
    var canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var ctx = canvas.getContext("2d");

    var w = WIDTH / 4 | 0;
    var h = HEIGHT / 4 | 0;

    console.log("pattern size", w, h);

    // we only generate from 0 to 1/3 because we're overlaying three of these tiles in barycentric directions.
    var step = 1 / 3 / SHADES;
    var brightness = step;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = LINE_WIDTH;
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 4; x++) {
            drawPattern(ctx, x * w + PADDING, y * h + PADDING, w - PADDING - PADDING, h - PADDING - PADDING, brightness);
            brightness += step;
        }
    }

    return canvas;
};

var _noise = __webpack_require__(/*! ./noise */ "./src/util/noise.js");

var _noise2 = _interopRequireDefault(_noise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIDTH = 256;
var HEIGHT = 256;

var PADDING = 0;

var SHADES = 16;

var GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
var LINE_WIDTH = 1;
var LINE_RESOLUTION = 8;

var noise = new _noise2.default();

function draw(ctx, x, y, ident) {
    var isMove = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var err = noise.noise2D(x * 0.003 + ident, y * 0.003) * 1.7;

    var y2 = y + err | 0;

    if (isMove) {
        ctx.moveTo(x, y2);
    } else {
        ctx.lineTo(x, y2);
    }
}

function drawPattern(ctx, x, y, w, h, brightness) {
    var pos = 0;
    var b = 0;
    var step = GOLDEN_RATIO * h;

    var brightnessStep = LINE_WIDTH / h;

    var randomIdent = 0;
    for (var _b = 0; _b <= brightness; _b += brightnessStep) {
        ctx.beginPath();

        var xStep = w / LINE_RESOLUTION;

        draw(ctx, x, y + pos | 0, 0, true);

        for (var xc = xStep; xc <= w; xc += xStep) {
            draw(ctx, x + xc | 0, y + pos | 0, randomIdent);
        }
        ctx.stroke();

        pos = (pos + step) % h;
        randomIdent++;
    }
}

/**
 * Counts the pixels in each texture tile and prints the actual ratio of black pixel and the error rate to the ideal
 * ratio.
 */
function countPixelRatio(ctx) {

    var w = WIDTH / 4 | 0;
    var h = HEIGHT / 4 | 0;

    var lineWidth = WIDTH * 4;

    var _ctx$getImageData = ctx.getImageData(0, 0, WIDTH, HEIGHT),
        data = _ctx$getImageData.data;

    console.log("buffer size = ", data.length);

    // we only generate from 0 to 1/3 because we're overlaying three of these tiles in barycentric directions.
    var step = 1 / SHADES / 3;
    var brightness = step;

    var len = Math.sqrt(SHADES);

    var array = new Array(SHADES);
    var i = 0;
    for (var y = 0; y < len; y++) {
        for (var x = 0; x < len; x++) {
            min = Infinity;
            max = -Infinity;
            var ratio = countPattern(ctx, data, x * w + PADDING, y * h + PADDING, w - PADDING - PADDING, h - PADDING - PADDING, lineWidth);
            brightness += step;

            array[i++] = {
                ratio: ratio,
                error: 1 - ratio / brightness
            };
        }
    }
    console.log(JSON.stringify(array, null, 4));

    return array;
}

var min = Infinity,
    max = -Infinity;

function countPattern(ctx, data, x, y, w, h, lineWidth) {
    var count = 0;

    for (var yc = 0; yc < h; yc++) {
        for (var xc = 0; xc < w; xc++) {
            var offset = (y + yc) * lineWidth + (x + xc) * 4;
            var value = data[offset + 3];

            //console.log("value at ", offset, "is", value);

            min = Math.min(min, offset);
            max = Math.max(max, offset);

            if (value >= 128) {
                count++;
            }
        }
    }
    return count / (w * h);
}

/**
 * Renders the shades texture into a HTML canvas and returns that canvas
 * @return {HTMLCanvasElement}
 */

/***/ })

/******/ });
//# sourceMappingURL=golden.17d337f7ac599b20e8e7.js.map