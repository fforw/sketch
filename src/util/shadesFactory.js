import SimplexNoise from "./noise";

const WIDTH = 256;
const HEIGHT = 256;

const PADDING = 0;

const SHADES = 16;

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const LINE_WIDTH = 1;
const LINE_RESOLUTION = 8;

const noise = new SimplexNoise();

function draw(ctx, x, y, ident, isMove = false)
{
    const err = noise.noise2D(x * 0.003 + ident, y * 0.003) * 1.7;

    const y2 = (y + err)|0;

    if (isMove)
    {
        ctx.moveTo(x, y2);
    }
    else
    {
        ctx.lineTo(x, y2);
    }
}

function drawPattern(ctx, x, y, w, h, brightness)
{
    let pos = 0;
    let b = 0;
    const step = GOLDEN_RATIO * h;

    const brightnessStep = LINE_WIDTH / h;

    let randomIdent = 0;
    for (let b = 0; b <= brightness; b += brightnessStep)
    {
        ctx.beginPath();

        const xStep = w / LINE_RESOLUTION;

        draw(ctx, x, (y + pos) | 0, 0, true);

        for (let xc = xStep; xc <= w; xc += xStep)
        {
            draw(ctx, (x + xc) | 0, (y + pos) | 0, randomIdent);
        }
        ctx.stroke();

        pos = (pos + step) % h;
        randomIdent++;
    }
}

/**
 * Counts the pixels in each texture tile and prints the actual ratio of black pixel and the error rate to the ideal
 * ratio.
 */
export function countPixelRatio(ctx)
{

    const w = (WIDTH / 4) | 0;
    const h = (HEIGHT / 4) | 0;

    const lineWidth = WIDTH * 4;

    const {data} = ctx.getImageData(0, 0, WIDTH, HEIGHT);

    console.log("buffer size = ", data.length);

    // we only generate from 0 to 1/3 because we're overlaying three of these tiles in barycentric directions.
    const step = 1 / SHADES / 3;
    let brightness = step;

    const len = Math.sqrt(SHADES);

    const array = new Array(SHADES);
    let i = 0;
    for (let y = 0; y < len; y++)
    {
        for (let x = 0; x < len; x++)
        {
            min = Infinity;
            max = -Infinity;
            const ratio = countPattern(ctx, data, x * w + PADDING, y * h + PADDING, w - PADDING - PADDING, h - PADDING - PADDING, lineWidth);
            brightness += step;

            array[i++] = {
                ratio,
                error: 1 - ratio / brightness
            };
        }
    }
    console.log(JSON.stringify(array, null, 4));

    return array;
}

let min = Infinity, max = -Infinity;

function countPattern(ctx, data, x, y, w, h, lineWidth)
{
    let count = 0;

    for (let yc = 0; yc < h; yc++)
    {
        for (let xc = 0; xc < w; xc++)
        {
            const offset = (y + yc) * lineWidth + (x + xc) * 4;
            const value = data[offset + 3];

            //console.log("value at ", offset, "is", value);

            min = Math.min(min, offset);
            max = Math.max(max, offset);

            if (value >= 128)
            {
                count++;
            }
        }

    }
    return count / (w * h);
}

/**
 * Renders the shades texture into a HTML canvas and returns that canvas
 * @return {HTMLCanvasElement}
 */
export default function()
{
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx = canvas.getContext("2d");

    const w = (WIDTH / 4) | 0;
    const h = (HEIGHT / 4) | 0;

    console.log("pattern size", w, h);

    // we only generate from 0 to 1/3 because we're overlaying three of these tiles in barycentric directions.
    const step = 1/3/SHADES;
    let brightness = step;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = LINE_WIDTH;
    for (let y = 0; y < 4; y++)
    {
        for (let x = 0; x < 4; x++)
        {
            drawPattern(ctx, x * w + PADDING, y * h + PADDING, w - PADDING - PADDING, h - PADDING - PADDING, brightness);
            brightness += step;
        }
    }

    return canvas;
}
