import {
    BufferAttribute,
    Plane,
    Vector3
} from "three";


const TAU = Math.PI * 2;

function sortByDeltaAscending(a,b)
{
    return a.delta - b.delta;
}

export const DOWN = new Vector3(0,-1,0);
export const LEFT = new Vector3(-1,0,0);

const EDGE_INDEXES = [
    [0,3,6],
    [3,6,0],
    [6,0,3],
];

const vPoint0 = new Vector3(0,0,0);
const vPoint1 = new Vector3(0,0,0);
const vTmp = new Vector3(0,0,0);

export default function (geometry, flipEveryOther = true, vPrimary = DOWN, vSecondary = LEFT)
{
    const positions = geometry.attributes.position.array;

    // the primary plane lies in the direction of the primary vector, safely outside of the scene
    const primaryPlane = new Plane();
    primaryPlane.setFromNormalAndCoplanarPoint(vPrimary, vPrimary.clone().multiplyScalar(1000));

    // the primary plane lies in the direction of the primary vector, safely outside of the scene
    const secondaryPlane = new Plane();
    secondaryPlane.setFromNormalAndCoplanarPoint(vSecondary, vSecondary.clone().multiplyScalar(1000));

    // Build new attribute storing barycentric coordinates
    // for each vertex
    const barycentric = new BufferAttribute(new Float32Array(positions.length * 4 / 3), 4);

    const out = barycentric.array;

    let flip = false;
    for (let i = 0, j = 0; i < positions.length; i += 9, j += 12)
    {

        // an edge is all points in an triangle where one of the barycentric components is 1
        const edges = [null,null,null];

        // if (i === 99)
        // {
            for (let k=0; k < 3; k++)
            {
                const [idx0, idx1, idx2] = EDGE_INDEXES[k];

                vPoint0.x = positions[ i + idx0    ];
                vPoint0.y = positions[ i + idx0 + 1];
                vPoint0.z = positions[ i + idx0 + 2];

                vPoint1.x = positions[ i + idx1    ];
                vPoint1.y = positions[ i + idx1 + 1];
                vPoint1.z = positions[ i + idx1 + 2];

                edges[k] = {
                    other: idx2,
                    delta: Math.abs(primaryPlane.distanceToPoint(vPoint0) - primaryPlane.distanceToPoint(vPoint1)),
                    start: vPoint0.clone(),
                    end: vPoint1.clone(),
                    vector: vPoint1.clone().sub(vPoint0)
                };
            }

            let primaryEdge, secondaryEdge, tertiaryEdge;
            if ( edges[0].delta === edges[1].delta &&
                edges[0].delta === edges[2].delta)
            {
                const aOrthogonalToB = edges[0].vector.dot(edges[1].vector) === 0;
                const bOrthogonalToC = edges[1].vector.dot(edges[2].vector) === 0;
                const cOrthogonalToA = edges[2].vector.dot(edges[0].vector) === 0;

                if (aOrthogonalToB)
                {
                    const deltaA = Math.abs(secondaryPlane.distanceToPoint(edges[0].start) - secondaryPlane.distanceToPoint(edges[0].end));
                    const deltaB = Math.abs(secondaryPlane.distanceToPoint(edges[1].start) - secondaryPlane.distanceToPoint(edges[1].end));

                    if ( deltaA < deltaB)
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

                    if ( deltaB < deltaC)
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

                    if ( deltaC < deltaA)
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

        //     console.log("edges", edges);
        // }
        // else
        // {
        //     continue;
        // }


        //console.log({primaryEdge, secondaryEdge, tertiaryEdge});

        out[ j     ] = primaryEdge === 0 ? 1: 0;
        out[ j +  1] = primaryEdge === 3 ? 1: 0;
        out[ j +  2] = primaryEdge === 6 ? 1: 0;
        out[ j +  3] = flip ? 1 : 0;

        out[ j +  4] = secondaryEdge === 0 ? 1: 0;
        out[ j +  5] = secondaryEdge === 3 ? 1: 0;
        out[ j +  6] = secondaryEdge === 6 ? 1: 0;
        out[ j +  7] = flip ? 1 : 0;

        out[ j +  8] = tertiaryEdge === 0 ? 1: 0;
        out[ j +  9] = tertiaryEdge === 3 ? 1: 0;
        out[ j + 10] = tertiaryEdge === 6 ? 1: 0;
        out[ j + 11] = flip ? 1 : 0;

        if (flipEveryOther)
        {
            flip = !flip;
        }
    }
    //console.log("BARYCENTRIC", barycentric);

    return barycentric;
}
