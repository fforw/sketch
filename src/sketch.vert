// vertex shader

#include <shadowmap_pars_vertex>

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLightDirection;
varying vec3 vPrimary;

uniform vec3 lightDirection;
uniform vec3 primary;

attribute vec3 barycentric;
varying vec3 vBarycentric;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}


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

    float offset = noise(position) * 0.1;
    pos.x += offset - 0.5;


    gl_Position = pos;

    vBarycentric = barycentric;
}


