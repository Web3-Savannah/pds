import React from 'react'
import {motion} from "framer-motion";
import {Box} from "@chakra-ui/react";

const CustomSvg = React.forwardRef((props: any, ref) => {
  const initialOpts = props.initialOptions ? props.initialOptions : {opacity: 50, right: '0'}
  const svgStyle = props.svgStyle ? props.svgStyle : {right: '-12rem', position: 'relative'}
  return (
      <Box display={{base: "none", sm: "block", lg: "block"}}>
        <motion.div style={{position: 'absolute', width: 'min-content', overflow: 'hidden', zIndex: -1}}
                    initial={initialOpts}
                    whileInView={{opacity: 1}} transition={{duration: 2}}>
          <motion.svg xmlns="http://www.w3.org/2000/svg" width="458.923" height="438.557" style={svgStyle}
                      viewBox="0 0 458.923 438.557"
                      animate={{
                        rotate: 360
                      }} transition={{duration: 30, repeat: Infinity}}
          >
            <g id="Polkadot_Token_PolkadotToken_Pink" transform="translate(74.87)">
              <ellipse id="Ellipse_279" data-name="Ellipse 279" cx="79.085" cy="45.995" rx="79.085" ry="45.995"
                       transform="translate(75.515 0)" fill="#e6007a"/>
            <ellipse id="Ellipse_280" data-name="Ellipse 280" cx="79.085" cy="45.995" rx="79.085" ry="45.995"
                     transform="translate(75.515 346.566)" fill="#e6007a"/>
            <ellipse id="Ellipse_281" data-name="Ellipse 281" cx="79.085" cy="46.026" rx="79.085" ry="46.026"
                     transform="matrix(0.5, -0.866, 0.866, 0.5, -74.87, 178.12)" fill="#e6007a"/>
              <ellipse id="Ellipse_282" data-name="Ellipse 282" cx="79.085" cy="45.995" rx="79.085" ry="45.995"
                       transform="matrix(0.5, -0.866, 0.866, 0.5, 225.286, 351.413)" fill="#e6007a"/>
              <ellipse id="Ellipse_283" data-name="Ellipse 283" cx="46.026" cy="79.085" rx="46.026" ry="79.085"
                       transform="matrix(0.866, -0.5, 0.5, 0.866, -74.859, 260.439)" fill="#e6007a"/>
              <ellipse id="Ellipse_284" data-name="Ellipse 284" cx="45.995" cy="79.085" rx="45.995" ry="79.085"
                       transform="matrix(0.866, -0.5, 0.5, 0.866, 225.305, 87.166)" fill="#e6007a"/>
            </g>
          </motion.svg>
        </motion.div>
      </Box>
  )
})

const PolkadotPinkLogo = motion(CustomSvg)
export {PolkadotPinkLogo}
