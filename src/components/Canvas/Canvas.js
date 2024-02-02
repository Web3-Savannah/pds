import React from 'react'
import './index.css'
import useCanvas from "../../@hooks/useCanvas";
import {postdraw, predraw} from "./sketches";
import {useParticleCanvas} from "./particles";
import {useParticlesSketch} from "./particleSketch2";

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const params = {
  animate: true,
  cols: 22,
  rows: 8,
  frameScale: 10,
  angleRange: 1.2,
  cellScale: 0.5,
  lineCap: "round",
  scaleMin: 1,
  scaleMax: 10,
  frequency: 0.0006,
  frame: 0,
  wScale: 0.13,
};

const Canvas = (props) => {

  const {draw, w, h, options, ...rest} = props
  const {context, ...moreConfig} = options
  // const {canvasRef} = useCanvas(
  //     draw,
  //     {w, h},
  //     {context},
  //     {predraw, postdraw}
  // );
  const {canvasRef} = useParticlesSketch(
      draw,
      {w, h},
      {context},
      {predraw, postdraw}
  );

  return <canvas className={'dot-bg'} width={props.w} height={props.h} ref={canvasRef} {...rest}/>
}
export default Canvas