// fragment shader

#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

uniform vec3 color;
uniform float time;
uniform float height;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLightDirection;
varying vec3 vPrimary;
varying float cameraDistance;

uniform float shadow;
uniform float scale;
uniform bool flipEveryOther;

varying vec4 vBarycentric;

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

bool isOnLine(float baryPos, float b, float shadow, float lineDistance, float randomOffset, float lineWidth)
{
    if (b < shadow)
    {
        float len = lineDistance * scale * cameraDistance;

        // because of the fractional below, we calculate in 1/len units (so random values "push" the line correctly into the next slice)
        float invLen = 1.0 / len;

        float pixelHeight = 1.0 / height * invLen;

        float count = floor(baryPos * invLen);

        float random = noise((vWorldPosition + count + vec3(0, randomOffset,0) ) * 1.2 ) * 0.12 * scale * cameraDistance;

        float pos = fract(((baryPos + random) - count * len) * invLen);

        return ( pos < pixelHeight * lineWidth * scale * cameraDistance);
    }
    return false;
}


void main(void) {

    float d =  getShadowMask();
    float c = (1.0 + dot( vNormal, vLightDirection)) / 2.0;
    float b = max(0.0,  c * d);

    float lineScale = height / 800.0;

    float timeFactor = time * 0.0004;

    bool flip = flipEveryOther && vBarycentric.w == 0.0;

    float bx = flip ? vBarycentric.x : 1.0 - vBarycentric.x;
    float by = vBarycentric.y;
    float bz = vBarycentric.z;

    if (isOnLine(     bx, b, shadow      , 0.4, timeFactor + 0.0, 40.0 * lineScale))
    {
        gl_FragColor = vec4(0,0,0,1);
    }
    else if (isOnLine(by, b, shadow * 0.8, 0.3, timeFactor + 11.0, 40.0* lineScale))
    {
        gl_FragColor = vec4(0,0,0,1);
    }
    else if (isOnLine(by, b, shadow * 0.5, 0.25, timeFactor + 2.0, 50.0* lineScale))
    {
        gl_FragColor = vec4(0,0,0,1);
    }
    else if (isOnLine(bz, b, shadow * 0.4, 0.2, timeFactor - 3.0, 60.0 * lineScale))
    {
        gl_FragColor = vec4(0,0,0,1);
    }
    else if (isOnLine(bx, b, shadow * 0.1, 0.15, timeFactor + 14.0, 60.0 * lineScale))
    {
        gl_FragColor = vec4(0,0,0,1);
    }
    else
    {
        float factor = 0.0;

        if (isOnLine(bx, 0.0, 1.0, 0.15, timeFactor + 141.0, 60.0 * lineScale))
        {
            factor = factor + 0.33;
        }
        if (isOnLine(by, 0.0, 1.0, 0.14, timeFactor + 214.0, 60.0 * lineScale))
        {
            factor = factor + 0.33;
        }
        if (isOnLine(bz, 0.0, 1.0, 0.16, timeFactor + 214.0, 60.0 * lineScale))
        {
            factor = factor + 0.33;
        }

        vec3 col = mix( vec3(1,1,1), color, factor);

        gl_FragColor = vec4(col.x,col.y,col.z, 1);
    }
}
