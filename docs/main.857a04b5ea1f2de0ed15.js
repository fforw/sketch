/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/ControlUI.js":
/*!*************************************!*\
  !*** ./src/components/ControlUI.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UI_DEFAULTS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _controlUi = __webpack_require__(/*! ./control-ui.css */ "./src/components/control-ui.css");

var _controlUi2 = _interopRequireDefault(_controlUi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// noinspection ES6UnusedImports


var UI_DEFAULTS = exports.UI_DEFAULTS = {
    phong: false,
    animateNoise: false
};

var ControlUI = function (_React$Component) {
    _inherits(ControlUI, _React$Component);

    function ControlUI() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ControlUI);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ControlUI.__proto__ || Object.getPrototypeOf(ControlUI)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            options: UI_DEFAULTS
        }, _this.changeOption = function (key, value) {

            var options = _extends({}, _this.state.options, _defineProperty({}, key, value));

            _this.setState({
                options: options
            }, function () {
                return _this.props.changeOptions(_this.state.options);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ControlUI, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var animateNoise = this.state.options.animateNoise;


            return _react2.default.createElement(
                "div",
                { id: "control-ui" },
                _react2.default.createElement(
                    "a",
                    { href: "https://github.com/fforw/sketch" },
                    "github"
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                    "label",
                    null,
                    _react2.default.createElement("input", {
                        type: "checkbox",
                        checked: animateNoise,
                        onClick: function onClick(ev) {
                            return _this2.changeOption("animateNoise", !animateNoise);
                        }
                    }),
                    "animate noise"
                )
            );
        }
    }]);

    return ControlUI;
}(_react2.default.Component);

exports.default = ControlUI;

/***/ }),

/***/ "./src/components/control-ui.css":
/*!***************************************!*\
  !*** ./src/components/control-ui.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // noinspection ES6UnusedImports


var _style = __webpack_require__(/*! ./style.css */ "./src/style.css");

var _style2 = _interopRequireDefault(_style);

var _raf = __webpack_require__(/*! raf */ "./node_modules/raf/index.js");

var _raf2 = _interopRequireDefault(_raf);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var _glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js");

var _glslify2 = _interopRequireDefault(_glslify);

var _barycentric = __webpack_require__(/*! ./util/barycentric */ "./src/util/barycentric.js");

var _barycentric2 = _interopRequireDefault(_barycentric);

var _ControlUI = __webpack_require__(/*! ./components/ControlUI */ "./src/components/ControlUI.js");

var _ControlUI2 = _interopRequireDefault(_ControlUI);

var _refPoint = __webpack_require__(/*! ./util/refPoint */ "./src/util/refPoint.js");

