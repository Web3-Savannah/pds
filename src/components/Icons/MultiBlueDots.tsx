import React from 'react'
import {motion} from "framer-motion";
import {Box} from "@chakra-ui/react";

function template({translate, rotate}) {
  return `translate(${translate}) rotate(${rotate})`
}
const CustomSvg = React.forwardRef((props, ref) => {
  const animatonSetup = {}
  return (
      <Box display={{base: "none", lg: "block"}}>
        <motion.div style={{position: 'absolute', width: 'min-content', zIndex: -1}} initial={{opacity: 0, left: 0}}
                    whileInView={{opacity: 1}} transition={{duration: 2}}>
          <motion.svg xmlns="http://www.w3.org/2000/svg" width="186" height="311" viewBox="0 0 186 311">
            <g id="SixCircles" transform="matrix(1, -0.017, 0.017, 1, -56.304, -2268.13)">
              <motion.circle id="Ellipse_215" data-name="Ellipse 215" cx="40.5" cy="40.5" r="40.5"
                             transform="translate(116.268 2581.553) rotate(-89)" fill="#1814fc" initial={{opacity: 1}}
                             transition={{duration: 2}} animate={{opacity: [null, 0, 0.75, 1]}}/>
              <circle id="Ellipse_199" data-name="Ellipse 199" cx="40.5" cy="40.5" r="40.5"
                      transform="translate(15.298 2349.755) rotate(-89)" fill="#1814fc"/>
              <circle id="Ellipse_217" data-name="Ellipse 217" cx="40.5" cy="40.5" r="40.5"
                      transform="translate(120.282 2351.588) rotate(-89)" fill="#1814fc"/>
              <motion.ellipse id="Ellipse_203" data-name="Ellipse 203" cx="41.5" cy="40.5" rx="41.5" ry="40.5"
                              transform="translate(13.274 2465.738) rotate(-89)" fill="#1814fc"/>
              <ellipse id="Ellipse_221" data-name="Ellipse 221" cx="41.5" cy="40.5" rx="41.5" ry="40.5"
                       transform="translate(118.258 2467.57) rotate(-89)" fill="#1814fc"/>
              <motion.circle id="Ellipse_197" data-name="Ellipse 197" cx="40.5" cy="40.5" r="40.5"
                             transform="translate(11.284 2579.721) rotate(-89)" fill="#1814fc"/>
            </g>
          </motion.svg>
        </motion.div>
      </Box>

  )
})

const MultiBlueDots = motion(CustomSvg)
export {MultiBlueDots}
