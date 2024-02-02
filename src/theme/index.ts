import {extendTheme, ThemeConfig} from "@chakra-ui/react"
import fonts from "./foundations/fonts"
import colors from "./foundations/colors";
import components from "./foundations/components";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const overrides = {
  config,
  fonts,
  colors,
  components,
  // Other foundational style overrides go here
  // components: {
  //   Button,
  //   // Other components go here
  // },
}

export {overrides}

export default extendTheme(overrides)