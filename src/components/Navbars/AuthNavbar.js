// Chakra imports
import {Box, Button, Flex, HStack, Text, useColorMode, useColorModeValue,} from "@chakra-ui/react";
import React from "react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {useTextColors} from "../../theme/foundations/colors";
import {SidebarResponsive} from "../Sidebar/Sidebar";
import dashRoutes from "../../routes";
import TypelogoBrand from "../TypelogoBrand/TypelogoBrand";
import {PopupButton} from "@typeform/embed-react";

export default function AuthNavbar(props) {
  const {colorMode, toggleColorMode} = useColorMode();
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const {logo, logoText, secondary, ...rest} = props;
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
  // Chakra color mode
  let navbarIcon = useTextColors();
  let mainText = useTextColors();
  let navbarBg =
      "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.38%, rgba(255, 255, 255, 0.039) 70.38%)";
  let navbarBorder = "rgba(226, 232, 240, 0.3)";
  let navbarShadow = useColorModeValue(
      "0px 7px 23px rgba(0, 0, 0, 0.05)",
      "none"
  );
  let navbarFilter = useColorModeValue(
      "none",
      "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(42px)";
  let navbarPosition = "fixed";
  let links = dashRoutes(navbarIcon).map((item) => {
    if ((!item?.typeformId)) {
      return (<Button
          fontSize='sm'
          ms='0px'
          me='0px'
          px='0px'
          me={{sm: "2px", md: "16px"}}
          color={navbarIcon}
          variant='link'
          leftIcon={
            item.icon
          }>
        <Text
            color={navbarIcon}>
          {item.name}
        </Text>
      </Button>)
    }
    return (
        <Button
            as={PopupButton}
            id={item.typeformId}
            fontSize='sm'
            ms='0px'
            me='0px'
            px='0px'
            me={{sm: "2px", md: "16px"}}
            color={navbarIcon}
            variant='link'
            leftIcon={
              item.icon
            }>
          <Text>{item.name}</Text>
        </Button>
    )
  })
  let linksAuth = (
      <HStack display={{base: "none", lg: "flex"}}>
        <Button variant={'link'} onClick={toggleColorMode}>
          {colorMode === 'light' ? <SunIcon/> : <MoonIcon/>}
        </Button>
        {/*<Button*/}
        {/*    as={PopupButton}*/}
        {/*    id="ccb3cveU"*/}
        {/*    fontSize='sm'*/}
        {/*    ms='0px'*/}
        {/*    px='0px'*/}
        {/*    me={{sm: "2px", md: "16px"}}*/}
        {/*    color={navbarIcon}*/}
        {/*    variant='link'*/}
        {/*    leftIcon={<HomeIcon color={navbarIcon} w='12px' h='12px' me='0px'/>}>*/}
        {/*  <Text>Sponsor</Text>*/}
        {/*</Button>*/}
        {/*<PopupButton id="ccb3cveU" as={Button} fontSize='sm'*/}
        {/*             ms='0px'*/}
        {/*             px='0px'*/}
        {/*             me={{ sm: "2px", md: "16px" }}*/}
        {/*             color={navbarIcon}*/}
        {/*             variant='link'*/}
        {/*             leftIcon={*/}
        {/*               <PersonIcon color={navbarIcon} w='12px' h='12px' me='0px'/>*/}
        {/*             } fullWidth={true}>*/}
        {/*  /!* <FaGithub /> BUY  *!/*/}
        {/*  <Text> Speak</Text>*/}

        {/*</PopupButton>*/}
        {links}
        {/*<NavLink to='/auth/signin'>*/}
        {/*  <Button*/}
        {/*    fontSize='sm'*/}
        {/*    ms='0px'*/}
        {/*    px='0px'*/}
        {/*    me={{ sm: "2px", md: "16px" }}*/}
        {/*    color={navbarIcon}*/}
        {/*    variant='transparent-with-icon'*/}
        {/*    leftIcon={*/}
        {/*      <DocumentIcon color={navbarIcon} w='12px' h='12px' me='0px' />*/}
        {/*    }>*/}
        {/*    <Text>Sign In</Text>*/}
        {/*  </Button>*/}
        {/*</NavLink>*/}
      </HStack>
  );
  return (
      <Box pt={{base: "7rem", sm: "100px", md: "100px"}}>
        <Flex
            position={navbarPosition}
            top='16px'
            left='50%'
            transform='translate(-50%, 0px)'
            background={navbarBg}
            border='2px solid'
            borderColor={navbarBorder}
            boxShadow={navbarShadow}
            filter={navbarFilter}
              backdropFilter={navbarBackdrop}
              borderRadius='20px'
              px='16px'
              py='22px'
              mx='auto'
              width='1044px'
              maxW='90%'
              zIndex={'banner'}
              alignItems='center'>
              <Flex w='100%' justifyContent={{sm: "start", lg: "space-between"}}>
                  {<TypelogoBrand/>}
                  <Box
                      ms={{base: "auto", lg: "0px"}}
                      display={{base: "flex", lg: "none"}}>
                      <SidebarResponsive
                          iconColor={navbarIcon}
                          logoText={props.logoText}
                          secondary={props.secondary}
                          routes={dashRoutes(navbarIcon)}
                          {...rest}
                      />
                  </Box>
                  {linksAuth}
                  {/*<Link href='https://creative-tim.com/product/vision-ui-dashboard-chakra'>*/}
                  {/*  <Button*/}
                  {/*    fontSize='xs'*/}
                  {/*    variant='brand'*/}
                  {/*    borderRadius='12px'*/}
                  {/*    px='30px'*/}
                  {/*    display={{*/}
                  {/*      sm: "none",*/}
                  {/*      lg: "flex",*/}
                  {/*    }}>*/}
                  {/*    Free Download*/}
                  {/*  </Button>*/}
                  {/*</Link>*/}
              </Flex>
          </Flex>
      </Box>

  );
}
