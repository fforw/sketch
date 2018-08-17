// noinspection ES6UnusedImports
import STYLES from "./style.css"
import raf from "raf"


const OrbitControls = require("three-orbit-controls")(require("three"));

import {
    CubeGeometry,
    IcosahedronGeometry,
    Mesh,
    MeshBasicMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera,
    OrthographicCamera,
    DirectionalLight,
    Scene,
    Vector3,
    WebGLRenderer,
    AmbientLight,
    SpotLight,
    LightShadow,
    ShaderMaterial,
    MeshLambertMaterial,
    CameraHelper,
    UniformsUtils,
    ShaderLib,
    Color
} from "three";

import glslify from "glslify";
import { Vector4 } from "three/src/math/Vector4";


const fragmentShader = glslify("./sketch.frag");
const vertexShader = glslify("./sketch.vert");

const camera = new PerspectiveCamera();

// scene
const scene = new Scene();

const controls = new OrbitControls(camera);

// ambient
//scene.add(new AmbientLight(0x222222));


// light
const light = new DirectionalLight(0xffffff, 1);
light.position.set(100, 200, 100);
light.castShadow = true; // default false

light.shadow.bias = 0.0001;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.left = -100;
light.shadow.camera.right = 100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 1000;

scene.add(light);
const icoGeometry = new IcosahedronGeometry(2, 1);

console.log("ShaderLib.shadow.uniforms", ShaderLib.shadow.uniforms);

let uniforms = UniformsUtils.merge([
    ShaderLib.shadow.uniforms,
    {
        color: { value: new Color( 0xff00ff ) },
        opacity: { value: 1.0 },
        lightPosition: {
            type: "v4",
            value: new Vector4(100, 200, 100, 0)
        },
//            time: {type: 'f', value: 0}
    }
]);

console.log("UNIFORMS", uniforms);

const material = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        lights: true
    }
);

// const material = new MeshLambertMaterial({
//     color: 0xff00ff
// });

const material2 = new MeshLambertMaterial({
    color: 0x888888
});

// const icoMesh = new Mesh( icoGeometry, material );
// icoMesh.position.x = -2;
// icoMesh.position.z = -5;
// icoMesh.position.y = 1.5;
// icoMesh.castShadow = true;
// icoMesh.receiveShadow = true;
//
//scene.add(icoMesh);

const cubeGeometry = new CubeGeometry(3, 8, 3);
const cubeMesh = new Mesh(cubeGeometry, material);
cubeMesh.position.x = 1;
cubeMesh.position.y = 4;
cubeMesh.position.z = 1;
cubeMesh.castShadow = true;
cubeMesh.receiveShadow = true;

scene.add(cubeMesh);

const cube2Geometry = new CubeGeometry(5, 3, 3);
const cube2Mesh = new Mesh(cube2Geometry, material);
cube2Mesh.position.x = -5;
cube2Mesh.position.y = 1.5;
cube2Mesh.position.z = -2;
cube2Mesh.castShadow = true;
cube2Mesh.receiveShadow = true;

scene.add(cube2Mesh);

const ground = new CubeGeometry(20, 6, 20, 4, 4, 4);
const groundMesh = new Mesh(ground, material2);
groundMesh.position.y = -3;
groundMesh.castShadow = true;
groundMesh.receiveShadow = true;

scene.add(groundMesh);

// camera
camera.position.set(-3, 4, -10);
camera.lookAt(new Vector3(0, 0, 0));

// renderer
const renderer = new WebGLRenderer({
    antialias: false
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

const shadowHelper = new CameraHelper(light.shadow.camera);
scene.add(shadowHelper);

// render loop
function onAnimationFrame(timeStamp)
{
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    raf(onAnimationFrame);
}

raf(onAnimationFrame);

// resize
function onResize()
{
    const {innerHeight, innerWidth} = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}

onResize();
window.addEventListener("resize", onResize);

// dom
document.body.appendChild(renderer.domElement);
