import {useColorModeValue} from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#E6007A",
    blueAlt: "#01EAFC",
    dark: "#000000",
    light: "#FFFFFF",
    gold: "#FBFA01"
  }
}

const useBgColors = () => {
  return useColorModeValue('white', 'brand.dark')
}

const useTextColors = () => {
  return useColorModeValue('brand.dark', 'white')
}

export {useTextColors, useBgColors}

export default colors