/*eslint-disable*/
import {HamburgerIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";
// chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import {Separator} from "../Separator/Separator";
import {SidebarHelp} from "../Sidebar/SidebarHelp";
import PropTypes from "prop-types";
import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {TypelogoDarkIcon, TypelogoLightIcon} from "../Icons/Icons";
import {useBgColors, useTextColors} from "../../theme/foundations/colors";
import {PopupButton} from "@typeform/embed-react";

// FUNCTIONS

function Sidebar(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  const bgColor = useBgColors()
  const textColor = useTextColors()
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    const {sidebarVariant} = props;
    // Chakra Color Mode
    let activeBg = "#1A1F37";
    let inactiveBg = "#1A1F37";
    let activeColor = "white";
    let inactiveColor = "white";
    let sidebarActiveShadow = "none";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
            <>
              <Text
                  color={activeColor}
                  fontWeight='bold'
                  mb={{
                    xl: "12px",
                  }}
                  mx='auto'
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py='12px'>
                {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
              </Text>
              {createLinks(prop.views)}
            </>
        );
      }
      return (
          <NavLink to={prop.layout + prop.path}>
            {activeRoute(prop.layout + prop.path) === "active" ? (
                <Button
                    boxSize='initial'
                    justifyContent='flex-start'
                    alignItems='center'
                    boxShadow={sidebarActiveShadow}
                    bg={activeBg}
                    transition={variantChange}
                    backdropFilter='blur(42px)'
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    py='12px'
                    borderRadius='15px'
                    _hover={{
                      display: "none",
                    }}
                    w='100%'
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                    }}>
                  <Flex>
                    {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                    ) : (
                        <IconBox
                            bg='brand.200'
                            color='white'
                            w='12px' h='12px' me='5px'
                            transition={variantChange}>
                          {prop.icon}
                        </IconBox>
                    )}
                    <Text color={activeColor} my='auto' fontSize='sm'>
                      {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                    </Text>
                  </Flex>
                </Button>
            ) : (
                <Button
                    boxSize='initial'
                    justifyContent='flex-start'
                    alignItems='center'
                    bg='transparent'
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    py='12px'
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    borderRadius='15px'
                    _hover={{
                      display: "none",
                    }}
                    w='100%'
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}>
                  <Flex>
                    {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                    ) : (
                        <IconBox
                            bg={inactiveBg}
                            color='brand.200'
                            w='12px'
                            h='12px'
                            me='5px'
                            transition={variantChange}>
                          {prop.icon}
                        </IconBox>
                    )}
                    <Text color={inactiveColor} my='auto' fontSize='sm'>
                      {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                    </Text>
                  </Flex>
                </Button>
            )}
          </NavLink>
      );
    });
  };
  const {logoText, routes, sidebarVariant} = props;

  var links = <>{createLinks(routes)}</>;
  //  BRAND
  //  Chakra Color Mode
  let sidebarBg =
      "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)";
  let sidebarRadius = "16px";
  let sidebarMargins = "16px 0px 16px 16px";
  var brand = (
      <Box pt={"25px"} mb='12px'>
        <Link
            href={`${process.env.PUBLIC_URL}/#/`}
            target='_blank'
            display='flex'
            lineHeight='100%'
            mb='30px'
            fontWeight='bold'
            justifyContent='center'
            alignItems='center'
            fontSize='11px'>
          <TypelogoLightIcon w='7rem' h='22px' me='10px' mt='2px'/>
          <Box
              bg='linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)'
              bgClip='text'>
            <Text fontSize='sm' letterSpacing='3px' mt='3px' color='transparent'>
              {logoText}
            </Text>
          </Box>
        </Link>
        <Separator></Separator>
      </Box>
  );

  // SIDEBAR
  return (
      <Box ref={mainPanel}>
        <Box display={{sm: "none", xl: "block"}} position='fixed'>
          <Box
              bg={sidebarBg}
              backdropFilter='blur(10px)'
              transition={variantChange}
              w='260px'
              maxW='260px'
              ms={{
                sm: "16px",
              }}
              my={{
                sm: "16px",
              }}
              h='calc(100vh - 32px)'
              ps='20px'
              pe='20px'
              m={sidebarMargins}
              borderRadius={sidebarRadius}>
            <Box>{brand}</Box>
            <Stack direction='column' mb='40px'>
              <Box>{links}</Box>
            </Stack>
            <SidebarHelp></SidebarHelp>
          </Box>
        </Box>
      </Box>
  );
}

// FUNCTIONS

