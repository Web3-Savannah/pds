import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Box,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Box
      bgGradient="linear(to-r, pink.500, black, blue.500)"
      px={3}
      py={1}
      borderRadius="md"
      display="inline-block"
    >
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="blue"  // Change color to white for better visibility on the gradient background
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </Box>
  )
}
