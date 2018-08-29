import shadesFactory, { countPixelRatio } from "./util/shadesFactory";

const container = document.getElementById("root");

const canvas = shadesFactory();

container.appendChild(canvas);

const ratios = countPixelRatio(canvas.getContext("2d"));

console.log("Ratios: ", ratios.map((e,i) => "#" + i +": ratio = " + e.ratio + "(error = " + Math.round(e.error * 1000) / 1000 + ")" ).join("\n"));