export function SidebarResponsive(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  const bgColor = useBgColors();

  const {colorMode, toggleColorMode} = useColorMode()
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = "transparent";
    const inactiveBg = "transparent";
    const activeColor = "brand.primary";
    const inactiveColor = useTextColors();

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
            <>
              <Text
                  color={activeColor}
                  fontWeight='bold'
                  mb={{
                    xl: "12px",
                  }}
                  mx='auto'
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py='12px'>
                {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
              </Text>
              {createLinks(prop.views)}
            </>
        );
      }

      if (prop.typeformId) {
        return (
            <Button
                as={PopupButton}
                id={prop.typeformId}
                boxSize='initial'
                justifyContent='flex-start'
                alignItems='center'
                bg='transparent'
                color={inactiveColor}
                mb={{
                  xl: "12px",
                }}
                mx={{
                  xl: "auto",
                }}
                py='12px'
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                borderRadius='15px'
                _hover={{
                  display: "none",
                }}
                w='100%'
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                leftIcon={
                  prop.icon
                }>
              <Text color={inactiveColor} my='auto' fontSize='sm'>{prop.name}</Text>
            </Button>
        )
      }
      return (
          <NavLink to={prop.layout + prop.path}>
            {activeRoute(prop.layout + prop.path) === "active" ? (
                <Button
                    boxSize='initial'
                    justifyContent='flex-start'
                    alignItems='center'
                    bg={activeBg}
                    color={activeColor}
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    py='12px'
                    borderRadius='15px'
                    _hover={{
                      display: "none",
                    }}
                    w='100%'
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}>
                  <Flex>
                    {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                    ) : (
                        <IconBox
                            bg='brand.200'
                            color='white'
                            w='12px' h='12px' me='5px'>
                          {prop.icon}
                        </IconBox>
                    )}
                    <Text color={activeColor} my='auto' fontSize='sm'>
                      {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                    </Text>
                  </Flex>
                </Button>
            ) : (
                <Button
                    boxSize='initial'
                    justifyContent='flex-start'
                    alignItems='center'
                    bg='transparent'
                    color={inactiveColor}
                    mb={{
                      xl: "12px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    py='12px'
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    borderRadius='15px'
                    _hover={{
                      display: "none",
                    }}
                    w='100%'
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}>
                  <Flex>
                    {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                    ) : (
                        <IconBox
                            bg={inactiveBg}
                            color='brand.200'
                            w='12px' h='12px' me='5px'>
                          {prop.icon}
                        </IconBox>
                    )}
                    <Text color={inactiveColor} my='auto' fontSize='sm'>
                      {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                    </Text>
                  </Flex>
                </Button>
            )}
          </NavLink>
      );
    });
  };
  const {logoText, routes, iconColor, ...rest} = props;

  var links = <>{createLinks(routes)}</>;
  //  BRAND
  //  Chakra Color Mode
  var brand = (
      <Box pt={"35px"} mb='8px'>
        <Link
            href={`${process.env.PUBLIC_URL}/#/`}
            target='_blank'
            display='flex'
            lineHeight='100%'
            mb='30px'
            fontWeight='bold'
            justifyContent='start'
            alignItems='center'
            fontSize='11px'>
          {colorMode === 'dark' ? <TypelogoLightIcon w={'7rem'}/> : <TypelogoDarkIcon w={'7rem'}/>}
          <Box
              bg={bgColor}
              bgClip='text'>
            <Text fontSize='sm' letterSpacing='3px' mt='3px' color='transparent'>
              {logoText}
            </Text>
          </Box>
        </Link>
        <Separator></Separator>
      </Box>
  );

  // SIDEBAR
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
      <Flex
          display={{sm: "flex", xl: "none"}}
          ref={mainPanel}
          alignItems='center'>
        {colorMode === 'light' ?
            <SunIcon w='18px' h='18px' mx={`1.5rem`} onClick={toggleColorMode}/> :
            <MoonIcon onClick={toggleColorMode} mx={`1.5rem`} w='18px' h='18px'/>}
        <HamburgerIcon
            color={iconColor}
            w='18px'
            h='18px'
            ref={btnRef}
            onClick={onOpen}
        />
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement={document.documentElement.dir === "rtl" ? "right" : "left"}
            finalFocusRef={btnRef}>
          <DrawerOverlay/>
          <DrawerContent
              backdropFilter='blur(10px)'
              bg={bgColor}
              w='250px'
              maxW='250px'
              ms={{
                sm: "16px",
              }}
              my={{
                sm: "16px",
              }}
              borderRadius='16px'>
            <DrawerCloseButton
                color={iconColor}
                _focus={{boxShadow: "none"}}
                _hover={{boxShadow: "none"}}
            />
            <DrawerBody bg={bgColor} color={iconColor} maxW='250px' px='1rem'>
              <Box maxW='100%' h='100vh'>
                <Box>{brand}</Box>
                <Stack direction='column' mb='40px'>
                  <Box>{links}</Box>
                </Stack>
                {/*<SidebarHelp></SidebarHelp>*/}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
  );
}

// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};
SidebarResponsive.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;
