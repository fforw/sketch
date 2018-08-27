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

    const out = refPoint.array;

    for (let i = 0; i < positions.length; i += 9)
    {
        let center;
        if (alternatingQuads)
        {
            const centerA = getCenter(positions, i).clone();
            const centerB = getCenter(positions, i + 9);

            center = centerA.add(centerB).multiplyScalar(0.5);
        }
        else
        {
            center = getCenter(positions, i);
        }

        out[i    ] = center.x;
        out[i + 1] = center.y;
        out[i + 2] = center.z;

        out[i + 3] = center.x;
        out[i + 4] = center.y;
        out[i + 5] = center.z;

        out[i + 6] = center.x;
        out[i + 7] = center.y;
        out[i + 8] = center.z;


        if (alternatingQuads)
        {
            i = i + 9;
            out[i    ] = center.x;
            out[i + 1] = center.y;
            out[i + 2] = center.z;

            out[i + 3] = center.x;
            out[i + 4] = center.y;
            out[i + 5] = center.z;

            out[i + 6] = center.x;
            out[i + 7] = center.y;
            out[i + 8] = center.z;
        }
    }
    //console.log("BARYCENTRIC", refPoint);

    return refPoint;
}
