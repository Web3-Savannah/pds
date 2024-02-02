import {Box, Link, Text, useColorMode} from "@chakra-ui/react";
import {TypelogoDarkIcon, TypelogoLightIcon} from "../Icons/Icons";
import {useTextColors} from "../../theme/foundations/colors";

const TypelogoBrand = ({logoText}) => {
  const mainText = useTextColors()
  const {colorMode} = useColorMode()
  return (
      <Link
          href={`${process.env.PUBLIC_URL}/#/`}
          target='_blank'
          display='flex'
          lineHeight='100%'
          fontWeight='bold'
          justifyContent='center'
          alignItems='center'
          color={mainText}>
        <Box
            bg='linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)'
            bgClip='text'>
          {/*<LogoIcon boxSize={8} />*/}
          {colorMode === 'dark' ? <TypelogoLightIcon w={'9rem'}/> : <TypelogoDarkIcon w={'9rem'}/>}
          <Text fontSize='sm' letterSpacing='3px' mt='3px' color='transparent'>
            {logoText}
          </Text>

        </Box>
      </Link>
  )
};

export default TypelogoBrand