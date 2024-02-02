import React from 'react'
import {motion} from "framer-motion";
import {Box} from "@chakra-ui/react";

function template({translate, rotate}) {
  return `translate(${translate}) rotate(${rotate})`
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

const MainSpotsxDots = (props) => {
  const {dims} = props;

  const CustomSvg = React.forwardRef((props, ref) => {
    const animatonSetup = {}
    return (
      <Box display={{base: "none", lg: "block"}}>
        <motion.div style={{ width: 'min-content', zIndex: -1}}>
          <motion.svg xmlns="http://www.w3.org/2000/svg" initial="hidden"
                      animate="visible" width={dims.w} height={dims} viewBox="0 0 626 666">
            <g id="SpotsxDots" transform="translate(-193 -207)">

              <g id="YellowDot" transform="translate(193 207)" fill="#fcdc5f" stroke={"#fcdc5f"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <ellipse cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </g>
              <g id="PinkDot" transform="translate(519 209)" fill="#e6007a" stroke={"#e6007a"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <ellipse cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </g>
              <motion.g id="BlackOutline" transform="translate(682 209)" fill="none" stroke={"#1d3239"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={1} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="BlueOutline" transform="translate(193 383)" fill="none" stroke={"#059bfc"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={2} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="BlackOutline2" transform="translate(519 385)" fill="none" stroke={"#1d3239"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={3} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="BlueOutline2" transform="translate(682 385)" fill="none" stroke={"#059bfc"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={4} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="PinkOutline" transform="translate(519 561)" fill="none" stroke={"#e6007a"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={5} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="BlueOutline3" transform="translate(519 737)" fill="none" stroke={"#059bfc"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={6} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="PinkOutline2" transform="translate(682 561)" fill="none" stroke={"#e6007a"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={7} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="YellowDot2" transform="translate(682 737)" fill="#fcdc5f" stroke={"#fcdc5f"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <g id="PinkDot2" transform="translate(356 383)" fill="#e6007a" stroke={"#e6007a"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <ellipse cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </g>
              <motion.g id="BlackOutline3" transform="translate(356 559)" fill="none" stroke={"#1d3239"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={7} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="BlueOutline3-2" data-name="BlueOutline3" transform="translate(356 735)" fill="none" stroke={"#059bfc"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={8} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="PinkOutline3" transform="translate(356 207)" fill="none" stroke={"#e6007a"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={8} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="PinkOutline4" transform="translate(193 559)" fill="none" stroke={"#e6007a"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={9} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
              <motion.g id="BlackOutline4" transform="translate(193 735)" fill="none" stroke={"#1d3239"} stroke-width="27">
                <ellipse cx="68.5" cy="68" rx="68.5" ry="68" stroke="none"/>
                <motion.ellipse variants={draw} custom={9} cx="68.5" cy="68" rx="55" ry="54.5" fill="none"/>
              </motion.g>
            </g>
          </motion.svg>
        </motion.div>
      </Box>

    )
  })

  const SpotsxDots = motion(CustomSvg)
  return (<SpotsxDots/>)
}
export {MainSpotsxDots}
