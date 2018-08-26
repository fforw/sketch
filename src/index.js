// noinspection ES6UnusedImports
import STYLES from "./style.css"
import raf from "raf"
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
    BufferGeometry
} from "three";

import glslify from "glslify";
import barycentric from "./util/barycentric";

const OrbitControls = require("three-orbit-controls")(require("three"));


const fragmentShader = glslify("./sketch.frag");
const vertexShader = glslify("./sketch.vert");

const camera = new PerspectiveCamera();

// scene
const scene = new Scene();

const controls = new OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.5;

// ambient
//scene.add(new AmbientLight(0x222222));

const LIGHT_X = 0;
const LIGHT_Y = 200;
const LIGHT_Z = 100;

const TAU = Math.PI * 2;

const lightDirection = new Vector3(LIGHT_X, LIGHT_Y, LIGHT_Z).normalize();


// light
const light = new DirectionalLight(0xffffff, 1);
light.position.set(LIGHT_X, LIGHT_Y, LIGHT_Z);
light.castShadow = true; // default false

light.shadow.bias = 0.001;
light.shadow.radius = 0.5;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

scene.add(light);

/**
 *
 * @param {string|number} color
 * @param scale
 * @return {ShaderMaterial}
 */
function createMaterial(color = 0xffffff, scale = 1 )
{

    let uniforms = UniformsUtils.merge([
        ShaderLib.shadow.uniforms,
        {
            /**
             * Light face color, gets speckled with white
             */
            color: {
                value: new Color( color )
            },
            // unused
            opacity: {
                value: 1.0
            },
            // direction of the directional light
            lightDirection: {
                type: "v3",
                value: lightDirection
            },

            // minimal shadow value
            shadow: {
                type: 'f',
                value: 0.6
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
                value: scale
            },
            time: {
                type: 'f',
                value: 0
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

const cubeMat = createMaterial(0xfff3c4, 0.5);
const cube2Mat = createMaterial(0xdff0f0);
const groundMat = createMaterial(0xfaf0ef, 0.2);
const icoMat = createMaterial(0xf2f9e2, 4);

const icoGeometry = withBarycentricCoordinates(new IcosahedronGeometry(2, 2));
const icoMesh = new Mesh( icoGeometry, icoMat );
icoMesh.position.x = 2;
icoMesh.position.z = -5;
icoMesh.position.y = 1.5;
icoMesh.castShadow = true;
icoMesh.receiveShadow = true;

scene.add(icoMesh);



function withBarycentricCoordinates(geometry)
{
    const buffer = new BufferGeometry();
    buffer.fromGeometry(geometry);

    const nonIndexed = buffer.toNonIndexed();

    nonIndexed.addAttribute("barycentric", barycentric(nonIndexed));

    return nonIndexed;
}

function createBox(width, height, depth)
{
    return withBarycentricCoordinates(
        new CubeGeometry(
            width,
            height,
            depth
        )
    );
}

const cubeGeometry = createBox(3, 8, 3);
const cubeMesh = new Mesh(cubeGeometry, cubeMat);
cubeMesh.position.x = 1;
cubeMesh.position.y = 4;
cubeMesh.position.z = 1;
cubeMesh.castShadow = true;
cubeMesh.receiveShadow = true;

console.log("CUBE GEOM", cubeGeometry);
scene.add(cubeMesh);

const cube2Geometry = createBox(5, 3, 3);

const cube2Mesh = new Mesh(cube2Geometry, cube2Mat);
cube2Mesh.position.x = -3.5;
cube2Mesh.position.y = 1.5;
cube2Mesh.position.z = -2;
cube2Mesh.castShadow = true;
cube2Mesh.receiveShadow = true;

scene.add(cube2Mesh);

const ground = createBox(20, 6, 20);
const groundMesh = new Mesh(ground, groundMat);
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
renderer.setClearColor(new Color(0xf0f0f0));

const shadowHelper = new CameraHelper(light.shadow.camera);
scene.add(shadowHelper);

const MIN_AZIMUT = TAU / 72;

let angle = TAU/4;
let dx = 1;

let last = 0;
let first = 0;

const STEP = 1/100 * 1000;

// render loop
function onAnimationFrame(timeStamp)
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
            angle += dx * delta / 20000;

            if (angle < MIN_AZIMUT)
            {
                angle = MIN_AZIMUT;
                dx = 1;

                
            }
            else if (angle > Math.PI - MIN_AZIMUT)
            {
                angle = Math.PI - MIN_AZIMUT;
                dx = -1;
            }


            const time = timeStamp -first;

            icoMat.uniforms.time.value = time;
            cubeMat.uniforms.time.value = time;
            cube2Mat.uniforms.time.value = time;
            groundMat.uniforms.time.value = time;


            delta -= STEP;
            last += STEP;

            scene.update && scene.update(last);
        }

        controls.update();
    }

    renderer.render(scene, camera);
    raf(onAnimationFrame);
}

raf(onAnimationFrame);

let width, height;

// resize
function onResize()
{
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    icoMat.uniforms.height.value = height;
    cubeMat.uniforms.height.value = height;
    cube2Mat.uniforms.height.value = height;
    groundMat.uniforms.height.value = height;

}

onResize();
window.addEventListener("resize", onResize);

// dom
document.body.appendChild(renderer.domElement);