var _refPoint2 = _interopRequireDefault(_refPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrbitControls = __webpack_require__(/*! three-orbit-controls */ "./node_modules/three-orbit-controls/index.js")(__webpack_require__(/*! three */ "./node_modules/three/build/three.module.js"));

var fragmentShader = "#define GLSLIFY 1\n// fragment shader\n\n#include <common>\n#include <packing>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nuniform vec3 color;\nuniform float time;\nuniform float height;\n\nvarying vec3 vNormal;\nvarying vec3 vWorldPosition;\nvarying vec3 vLightDirection;\nvarying vec3 vPrimary;\nvarying float cameraDistance;\n\nuniform float shadow;\nuniform float scale;\nuniform bool flipEveryOther;\n\nvarying vec4 vBarycentric;\n\nfloat mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}\n\nfloat noise(vec3 p){\n    vec3 a = floor(p);\n    vec3 d = p - a;\n    d = d * d * (3.0 - 2.0 * d);\n\n    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);\n    vec4 k1 = perm(b.xyxy);\n    vec4 k2 = perm(k1.xyxy + b.zzww);\n\n    vec4 c = k2 + a.zzzz;\n    vec4 k3 = perm(c);\n    vec4 k4 = perm(c + 1.0);\n\n    vec4 o1 = fract(k3 * (1.0 / 41.0));\n    vec4 o2 = fract(k4 * (1.0 / 41.0));\n\n    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);\n    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);\n\n    return o4.y * d.y + o4.x * (1.0 - d.y);\n}\n\nbool isOnLine(float baryPos, float b, float shadow, float lineDistance, float randomOffset, float lineWidth)\n{\n    if (b < shadow)\n    {\n        float len = lineDistance * scale * cameraDistance;\n\n        // because of the fractional below, we calculate in 1/len units (so random values \"push\" the line correctly into the next slice)\n        float invLen = 1.0 / len;\n\n        float pixelHeight = 1.0 / height * invLen;\n\n        float count = floor(baryPos * invLen);\n\n        float random = noise((vWorldPosition + count + vec3(0, randomOffset,0) ) * 1.2 ) * 0.12 * scale * cameraDistance;\n\n        float pos = fract(((baryPos + random) - count * len) * invLen);\n\n        return ( pos < pixelHeight * lineWidth * scale * cameraDistance);\n    }\n    return false;\n}\n\nvoid main(void) {\n\n    float d =  getShadowMask();\n    float c = (1.0 + dot( vNormal, vLightDirection)) / 2.0;\n    float b = max(0.0,  c * d);\n\n    float lineScale = height / 800.0;\n\n    float timeFactor = time * 0.0004;\n\n    bool flip = flipEveryOther && vBarycentric.w == 0.0;\n\n    float bx = flip ? vBarycentric.x : 1.0 - vBarycentric.x;\n    float by = vBarycentric.y;\n    float bz = vBarycentric.z;\n\n    if (isOnLine(     bx, b, shadow      , 0.4, timeFactor + 0.0, 40.0 * lineScale))\n    {\n        gl_FragColor = vec4(0,0,0,1);\n    }\n    else if (isOnLine(by, b, shadow * 0.8, 0.3, timeFactor + 11.0, 40.0* lineScale))\n    {\n        gl_FragColor = vec4(0,0,0,1);\n    }\n    else if (isOnLine(by, b, shadow * 0.5, 0.25, timeFactor + 2.0, 50.0* lineScale))\n    {\n        gl_FragColor = vec4(0,0,0,1);\n    }\n    else if (isOnLine(bz, b, shadow * 0.4, 0.2, timeFactor - 3.0, 60.0 * lineScale))\n    {\n        gl_FragColor = vec4(0,0,0,1);\n    }\n    else if (isOnLine(bx, b, shadow * 0.1, 0.15, timeFactor + 14.0, 60.0 * lineScale))\n    {\n        gl_FragColor = vec4(0,0,0,1);\n    }\n    else\n    {\n        float factor = 0.0;\n\n        if (isOnLine(bx, 0.0, 1.0, 0.15, timeFactor + 141.0, 60.0 * lineScale))\n        {\n            factor = factor + 0.33;\n        }\n        if (isOnLine(by, 0.0, 1.0, 0.14, timeFactor + 214.0, 60.0 * lineScale))\n        {\n            factor = factor + 0.33;\n        }\n        if (isOnLine(bz, 0.0, 1.0, 0.16, timeFactor + 214.0, 60.0 * lineScale))\n        {\n            factor = factor + 0.33;\n        }\n\n        vec3 col = mix( vec3(1,1,1), color, factor);\n\n        gl_FragColor = vec4(col.x,col.y,col.z, 1);\n    }\n}\n";
var vertexShader = "#define GLSLIFY 1\n// vertex shader\n\n#include <shadowmap_pars_vertex>\n\nvarying vec3 vNormal;\nvarying vec3 vWorldPosition;\nvarying vec3 vLightDirection;\nvarying vec3 vPrimary;\nvarying float cameraDistance;\n\nuniform vec3 lightDirection;\nuniform vec3 primary;\nuniform vec3 camera;\n\nattribute vec4 barycentric;\nattribute vec3 refPoint;\nvarying vec4 vBarycentric;\n\nvoid main() {\n\n    vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n\n    #include <shadowmap_vertex>\n\n    // store the world position as varying for lighting\n    vWorldPosition = worldPosition.xyz;\n    \n    vNormal = normalMatrix * vec3(normal);\n\n    vLightDirection = normalMatrix * lightDirection;\n\n    vPrimary = (projectionMatrix *\n               modelViewMatrix *\n               vec4(primary,1.0)).xyz;\n\n    vec4 pos = projectionMatrix *\n               modelViewMatrix *\n               vec4(position,1.0);\n\n    gl_Position = pos;\n\n    cameraDistance = distance(camera, refPoint);\n\n    vBarycentric = barycentric;\n}\n";

var controls = void 0;
// ambient
//scene.add(new AmbientLight(0x222222));

var LIGHT_X = 0;
var LIGHT_Y = 200;
var LIGHT_Z = 100;

var TAU = Math.PI * 2;

var lightDirection = new _three.Vector3(LIGHT_X, LIGHT_Y, LIGHT_Z).normalize();

var DEFAULT_MATERIAL_OPTS = {
    color: 0xffffff,
    scale: 1,
    shadow: 0.6,
    flipEveryOther: true
};

var uiOptions = _extends({}, _ControlUI.UI_DEFAULTS);

var camera = void 0;
var scene = void 0;
var light = void 0;

/**
 *
 * @param {object} opts
 * @param {string|number} [opts.color]
 * @param {number} [opts.scale]
 *
 * @return {ShaderMaterial}
 */
function createMaterial(opts) {
    if (opts.phong) {
        return new _three.MeshPhongMaterial();
    }

    opts = _extends({}, DEFAULT_MATERIAL_OPTS, opts);

    opts.scale *= 0.2;

    var uniforms = _three.UniformsUtils.merge([_three.ShaderLib.shadow.uniforms, {
        /**
         * Light face color, gets speckled with white
         */
        color: {
            value: new _three.Color(opts.color)
        },
        // direction of the directional light
        lightDirection: {
            type: "v3",
            value: lightDirection
        },

        // minimal shadow value
        shadow: {
            type: 'f',
            value: 0.9
        },
        primary: {
            type: "v3",
            value: new _three.Vector3(0, -0.1, 0)
        },

        height: {
            value: height
        },

        scale: {
            type: 'f',
            value: opts.scale
        },
        time: {
            type: 'f',
            value: 0
        },
        flipEveryOther: {
            type: 'bool',
            value: opts.flipEveryOther
        },
        camera: {
            type: 'v3',
            value: new _three.Vector3(0, 0, 0)
        }
    }]);

    //console.log("UNIFORMS", uniforms);

    var material = new _three.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        lights: true
    });
    return material;
}

