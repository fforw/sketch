const TAU = Math.PI * 2;

function sortAscending(a,b)
{
    return a - b;
}

export default function (geometry) {
    const positions = geometry.attributes.position.array;

    if (geometry.getIndex() != null)
    {
        throw new Error("Only works on non-indexed geometry");
    }

    const length = positions.length;

    const numFaces = length/9;
    const areas = new Array(numFaces);

    for (let i = 0, j = 0; i < length; i += 9, j ++)
    {
        const x1 = positions[i + 3] -positions[i    ];
        const x2 = positions[i + 4] -positions[i + 1];
        const x3 = positions[i + 5] -positions[i + 2];
        const y1 = positions[i + 6] -positions[i    ];
        const y2 = positions[i + 7] -positions[i + 1];
        const y3 = positions[i + 8] -positions[i + 2];

        const t0 = (x2 * y3 - x3 * y2);
        const t1 = (x3 * y1 - x1 * y3);
        const t2 = (x1 * y2 - x2 * y1);
        areas[j] = Math.sqrt( t0*t0 + t1*t1 + t2*t2) / 2;
    }

    // S=12(x2⋅y3−x3⋅y2)2+(x3⋅y1−x1⋅y3)2+(x1⋅y2−x2⋅y1)2−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−√

    areas.sort(sortAscending);

    const half = (numFaces/2)|0;
    
    // even number of values?
    if ((numFaces & 1) === 0)
    {
        return (areas[half - 1] + areas[half])/2;
    }
    else
    {
        return areas[half];
    }
}
