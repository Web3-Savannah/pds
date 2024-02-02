import {StyleFunctionProps} from "@chakra-ui/react";

const components = {
  Button: {
    // 1. We can update the base styles
    baseStyle:
        (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? 'brand.primary' : 'brand.primary',
          fontWeight: 'extrabold',
          borderRadius: '1rem',
          color: props.colorMode === 'dark' ? 'brand.light' : 'brand.dark',
        }),
    // 2. We can add a new button size or extend existing
    sizes: {
      xl: {
        h: '56px',
        fontSize: 'lg',
        px: '32px',
      },
    },
    // 6. We can overwrite defaultProps
    defaultProps: {
      size: 'lg', // default is md
      variant: 'sm', // default is solid
    },
    variants: {
      link: (props: StyleFunctionProps) => (
          {
            bg: 'transparent',
            color: props.colorMode === 'dark' ? 'brand.light' : 'brand.dark'
          }
      ),
    }
  },
}

export default components