function withBarycentricCoordinates(geometry) {
    var flipEveryOther = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var buffer = new _three.BufferGeometry();
    buffer.fromGeometry(geometry);

    if (buffer.getIndex() !== null) {
        buffer = buffer.toNonIndexed();
    }

    buffer.addAttribute("barycentric", (0, _barycentric2.default)(buffer, flipEveryOther));
    buffer.addAttribute("refPoint", (0, _refPoint2.default)(buffer, flipEveryOther));

    return buffer;
}

function createBox(width, height, depth) {
    var resolution = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    return withBarycentricCoordinates(new _three.CubeGeometry(width, height, depth, resolution, resolution, resolution), true);
}

var cubeMat = createMaterial({
    color: 0xf0cebb,
    scale: 0.08
});
var cube2Mat = createMaterial({
    color: 0xbbddf0,
    scale: 0.08

});
var groundMat = createMaterial({
    color: 0xbbbbbf,
    scale: 0.08
});
var icoMat = createMaterial({
    color: 0x888888,
    scale: 0.5,
    flipEveryOther: false
});

function createScene() {
    camera = new _three.PerspectiveCamera();

    controls = new OrbitControls(camera);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

    // scene
    scene = new _three.Scene();

    // light
    light = new _three.DirectionalLight(0xffffff, 1);
    light.position.set(LIGHT_X, LIGHT_Y, LIGHT_Z);
    light.castShadow = true; // default false

    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.left = -30;
    light.shadow.camera.right = 30;
    light.shadow.camera.top = 30;
    light.shadow.camera.bottom = -30;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;

    scene.add(light);

    var icoGeometry = withBarycentricCoordinates(new _three.IcosahedronGeometry(2, 2), false);
    var icoMesh = new _three.Mesh(icoGeometry, icoMat);
    icoMesh.position.x = 2;
    icoMesh.position.z = -5;
    icoMesh.position.y = 1.5;
    icoMesh.castShadow = true;
    icoMesh.receiveShadow = true;

    scene.add(icoMesh);

    var cubeGeometry = createBox(3, 4, 3);
    var cubeMesh = new _three.Mesh(cubeGeometry, cubeMat);
    cubeMesh.position.x = 1;
    cubeMesh.position.y = 2;
    cubeMesh.position.z = 1;
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;

    scene.add(cubeMesh);

    var cube3Mesh = new _three.Mesh(cubeGeometry, cubeMat);
    cube3Mesh.position.x = 1;
    cube3Mesh.position.y = 6;
    cube3Mesh.position.z = 1;
    cube3Mesh.rotation.y = TAU / 8;
    cube3Mesh.castShadow = true;
    cube3Mesh.receiveShadow = true;

    scene.add(cube3Mesh);

    var cube2Geometry = createBox(5, 3, 3);

    var cube2Mesh = new _three.Mesh(cube2Geometry, cube2Mat);
    cube2Mesh.position.x = -3.5;
    cube2Mesh.position.y = 1.5;
    cube2Mesh.position.z = -2;
    cube2Mesh.castShadow = true;
    cube2Mesh.receiveShadow = true;

    scene.add(cube2Mesh);

    var cube4Mesh = new _three.Mesh(cube2Geometry, cube2Mat);
    cube4Mesh.position.x = -3.5;
    cube4Mesh.position.y = 1.5;
    cube4Mesh.position.z = 5;
    cube4Mesh.rotation.y = TAU / 32;
    cube4Mesh.castShadow = true;
    cube4Mesh.receiveShadow = true;

    scene.add(cube4Mesh);

    var ground = createBox(40, 1, 40, 8);
    var groundMesh = new _three.Mesh(ground, groundMat);
    groundMesh.position.y = -0.5;
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;

    scene.add(groundMesh);

    // camera
    camera.position.set(-3, 4, -10);
    camera.lookAt(new _three.Vector3(0, 0, 0));

    // const shadowHelper = new CameraHelper(light.shadow.camera);
    // scene.add(shadowHelper);
}

