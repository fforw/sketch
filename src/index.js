// noinspection ES6UnusedImports
import STYLES from "./style.css"
import raf from "raf"
import React from "react"
import { render } from "react-dom"
import {
    CameraHelper,
    Color,
    CubeGeometry,
    DirectionalLight,
    IcosahedronGeometry,
    Mesh,
    PCFShadowMap,
    PCFSoftShadowMap,
    PerspectiveCamera,
    Scene,
    ShaderLib,
    ShaderMaterial,
    UniformsUtils,
    Vector3,
    WebGLRenderer,
    BufferGeometry,
    MeshPhongMaterial
} from "three";

import glslify from "glslify";
import barycentric from "./util/barycentric";
import ControlUI, { UI_DEFAULTS } from "./components/ControlUI";
import refPoint from "./util/refPoint";

const OrbitControls = require("three-orbit-controls")(require("three"));


const fragmentShader = glslify("./sketch.frag");
const vertexShader = glslify("./sketch.vert");



let controls;
// ambient
//scene.add(new AmbientLight(0x222222));

const LIGHT_X = 0;
const LIGHT_Y = 200;
const LIGHT_Z = 100;

const TAU = Math.PI * 2;

const lightDirection = new Vector3(LIGHT_X, LIGHT_Y, LIGHT_Z).normalize();

const DEFAULT_MATERIAL_OPTS = {
    color: 0xffffff,
    scale: 1,
    shadow: 0.6,
    flipEveryOther: true
};

let uiOptions = { ... UI_DEFAULTS };

let camera;
let scene;
let light;

/**
 *
 * @param {object} opts
 * @param {string|number} [opts.color]
 * @param {number} [opts.scale]
 *
 * @return {ShaderMaterial}
 */
function createMaterial(opts)
{
    if (opts.phong)
    {
        return new MeshPhongMaterial();
    }

    opts = {
        ... DEFAULT_MATERIAL_OPTS,
        ... opts
    };


    opts.scale *= 0.2;


    let uniforms = UniformsUtils.merge([
        ShaderLib.shadow.uniforms,
        {
            /**
             * Light face color, gets speckled with white
             */
            color: {
                value: new Color( opts.color )
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
                value: new Vector3(0,-0.1,0)
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
                value: new Vector3(0,0,0)
            }
        }
    ]);

    //console.log("UNIFORMS", uniforms);

    const material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            lights: true
        }
    );
    return material;
}

function withBarycentricCoordinates(geometry, flipEveryOther = true)
{
    let buffer = new BufferGeometry();
    buffer.fromGeometry(geometry);

    if (buffer.getIndex() !== null)
    {
        buffer = buffer.toNonIndexed();
    }

    buffer.addAttribute("barycentric", barycentric(buffer, flipEveryOther));
    buffer.addAttribute("refPoint", refPoint(buffer, flipEveryOther));

    return buffer;
}

function createBox(width, height, depth, resolution = 1)
{
    return withBarycentricCoordinates(
        new CubeGeometry(
            width,
            height,
            depth,
            resolution,
            resolution,
            resolution
        ),
        true
    );
}


const cubeMat = createMaterial({
    color: 0xf0cebb,
    scale: 0.08
});
const cube2Mat = createMaterial({
    color: 0xbbddf0,
    scale: 0.08

});
const groundMat = createMaterial({
    color: 0xbbbbbf,
    scale: 0.08
});
const icoMat = createMaterial({
    color: 0x888888,
    scale: 0.5,
    flipEveryOther: false
});

