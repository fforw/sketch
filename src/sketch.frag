// fragment shader

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

uniform vec3 color;
uniform float opacity;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 lightPosition;

void main(void) {

    vec3 lightDirection = normalize(lightPosition - vWorldPosition);

    float d = getShadowMask();
    float c = max(0.0, dot(vNormal, lightDirection));

    if (c * d < 0.4)
    {
        // simpliest hardcoded lighting ^^

        gl_FragColor = vec4(0, 0, 0, 1);
    }
    else
    {
        gl_FragColor = vec4(255,255,255,1);
    }

}