createScene();

var renderer = new _three.WebGLRenderer({
    antialias: false
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = _three.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new _three.Color(0xf0f0f0));

var MIN_AZIMUT = TAU / 360;

var angle = TAU / 4;
var dx = 1;

var last = 0;
var first = 0;

var STEP = 1 / 100 * 1000;

var pause = false;

var lastCameraPos = null;

// render loop
function onAnimationFrame(timeStamp) {

    try {
        if (!pause) {
            light.position.set(Math.cos(angle) * 150, Math.sin(angle) * 150, 200);

            // cube2Mesh.position.set(
            //     -3.5,
            //     3.5 + Math.cos(angle) * 2,
            //     -2
            // );
            if (!first) {
                first = timeStamp;
                last = timeStamp;
            }

            var delta = timeStamp - last;

            if (delta > STEP) {
                while (delta > STEP) {
                    angle += dx * delta * 0.0001;

                    if (angle < MIN_AZIMUT) {
                        angle = MIN_AZIMUT;
                        dx = 1;
                    } else if (angle > Math.PI - MIN_AZIMUT) {
                        angle = Math.PI - MIN_AZIMUT;
                        dx = -1;
                    }

                    var time = timeStamp - first;

                    if (uiOptions.animateNoise) {
                        setUniform(icoMat, "time", time);
                        setUniform(cubeMat, "time", time);
                        setUniform(cube2Mat, "time", time);
                        setUniform(groundMat, "time", time);
                    }

                    delta -= STEP;
                    last += STEP;

                    scene.update && scene.update(last);
                }

                controls.update();

                if (!lastCameraPos || !lastCameraPos.equals(camera.position)) {
                    lastCameraPos = camera.position.clone();
                    //console.log("Camera at ", lastCameraPos, controls);

                    setUniform(icoMat, "camera", lastCameraPos);
                    setUniform(cubeMat, "camera", lastCameraPos);
                    setUniform(cube2Mat, "camera", lastCameraPos);
                    setUniform(groundMat, "camera", lastCameraPos);
                }
            }
            renderer.render(scene, camera);
        }
        (0, _raf2.default)(onAnimationFrame);
    } catch (e) {
        console.error("Error in animation loop", e);
    }
}

var width = void 0,
    height = void 0;

function setUniform(mat, name, value) {
    var uniforms = mat.uniforms;
    if (uniforms) {
        uniforms[name].value = value;
    }
}

// resize
function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    setUniform(icoMat, "height", height);
    setUniform(cubeMat, "height", height);
    setUniform(cube2Mat, "height", height);
    setUniform(groundMat, "height", height);
}

onResize();
window.addEventListener("resize", onResize);

// dom
document.body.appendChild(renderer.domElement);