function createScene()
{
    camera = new PerspectiveCamera();

    controls = new OrbitControls(camera);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

// scene
    scene = new Scene();

// light
    light = new DirectionalLight(0xffffff, 1);
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

    const icoGeometry = withBarycentricCoordinates(new IcosahedronGeometry(2, 2), false);
    const icoMesh = new Mesh( icoGeometry, icoMat );
    icoMesh.position.x = 2;
    icoMesh.position.z = -5;
    icoMesh.position.y = 1.5;
    icoMesh.castShadow = true;
    icoMesh.receiveShadow = true;

    scene.add(icoMesh);

    const cubeGeometry = createBox(3, 4, 3);
    const cubeMesh = new Mesh(cubeGeometry, cubeMat);
    cubeMesh.position.x = 1;
    cubeMesh.position.y = 2;
    cubeMesh.position.z = 1;
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;

    scene.add(cubeMesh);

    const cube3Mesh = new Mesh(cubeGeometry, cubeMat);
    cube3Mesh.position.x = 1;
    cube3Mesh.position.y = 6;
    cube3Mesh.position.z = 1;
    cube3Mesh.rotation.y = TAU/8;
    cube3Mesh.castShadow = true;
    cube3Mesh.receiveShadow = true;

    scene.add(cube3Mesh);

    const cube2Geometry = createBox(5, 3, 3);

    const cube2Mesh = new Mesh(cube2Geometry, cube2Mat);
    cube2Mesh.position.x = -3.5;
    cube2Mesh.position.y = 1.5;
    cube2Mesh.position.z = -2;
    cube2Mesh.castShadow = true;
    cube2Mesh.receiveShadow = true;

    scene.add(cube2Mesh);


    const cube4Mesh = new Mesh(cube2Geometry, cube2Mat);
    cube4Mesh.position.x = -3.5;
    cube4Mesh.position.y = 1.5;
    cube4Mesh.position.z = 5;
    cube4Mesh.rotation.y = TAU/32;
    cube4Mesh.castShadow = true;
    cube4Mesh.receiveShadow = true;

    scene.add(cube4Mesh);

    const ground = createBox(40, 1, 40, 8);
    const groundMesh = new Mesh(ground, groundMat);
    groundMesh.position.y = -0.5;
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;

    scene.add(groundMesh);

// camera
    camera.position.set(-3, 4, -10);
    camera.lookAt(new Vector3(0, 0, 0));

    // const shadowHelper = new CameraHelper(light.shadow.camera);
    // scene.add(shadowHelper);

}

createScene();

const renderer = new WebGLRenderer({
        antialias: false
    });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new Color(0xf0f0f0));


const MIN_AZIMUT = TAU / 72;

let angle = TAU/4;
let dx = 1;

let last = 0;
let first = 0;

const STEP = 1/100 * 1000;

let pause = false;

let lastCameraPos = null;

// render loop
function onAnimationFrame(timeStamp)
{

    try
    {
        if (!pause)
        {
            light.position.set(
                Math.cos(angle) * 150,
                Math.sin(angle) * 150,
                200
            );

            // cube2Mesh.position.set(
            //     -3.5,
            //     3.5 + Math.cos(angle) * 2,
            //     -2
            // );
            if (!first)
            {
                first = timeStamp;
                last = timeStamp;
            }

            let delta = timeStamp - last;

            if (delta > STEP)
            {
                while (delta > STEP)
                {
                    angle += dx * delta * 0.0001;

                    // if (angle < MIN_AZIMUT)
                    // {
                    //     angle = MIN_AZIMUT;
                    //     dx = 1;
                    //
                    //
                    // }
                    // else if (angle > Math.PI - MIN_AZIMUT)
                    // {
                    //     angle = Math.PI - MIN_AZIMUT;
                    //     dx = -1;
                    // }


                    const time = timeStamp - first;

                    if (uiOptions.animateNoise)
                    {
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

                if (!lastCameraPos || !lastCameraPos.equals(camera.position))
                {
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
        raf(onAnimationFrame);

    }
    catch(e)
    {
        console.error("Error in animation loop", e);
    }
}


let width, height;

function setUniform(mat, name, value)
{
    let uniforms = mat.uniforms;
    if (uniforms)
    {
        uniforms[name].value = value
    }
}

// resize
function onResize()
{
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


render(
    <ControlUI
        changeOptions={ opts => uiOptions = opts }
    />,
    document.getElementById("root"),
    () => {
        console.info("ready");
        raf(onAnimationFrame);
    }
);


