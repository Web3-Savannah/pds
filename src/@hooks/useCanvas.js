import {useEffect, useMemo, useRef, useState} from "react";
import colors from "riso-colors";
import random from "canvas-sketch-util/random";
import {params} from "../components/Canvas/sketches";

const initTypeOptions = ({dims}) => {

  const cell = 10;
  const cols = Math.floor(dims.w / cell);
  const rows = Math.floor(dims.h / cell);
  const numCells = cols * rows;
  const typeCanvas = document.createElement("canvas");
  const typeContext = typeCanvas.getContext("2d");

  typeCanvas.width = cols;
  typeCanvas.height = rows;
  return ({
    typeCanvas,
    typeContext,
    cell,
    cols,
    rows,
    numCells
  })
}
const useCanvas = (draw, dims, options = {}, { predraw, postdraw }) => {
  const canvasRef = useRef(null);
  const [text, setText] = useState('HI');
  const typeOptions = useMemo(() => {
    return initTypeOptions({dims})
  }, [dims])
  const drawRands = useMemo(() => {
    let totalAdded = params.rows;
    if (params.cols > params.rows) {
      totalAdded = params.cols;
    }
    totalAdded = totalAdded ** 2;
    let arr = []
    for (let i = 0; i < totalAdded; i++) {
      arr.push(Math.random());
    }
    return arr;
  }, [params, text])
  const selectedColors = [
    "Midnight",
    "Cornflower",
    "Light Mauve",
    "White",
    "Fluorescent Pink",
    "Granite",
    "Black",
    "Light Lime",
    "Fluorescent Yellow",
  ];

  const onKeyUp = (e) => {
    setText(e.key.toUpperCase());
  };

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    let dotColors = colors.filter((color) => {
      return selectedColors.includes(color.name);
    });
    const drawColors = [
      random.pick(dotColors),
      random.pick(dotColors),
      random.pick(dotColors),
    ];
    const render = () => {
      predraw(context, canvas);
      const dotOptions = {
        width: dims.w,
        height: dims.h,
        colors: drawColors,
        cols: params.cols,
        rows: params.rows,
        drawRands,
      }

      const textOptions = {
        width: dims.w,
        height: dims.h,
        colors: drawColors,
        cols: typeOptions?.cols ? typeOptions?.cols : params.cols,
        rows: typeOptions?.rows ? typeOptions?.rows : params.rows,
        typeOptions,
        drawRands,
        text,
        cell: typeOptions?.cell
      }

      draw.sketch(context, frameCount, draw.label === 'dotGrid' ? dotOptions : typeOptions);
      frameCount = postdraw(frameCount, context);
      if (draw?.animate) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };
    render();
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, text, typeOptions, dims]);

  return {canvasRef, text, setText};
};

export default useCanvas;