(0, _reactDom.render)(_react2.default.createElement(_ControlUI2.default, {
    changeOptions: function changeOptions(opts) {
        return uiOptions = opts;
    }
}), document.getElementById("root"), function () {
    console.info("ready");
    (0, _raf2.default)(onAnimationFrame);
});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/util/barycentric.js":
/*!*********************************!*\
  !*** ./src/util/barycentric.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LEFT = exports.DOWN = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (geometry) {
    var flipEveryOther = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var vPrimary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DOWN;
    var vSecondary = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LEFT;

    var positions = geometry.attributes.position.array;

    // the primary plane lies in the direction of the primary vector, safely outside of the scene
    var primaryPlane = new _three.Plane();
    primaryPlane.setFromNormalAndCoplanarPoint(vPrimary, vPrimary.clone().multiplyScalar(1000));

    // the primary plane lies in the direction of the primary vector, safely outside of the scene
    var secondaryPlane = new _three.Plane();
    secondaryPlane.setFromNormalAndCoplanarPoint(vSecondary, vSecondary.clone().multiplyScalar(1000));

    // Build new attribute storing barycentric coordinates
    // for each vertex
    var barycentric = new _three.BufferAttribute(new Float32Array(positions.length * 4 / 3), 4);

    var out = barycentric.array;

    var flip = false;
    for (var i = 0, j = 0; i < positions.length; i += 9, j += 12) {

        // an edge is all points in an triangle where one of the barycentric components is 1
        var edges = [null, null, null];

        // if (i === 99)
        // {
        for (var k = 0; k < 3; k++) {
            var _EDGE_INDEXES$k = _slicedToArray(EDGE_INDEXES[k], 3),
                idx0 = _EDGE_INDEXES$k[0],
                idx1 = _EDGE_INDEXES$k[1],
                idx2 = _EDGE_INDEXES$k[2];

            vPoint0.x = positions[i + idx0];
            vPoint0.y = positions[i + idx0 + 1];
            vPoint0.z = positions[i + idx0 + 2];

            vPoint1.x = positions[i + idx1];
            vPoint1.y = positions[i + idx1 + 1];
            vPoint1.z = positions[i + idx1 + 2];

            edges[k] = {
                other: idx2,
                delta: Math.abs(primaryPlane.distanceToPoint(vPoint0) - primaryPlane.distanceToPoint(vPoint1)),
                start: vPoint0.clone(),
                end: vPoint1.clone(),
                vector: vPoint1.clone().sub(vPoint0)
            };
        }

        var primaryEdge = void 0,
            secondaryEdge = void 0,
            tertiaryEdge = void 0;
        if (edges[0].delta === edges[1].delta && edges[0].delta === edges[2].delta) {
            var aOrthogonalToB = edges[0].vector.dot(edges[1].vector) === 0;
            var bOrthogonalToC = edges[1].vector.dot(edges[2].vector) === 0;
            var cOrthogonalToA = edges[2].vector.dot(edges[0].vector) === 0;

            if (aOrthogonalToB) {
                var deltaA = Math.abs(secondaryPlane.distanceToPoint(edges[0].start) - secondaryPlane.distanceToPoint(edges[0].end));
                var deltaB = Math.abs(secondaryPlane.distanceToPoint(edges[1].start) - secondaryPlane.distanceToPoint(edges[1].end));

                if (deltaA < deltaB) {
                    primaryEdge = 0;
                    secondaryEdge = 3;
                    tertiaryEdge = 6;
                } else {
                    primaryEdge = 3;
                    secondaryEdge = 0;
                    tertiaryEdge = 6;
                }
            } else if (bOrthogonalToC) {
                var _deltaB = Math.abs(secondaryPlane.distanceToPoint(edges[1].start) - secondaryPlane.distanceToPoint(edges[1].end));
                var deltaC = Math.abs(secondaryPlane.distanceToPoint(edges[2].start) - secondaryPlane.distanceToPoint(edges[2].end));

                if (_deltaB < deltaC) {
                    primaryEdge = 3;
                    secondaryEdge = 6;
                    tertiaryEdge = 0;
                } else {
                    primaryEdge = 6;
                    secondaryEdge = 3;
                    tertiaryEdge = 0;
                }
            } else if (cOrthogonalToA) {
                var _deltaC = Math.abs(secondaryPlane.distanceToPoint(edges[2].start) - secondaryPlane.distanceToPoint(edges[2].end));
                var _deltaA = Math.abs(secondaryPlane.distanceToPoint(edges[0].start) - secondaryPlane.distanceToPoint(edges[0].end));

                if (_deltaC < _deltaA) {
                    primaryEdge = 6;
                    secondaryEdge = 0;
                    tertiaryEdge = 3;
                } else {
                    primaryEdge = 0;
                    secondaryEdge = 6;
                    tertiaryEdge = 3;
                }
            }
        } else {
            edges.sort(sortByDeltaAscending);

            primaryEdge = edges[0].other;

            if (edges[0].vector.dot(edges[1].vector) === 0) {
                secondaryEdge = edges[2].other;
                tertiaryEdge = edges[1].other;
            } else {
                secondaryEdge = edges[1].other;
                tertiaryEdge = edges[2].other;
            }
        }

        //     console.log("edges", edges);
        // }
        // else
        // {
        //     continue;
        // }


        //console.log({primaryEdge, secondaryEdge, tertiaryEdge});

        out[j] = primaryEdge === 0 ? 1 : 0;
        out[j + 1] = primaryEdge === 3 ? 1 : 0;
        out[j + 2] = primaryEdge === 6 ? 1 : 0;
        out[j + 3] = flip ? 1 : 0;

        out[j + 4] = secondaryEdge === 0 ? 1 : 0;
        out[j + 5] = secondaryEdge === 3 ? 1 : 0;
        out[j + 6] = secondaryEdge === 6 ? 1 : 0;
        out[j + 7] = flip ? 1 : 0;

        out[j + 8] = tertiaryEdge === 0 ? 1 : 0;
        out[j + 9] = tertiaryEdge === 3 ? 1 : 0;
        out[j + 10] = tertiaryEdge === 6 ? 1 : 0;
        out[j + 11] = flip ? 1 : 0;

        if (flipEveryOther) {
            flip = !flip;
        }
    }
    //console.log("BARYCENTRIC", barycentric);

    return barycentric;
};

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var TAU = Math.PI * 2;

function sortByDeltaAscending(a, b) {
    return a.delta - b.delta;
}

var DOWN = exports.DOWN = new _three.Vector3(0, -1, 0);
var LEFT = exports.LEFT = new _three.Vector3(-1, 0, 0);

var EDGE_INDEXES = [[0, 3, 6], [3, 6, 0], [6, 0, 3]];

var vPoint0 = new _three.Vector3(0, 0, 0);
var vPoint1 = new _three.Vector3(0, 0, 0);
var vTmp = new _three.Vector3(0, 0, 0);

/***/ }),

