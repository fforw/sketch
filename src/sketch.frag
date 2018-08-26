// fragment shader

#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

uniform vec3 color;
uniform float opacity;
uniform float time;
uniform float height;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLightDirection;
varying vec3 vPrimary;

uniform float shadow;
uniform float scale;

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

vec4 isOnLine(float pos, float num, float primaryPixelLen, float pixelHeight)
{
    float inv = 1.0/num;

    float lenofPart = primaryPixelLen * inv;

    if (lenofPart < pixelHeight)
    {
        return vec4(0,1,1,1);
    }

    float posInPixel = fract(pos * inv) * lenofPart;

    return (posInPixel < pixelHeight * 8.0 ) ? vec4(0,0,0,1) : vec4(1,1,1,1);
}

void main(void) {

        float d =  getShadowMask();
        float c = (1.0 + dot( vNormal, vLightDirection)) / 2.0;
        float b = max(0.0,  c * d);

        //float pixelHeight = 1.0/height;

        float len = 0.02 * scale;

        float count = floor(vBarycentric.y / len);

        float random = noise((vWorldPosition + count) * 2.2) * 0.004 * scale;

        float pos = fract(((vBarycentric.y + random) - count * len) / len);

        float pos0 = fract(((vBarycentric.z + random) - count * len) / len);

        float shadowHalf = shadow/3.0;

        if (pos0 < 0.39)
        {
            gl_FragColor = vec4(color.x,color.y,color.z,1);
        }
        else
        {
            gl_FragColor = vec4(1,1,1,1);
        }

        if (b < shadow)
        {
            float v = min(b / shadow, 0.6);

            if ( pos > v && pos < 0.8)
            {
                gl_FragColor = vec4(0,0,0,1);
            }

            if (b < shadowHalf)
            {
                float len2 = 0.03 * scale;
                float count2 = floor(vBarycentric.x / len);

                float random2 = noise((vWorldPosition + count2)* 2.0 ) * 0.004 * scale;

                float pos2 = fract(((vBarycentric.x + random2) - count2 * len2) / len2);

                float v2 = b / shadow;

                if ( pos2 > v2 && pos2 < 0.97)
                {
                    gl_FragColor = vec4(0,0,0,1);
                }
            }
        }
//
//        vec3 randomPos = vWorldPosition * 40.0;
//        vec3 randomPos2 = vLightDirection * 30.0;
//
//        float n = (noise(randomPos) + noise(randomPos2))/2.0;
//
//        float dist = (1.0 - gl_FragCoord.y ) * height  / vPrimary.y + n / 5.0;
//        float pos = fract(dist);
//
//        float primaryLen = length(vPrimary);
//
//        float pixelHeight = 1.0/height;
//
//
//        if (b < 0.8)
//        {
//            gl_FragColor = isOnLine(pos, 4.0, primaryLen, pixelHeight);
//        }
//        else
//        {
//            gl_FragColor = vec4(1, 0, 1, 1);
//        }
//
//    }
//

}
