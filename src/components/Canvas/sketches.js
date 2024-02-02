import random from "canvas-sketch-util/random";
import math from "canvas-sketch-util/math";
import "./index.css";

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

export const params = {
  animate: true,
  cols: 6,
  rows: 6,
  frameScale: 10,
  angleRange: 1.2,
  cellScale: 0.5,
  lineCap: "round",
  scaleMin: 3,
  scaleMax: 9,
  frequency: 0.0003,
  frame: 0,
  wScale: 0.43,
  numCircles: 30,
  gapCircle: 2,
  gapDot: 2,
  dotRadius: 12,
  cirRadius: 0,
  cursor: {x: 9999, y: 9999},
  particles: []
};

const drawDotGrid = (context, frame, options) => {
  // context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  // context.fillStyle = '#000000'
  // context.beginPath()
  // context.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  // context.fill()

  // context.fillStyle = "linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)";
  // context.fillRect(0, 0, dims.width, dims.height);
  // console.log("frame ", frame);
  const cols = options.cols ? options.cols : params.cols;
  const rows = options.rows ? options.rows : params.rows;

  let larger = cols;
  if (cols < rows) larger = rows;

  const numCells = options.total ? options.total : larger ** 2;
  const gridw = options.width * 0.9;
  const gridh = options.height * 0.9;
  const cellw = gridw / larger;
  // const cellh = gridh / rows;
  const cellh = gridh / larger;
  const margx = (options.width - gridw) * 0.5;
  const margy = (options.height - gridh) * 0.5;
  // We iterate through the number of cells on the grid

  for (let currentCell = 0; currentCell < numCells; currentCell++) {
    // we use mod to know the col we're on
    // this works because we keep adding more cells from LTR
    const col = currentCell % larger;
    const row = Math.floor(currentCell / larger);

    const w = cellw * params.cellScale;
    const h = cellh * 0.8;
    let radius = w;
    const gapx = cellw + 2 * radius;
    const gapy = cellh + 2 * radius;
    const x = col * radius + margx * 0.5;
    const y = row * radius + margy * 0.5;
    // const x = col * cellw + margx + cellw*0.5
    // const y = row * cellh + margy + cellh*0.5

    const f = params.animate ? frame : params.frame;
    const n = random.noise3D(x, y, f * params.frameScale, params.frequency);

    radius = radius * math.mapRange(n, -1, 1, 0.001, 1);
    const angle = n * Math.PI * params.angleRange;
    const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
    if (x < gridw - radius * 2 && y < gridh - radius * 2) {
      context.save();
      context.lineWidth = scale * 0.4;
      context.lineCap = params.lineCap;
      context.translate(x, y);
      // context.rotate(angle)
      context.beginPath();
      // context.moveTo(w*-0.5,0)
      // context.lineTo(w*params.wScale, 0)
      let gapTtlX = radius;
      let gapTtlY = radius;
      context.arc(x + gapTtlX, y + gapTtlY, radius * 0.5, 0, Math.PI * 2);
      const scaleAvg = Math.floor((params.scaleMin + params.scaleMax) * 0.5);
      // ran = math.mapRange(ran, 0, 1, params.scaleMin, params.scaleMax)
      // console.log("options drawRands ", options.drawRands[currentCell]);

      if (options.drawRands[currentCell] >= 0.75) {
        context.fillStyle = options.colors[1].hex;
        context.fill();
      }
      if (options.drawRands[currentCell] < 0.5) {
        if (options.drawRands[currentCell] <= 0.25) {
          context.fillStyle = options.colors[0].hex;
          context.fill();
        } else {
          context.fillStyle = options.colors[2].hex;
          context.fill();
        }
      }
      if (options.drawRands[currentCell] >= 0.5) {
        context.fillStyle = options.colors[0].hex;
        context.fill();
      }

      if (!options.drawRands[currentCell]) {
        context.fillStyle = random.pick(options.colors).hex;
        context.fill();
      }
      context.restore();
    }
  }
};

const drawType = (context, frame, options) => {
  const typeContext = options.typeOptions?.typeContext;
  const cell = options.cell;
  const cols = options.typeOptions.cols;
  const rows = options.typeOptions.rows;
  const numCells = options.typeOptions.numCells;
  const fontOptions = {
    family: "Arial",
    size: cols * 1.2,
    color: "black",
    text: options.text ? options.text : "A",
  };


  typeContext.fillStyle = "black";
  typeContext.fillRect(0, 0, cols, rows);

  typeContext.fillStyle = "white";
  typeContext.font = `${fontOptions.size}px ${fontOptions.family}`;
  typeContext.textBaseline = "top";


  const metrics = typeContext.measureText(fontOptions.text);
  const mx = metrics.actualBoundingBoxLeft * -1;
  const my = metrics.actualBoundingBoxAscent * -1;
  const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  const tx = (cols - mw) * 0.5 - mx;
  const ty = (rows - mh) * 0.5 - my;

  typeContext.save();
  typeContext.translate(tx, ty);

  typeContext.beginPath();
  typeContext.rect(mx, my, mw, mh);
  typeContext.stroke();

  // console.log(options.text);
  typeContext.fillText(options.text, 0, 0);
  typeContext.restore();

  const typeData = typeContext.getImageData(0, 0, options.typeOptions.cols, options.typeOptions.rows)
      .data;

  // context.fillStyle = "black";
  // context.fillRect(0, 0, options.width, options.height);

  context.textBaseline = "middle";
  context.textAlign = "center";

  // context.drawImage(options.typeOptions.typeCanvas, 0, 0);

  for (let i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = col * cell;
    const y = row * cell;

    const r = typeData[i * 4 + 0];
    const g = typeData[i * 4 + 1];
    const b = typeData[i * 4 + 2];
    const a = typeData[i * 4 + 3];

    const glyph = getGlyph(r);

    context.font = `${cell * 2}px ${fontOptions.family}`;
    if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontOptions.family}`;

    context.fillStyle = "white";

    context.save();
    context.translate(x, y);
    context.translate(cell * 0.5, cell * 0.5);

    // context.fillRect(0, 0, cell, cell);

    context.fillText(glyph, 0, 0);

    context.restore();
  }
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '';

  const glyphs = '_= /o'.split('');

  return random.pick(['DT', ...glyphs]);
};

function resizeCanvasToDisplaySize(canvas) {
  const {width, height} = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true; // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
  }

  return false;
}

function resizeCanvas(canvas) {
  const {width, height} = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const {devicePixelRatio: ratio = 1} = window;
    const context = canvas.getContext("2d");
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }

  return false;
}

const postdraw = (index, ctx) => {
  ctx.restore();
  return index + 1;
};

const predraw = (context, canvas) => {
  context.save();
  resizeCanvas(canvas);
  const {width, height} = context.canvas;
  context.clearRect(0, 0, width, height);
};

export {
  drawDotGrid,
  drawType,
  resizeCanvas,
  resizeCanvasToDisplaySize,
  predraw,
  postdraw,
};