/***/ "./src/util/refPoint.js":
/*!******************************!*\
  !*** ./src/util/refPoint.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (geometry) {
    var alternatingQuads = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var positions = geometry.attributes.position.array;

    // Build new attribute storing refPoint coordinates
    // for each vertex
    var refPoint = new _three.BufferAttribute(new Float32Array(positions.length), 3);

    var out = refPoint.array;

    for (var i = 0; i < positions.length; i += 9) {
        var center = void 0;
        if (alternatingQuads) {
            var centerA = getCenter(positions, i).clone();
            var centerB = getCenter(positions, i + 9);

            center = centerA.add(centerB).multiplyScalar(0.5);
        } else {
            center = getCenter(positions, i);
        }

        out[i] = center.x;
        out[i + 1] = center.y;
        out[i + 2] = center.z;

        out[i + 3] = center.x;
        out[i + 4] = center.y;
        out[i + 5] = center.z;

        out[i + 6] = center.x;
        out[i + 7] = center.y;
        out[i + 8] = center.z;

        if (alternatingQuads) {
            i = i + 9;
            out[i] = center.x;
            out[i + 1] = center.y;
            out[i + 2] = center.z;

            out[i + 3] = center.x;
            out[i + 4] = center.y;
            out[i + 5] = center.z;

            out[i + 6] = center.x;
            out[i + 7] = center.y;
            out[i + 8] = center.z;
        }
    }
    //console.log("BARYCENTRIC", refPoint);

    return refPoint;
};

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var TAU = Math.PI * 2;

var vCenter = new _three.Vector3(0, 0, 0);

function getCenter(positions, index) {
    vCenter.x = (positions[index] + positions[index + 3] + positions[index + 6]) / 3;

    vCenter.y = (positions[index + 1] + positions[index + 4] + positions[index + 7]) / 3;

    vCenter.z = (positions[index + 2] + positions[index + 5] + positions[index + 8]) / 3;

    return vCenter;
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=main.857a04b5ea1f2de0ed15.js.map