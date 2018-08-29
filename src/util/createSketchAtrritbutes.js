import {
    BufferAttribute,
    Plane,
    Vector3
} from "three";


const TAU = Math.PI * 2;

const vCenter = new Vector3(0, 0, 0);

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

function sortByDeltaAscending(a, b)
{
    return a.delta - b.delta;
}

export const DOWN = new Vector3(0, -1, 0);
export const LEFT = new Vector3(-1, 0, 0);

const EDGE_INDEXES = [
    [0, 3, 6],
    [3, 6, 0],
    [6, 0, 3],
];

const vPoint0 = new Vector3(0, 0, 0);
const vPoint1 = new Vector3(0, 0, 0);
const vNormalA = new Vector3(0, 0, 0);
const vNormalB = new Vector3(0, 0, 0);

const edges = [null, null, null];

export default function (geometry, vPrimary = DOWN, vSecondary = LEFT) {
    const positions = geometry.attributes.position.array;
    const normals = geometry.attributes.normal.array;

    // the primary plane lies in the direction of the primary vector, safely outside of the scene
    const primaryPlane = new Plane();
    primaryPlane.setFromNormalAndCoplanarPoint(vPrimary, vPrimary.clone().multiplyScalar(1000));

    // the primary plane lies in the direction of the primary vector, safely outside of the scene
    const secondaryPlane = new Plane();
    secondaryPlane.setFromNormalAndCoplanarPoint(vSecondary, vSecondary.clone().multiplyScalar(1000));

    // Build new attribute storing barycentric coordinates
    // for each vertex
    const barycentric = new BufferAttribute(new Float32Array(positions.length * 4 / 3), 4);
    const refPoint = new BufferAttribute(new Float32Array(positions.length), 3);

    const baryArray = barycentric.array;
    const rpArray = refPoint.array;

    let length = positions.length;
    let last = positions.length - 9;

    let prevFaceWasCoplanar = false;

    for (let i = 0, j = 0; i < length; i += 9, j += 12)
    {
        for (let k = 0; k < 3; k++)
        {
            const [idx0, idx1, idx2] = EDGE_INDEXES[k];

            vPoint0.x = positions[i + idx0];
            vPoint0.y = positions[i + idx0 + 1];
            vPoint0.z = positions[i + idx0 + 2];

            vPoint1.x = positions[i + idx1];
            vPoint1.y = positions[i + idx1 + 1];
            vPoint1.z = positions[i + idx1 + 2];

            edges[k] = {
                other: idx2,
                delta: Math.abs(primaryPlane.distanceToPoint(vPoint0) - primaryPlane.distanceToPoint(vPoint1)),
                start: vPoint0.clone(),
                end: vPoint1.clone(),
                vector: vPoint1.clone().sub(vPoint0)
            };
        }

        let primaryEdge, secondaryEdge, tertiaryEdge;
        if (edges[0].delta === edges[1].delta &&
            edges[0].delta === edges[2].delta)
        {
            const aOrthogonalToB = edges[0].vector.dot(edges[1].vector) === 0;
            const bOrthogonalToC = edges[1].vector.dot(edges[2].vector) === 0;
            const cOrthogonalToA = edges[2].vector.dot(edges[0].vector) === 0;

            if (aOrthogonalToB)
            {
                const deltaA = Math.abs(secondaryPlane.distanceToPoint(edges[0].start) - secondaryPlane.distanceToPoint(edges[0].end));
                const deltaB = Math.abs(secondaryPlane.distanceToPoint(edges[1].start) - secondaryPlane.distanceToPoint(edges[1].end));

                if (deltaA < deltaB)
                {
                    primaryEdge = 0;
                    secondaryEdge = 3;
                    tertiaryEdge = 6;
                }
                else
                {
                    primaryEdge = 3;
                    secondaryEdge = 0;
                    tertiaryEdge = 6;
                }
            }
            else if (bOrthogonalToC)
            {
                const deltaB = Math.abs(secondaryPlane.distanceToPoint(edges[1].start) - secondaryPlane.distanceToPoint(edges[1].end));
                const deltaC = Math.abs(secondaryPlane.distanceToPoint(edges[2].start) - secondaryPlane.distanceToPoint(edges[2].end));

                if (deltaB < deltaC)
                {
                    primaryEdge = 3;
                    secondaryEdge = 6;
                    tertiaryEdge = 0;
                }
                else
                {
                    primaryEdge = 6;
                    secondaryEdge = 3;
                    tertiaryEdge = 0;
                }
            }
            else if (cOrthogonalToA)
            {
                const deltaC = Math.abs(secondaryPlane.distanceToPoint(edges[2].start) - secondaryPlane.distanceToPoint(edges[2].end));
                const deltaA = Math.abs(secondaryPlane.distanceToPoint(edges[0].start) - secondaryPlane.distanceToPoint(edges[0].end));

                if (deltaC < deltaA)
                {
                    primaryEdge = 6;
                    secondaryEdge = 0;
                    tertiaryEdge = 3;
                }
                else
                {
                    primaryEdge = 0;
                    secondaryEdge = 6;
                    tertiaryEdge = 3;
                }
            }
        }
        else
        {
            edges.sort(sortByDeltaAscending);

            primaryEdge = edges[0].other;

            if (edges[0].vector.dot(edges[1].vector) === 0)
            {
                secondaryEdge = edges[2].other;
                tertiaryEdge = edges[1].other;
            }
            else
            {
                secondaryEdge = edges[1].other;
                tertiaryEdge = edges[2].other;
            }

        }

        let nextFaceIsCoplanar = false;
        if (i < last)
        {
            vNormalA.set(
                normals[i    ],
                normals[i + 1],
                normals[i + 2]
            );
            vNormalB.set(
                normals[i + 9],
                normals[i + 10],
                normals[i + 11]
            );

            nextFaceIsCoplanar = (vNormalA.dot(vNormalB) >= 0.9999);
        }

        //console.log({primaryEdge, secondaryEdge, tertiaryEdge});

        baryArray[j     ] = primaryEdge === 0 ? 1 : 0;
        baryArray[j +  1] = primaryEdge === 3 ? 1 : 0;
        baryArray[j +  2] = primaryEdge === 6 ? 1 : 0;

        baryArray[j +  4] = secondaryEdge === 0 ? 1 : 0;
        baryArray[j +  5] = secondaryEdge === 3 ? 1 : 0;
        baryArray[j +  6] = secondaryEdge === 6 ? 1 : 0;

        baryArray[j +  8] = tertiaryEdge === 0 ? 1 : 0;
        baryArray[j +  9] = tertiaryEdge === 3 ? 1 : 0;
        baryArray[j + 10] = tertiaryEdge === 6 ? 1 : 0;

        baryArray[j +  3] = prevFaceWasCoplanar ? 1 : 0;
        baryArray[j +  7] = prevFaceWasCoplanar ? 1 : 0;
        baryArray[j + 11] = prevFaceWasCoplanar ? 1 : 0;


        if (prevFaceWasCoplanar)
        {
            rpArray[i    ] = rpArray[i - 9];
            rpArray[i + 1] = rpArray[i - 8];
            rpArray[i + 2] = rpArray[i - 7];

            rpArray[i + 3] = rpArray[i - 6];
            rpArray[i + 4] = rpArray[i - 5];
            rpArray[i + 5] = rpArray[i - 4];

            rpArray[i + 6] = rpArray[i - 3];
            rpArray[i + 7] = rpArray[i - 2];
            rpArray[i + 8] = rpArray[i - 1];
        }
        else
        {
            /// calculate distance reference points for each face
            let center;
            if (nextFaceIsCoplanar)
            {
                const centerA = getCenter(positions, i).clone();
                const centerB = getCenter(positions, i + 9);

                center = centerA.add(centerB).multiplyScalar(0.5);
            }
            else
            {
                center = getCenter(positions, i);
            }

            rpArray[i    ] = center.x;
            rpArray[i + 1] = center.y;
            rpArray[i + 2] = center.z;

            rpArray[i + 3] = center.x;
            rpArray[i + 4] = center.y;
            rpArray[i + 5] = center.z;

            rpArray[i + 6] = center.x;
            rpArray[i + 7] = center.y;
            rpArray[i + 8] = center.z;
        }

        prevFaceWasCoplanar = nextFaceIsCoplanar;
    }
    //console.log("BARYCENTRIC", barycentric);

    geometry.addAttribute("barycentric", barycentric);
    geometry.addAttribute("refPoint", refPoint);

}
