import React from 'react'
import {motion} from "framer-motion";
import {Box} from "@chakra-ui/react";

const draw = {
  hidden: {pathLength: 0, opacity: 0},
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {delay, type: "spring", duration: 1.5, bounce: 0},
        opacity: {delay, duration: 0.01}
      }
    };
  }
};
const CustomSvg = React.forwardRef((props: { fill?: string, initialOptions?: any, svgStyle?: any }, ref) => {
  const initialOpts = props.initialOptions ? props.initialOptions : {
    scale: 0.7,
    opacity: 0,
    right: '0',
    overflow: 'hidden'
  }
  const svgStyle = props.svgStyle ? props.svgStyle : {right: '-4rem', position: 'relative'}
  return (
      <Box display={{base: "none", sm: "block", lg: "block"}}>
        <motion.div style={{position: 'absolute', width: 'min-content', zIndex: -1}} initial={initialOpts}
                    whileInView={{opacity: 1, scale: 1}} transition={{duration: 3}}>
          <motion.svg xmlns="http://www.w3.org/2000/svg" width="137" height="136" viewBox="0 0 137 136"
                      style={svgStyle}>
            <g id="Ellipse_168" data-name="Ellipse 168" fill="none" stroke={props.fill ? props.fill : "#059bfc"}
               stroke-width="27">
              <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
              <ellipse cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
            </g>
          </motion.svg>
        </motion.div>
      </Box>
  )
})

const StrokeDot = motion(CustomSvg)
export {StrokeDot}
