import React from 'react'
import {motion} from "framer-motion";

const Dot = React.forwardRef((props, ref) => {

    return (
        <motion.div style={{position: 'absolute', width: 'min-content', }} initial={{opacity: 0, left: 0}}
                    whileInView={{opacity: 1}} transition={{duration: 2}}>
          <motion.svg xmlns="http://www.w3.org/2000/svg" width="137" height="136" viewBox="0 0 274 272">
            <g id="purpleStrokeDot" fill="none" stroke="#fb09fd" strokeWidth="27">
              {/*<ellipse ref={ref}  cx="68.5" cy="68" rx="68.5" ry="68" />*/}
              <motion.ellipse style={{x: 0}} initial={false} animate={{x: 100}} cx="68.5" cy="68" rx="55" ry="54.5"
                              fill="none"/>
            </g>
          </motion.svg>
        </motion.div>
    )
})

const CustomDot = motion(Dot)
export {CustomDot}