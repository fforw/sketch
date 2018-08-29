import {
    BufferAttribute,
    Plane,
    Vector3
} from "three";


const TAU = Math.PI * 2;

const vCenter = new Vector3(0,0,0);

function getCenter(positions, index)
{
    vCenter.x = (
            positions[index] +
            positions[index + 3] +
            positions[index + 6]
        ) / 3;

    vCenter.y = (
            positions[index + 1] +
            positions[index + 4] +
            positions[index + 7]
        ) / 3;

    vCenter.z = (
            positions[index + 2] +
            positions[index + 5] +
            positions[index + 8]
        ) / 3;


    return vCenter;
}

export default function (geometry, alternatingQuads = true) {
    const positions = geometry.attributes.position.array;

    // Build new attribute storing refPoint coordinates
    // for each vertex
    const refPoint = new BufferAttribute(new Float32Array(positions.length), 3);

    const rpArray = refPoint.array;

    for (let i = 0; i < positions.length; i += 9)
    {
    }
    //console.log("BARYCENTRIC", refPoint);

    return refPoint;
}
