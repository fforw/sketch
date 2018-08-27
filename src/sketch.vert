// vertex shader

#include <shadowmap_pars_vertex>

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLightDirection;
varying vec3 vPrimary;
varying float cameraDistance;

uniform vec3 lightDirection;
uniform vec3 primary;
uniform vec3 camera;

attribute vec4 barycentric;
attribute vec3 refPoint;
varying vec4 vBarycentric;

void main() {

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    #include <shadowmap_vertex>

    // store the world position as varying for lighting
    vWorldPosition = worldPosition.xyz;
    
    vNormal = normalMatrix * vec3(normal);

    vLightDirection = normalMatrix * lightDirection;

    vPrimary = (projectionMatrix *
               modelViewMatrix *
               vec4(primary,1.0)).xyz;

    vec4 pos = projectionMatrix *
               modelViewMatrix *
               vec4(position,1.0);

    gl_Position = pos;

    cameraDistance = distance(camera, refPoint);

    vBarycentric = barycentric;
}
