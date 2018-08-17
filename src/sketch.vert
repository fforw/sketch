// vertex shader

#include <shadowmap_pars_vertex>

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    #include <shadowmap_vertex>

    // store the world position as varying for lighting
    vWorldPosition = worldPosition.xyz;
    
    vNormal = normalMatrix * vec3(normal);

    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}
