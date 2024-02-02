import {Box, Button, createIcon, Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";
import Hero from "../../components/Hero/Hero";
import HeroAlt from "../../components/HeroAlt/HeroAlt";
import {useEffect, useMemo, useState} from "react";
import {useTextColors} from "../../theme/foundations/colors";
import {useOverviewItems} from "../../@hooks/useOverviews";
import useWaitlist from "../../@hooks/useWaitlist";
import useDeviceDimensions from "../../@hooks/useDeviceDimensions";
import {MultiBlueDots} from "../../components/Icons/MultiBlueDots";
import {PopupButton} from "@typeform/embed-react";
import {MultiYellowDots} from "../../components/Icons/MultiYellowDots";
import {MultiPinkDots} from "../../components/Icons/MultiPinkDots";
import {PolkadotPinkLogo} from "../../components/Icons/PolkadotPinkLogo";
import {MainSpotsxDots} from "../../components/Icons/MainSpotsxDots";
import MainLayout from "../../components/Layout/MainLayout";
import {data} from "../../utils/constants";
import Speakers from "../../components/Speakers/Speakers";
import Partners from "../../components/Partners/Partners";
import config from "../../config";

const random = require("canvas-sketch-util/random");


const mainUrl = process.env.NODE_ENV === 'production' ? config.prod.apiUrl : config.dev.apiUrl;
const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
      <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
          fill="currentColor"
      />
  ),
});
function LandingPage() {
  const baseUrl = mainUrl;
  const apiSpeakersUrl = baseUrl + 'api/polkadotsafari/speakers';
  const apiPartnersUrl = baseUrl + 'api/polkadotsafari/partners';
  const titleColor = useTextColors();
  const textColor = useTextColors();
  const margin = 30;
  const [kusama, ...otherPartners] = data.stack;
  const {width, height, dimH, dimW} = useDeviceDimensions(margin)
  const shouldAnimate = useMemo(()=> {
    return width >= 768;

  }, [width])
  const [dims, setDims] = useState({
    h: dimH - margin * 0.5,
    w: (dimW - margin * 1) * 0.5,
  });
  useEffect(() => {
    setDims({
      h: height - margin * 1.9,
      w: dimW - margin * 1.9
    })
  }, [width, height]);
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const mouse: any = {};
      //
      // console.log('mouse')
      // console.log(mouse)
      mouse.x = e.x;
      mouse.y = e.y;
    }
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, []);

  const [overviewItems, isLoading] = useOverviewItems()
  const patterns = [<MultiBlueDots/>, <MultiYellowDots/>, <MultiPinkDots/>]
  const patternsR = [<PolkadotPinkLogo/>]
  const {email, setEmail, handleSubmit, loading, error} = useWaitlist()
  const overviewEls = useMemo(() => {
    return overviewItems.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      // must be equal
      return 0;
    }).map((item, index) => {
      let actions;
      if (item.actions) {
        actions = item.actions
      }
      if (index === overviewItems.length - 1) {
        if (index % 2 !== 0) {
          return (
              <>
                {random.pick(patterns)}
                <HeroAlt title={item.title} subtitle={item.subtitle} description={item.description} actions={actions}/>
              </>
          )
        }
        return <Hero title={item.title} subtitle={item.subtitle} description={item.description} actions={actions}/>
      }
      if (index % 2 !== 0) {
        if (index === 1) {
          return (<>
            <HeroAlt title={item.title} subtitle={item.subtitle} description={item.description} actions={actions}/>
            {random.pick(patternsR)}
            {/*{random.pick(patterns)}*/}
            <MultiBlueDots/>
          </>)
        }
        return (
            <>
              {random.pick(patterns)}
              <HeroAlt title={item.title} subtitle={item.subtitle} description={item.description} actions={actions}/>
            </>
        )
      }
      if (index < 1) {
        return (
            <>
              <Hero title={item.title} subtitle={item.subtitle} description={item.description} actions={actions}/>
              {random.pick(patterns)}
            </>
        )
      }
      return (
          <>
            <Hero title={item.title} subtitle={item.subtitle} description={item.description} actions={actions}/>
            {random.pick(patternsR)}
          </>

      )
    })
  }, [overviewItems, isLoading])

  return (
      <Box style={{overflowX: 'hidden'}}>
        <MainLayout>
        <Flex position="relative" mb={{base: "5rem", lg: "10rem"}}>
          <Flex
              w="100%"
              maxW="1044px"
              mx="auto"
              flexDirection="column"
              me={{base: "auto", lg: "5rem", xl: "auto"}}
          >
            <Flex
                alignItems="center"
                justifyContent="start"
                style={{userSelect: "none"}}
                mx={{base: "auto", lg: "unset"}}
                ms={{base: "auto", lg: "auto"}}
                w={{base: "100%", md: "50%", lg: "450px"}}
                px="50px"
            >
              <Flex
                  direction="column"
                  w="100%"
                  minW={{sm: "25rem"}}
                  background="transparent"
                  mt={{base: "3rem", md: "7rem", lg: "8rem", xl: "9rem"}}
                  mb={{base: "3.75rem", lg: "5.9rem"}}
              >
                <Text color={titleColor} py={'1rem'}  fontWeight="light" fontSize={{base: "0.3rem", sm: "0.95rem", md: "1rem"}}>
                  Web3 Savannah Presents
                </Text>
                <Heading
                    letterSpacing="8px"
                    fontSize={{base: "0.9rem", sm: "1.2rem", md: "1.6rem"}}
                    fontWeight="extrabold"
                    color={"brand.primary"}
                >
                  Polkadot Savannah
                </Heading>
                <Heading color={"brand.primary"} py={'1rem'} fontSize={{base: "0.rem", sm: "0.95rem", md: "1rem"}}>
                  Polkadot Ecosystem Event
                </Heading>
                <Heading color={titleColor} py={'1rem'} fontSize={{base: "0.9rem", sm: "0.95rem", md: "1rem"}}>
                  CAMPUS MIXERS -COHORT BASED BOOTCAMP - HACKATHON - CONFERENCE
                </Heading>
                <Heading color={"brand.primary"} py={'1rem'} fontSize={{base: "0.9rem", sm: "0.95rem", md: "1rem"}}>
                  AFRICA  2024
                </Heading>
                <Heading color={titleColor} py={'1rem'} fontSize={{base: "1.5rem", sm: "1.6rem", md: "1.8rem"}}
                         mb="10px">
                  Thank You for Being A Part of Polkadot Savannah 2024!
                </Heading>
                {/*<Text
                    mb="36px"
                    ms="4px"
                    color={textColor}
                    fontWeight="bold"
                    fontSize="14px"
                >
                  Enter your email and sign up for the Polkadot Safari waitlist!
                </*Text> }
                {/*<Button*/}
                {/*    as={PopupButton}*/}
                {/*    id="gLwYN8cn"*/}
                {/*    variant="brand"*/}
                {/*    fontSize="10px"*/}
                {/*    w="100%"*/}
                {/*    maxW="350px"*/}
                {/*    h="45"*/}
                {/*    mb="20px"*/}
                {/*    mt="20px"*/}
                {/*    loadingText='Loading'*/}
                {/*>*/}
                {/*  Buy Tickets!*/}
                {/*</Button>*/}




                <Text
    mb="36px"
    ms="4px"
    color={textColor}
    fontWeight="bold"
    fontSize="14px"
>
    Enter your email and sign up for the Polkadot Savannah waitlist!
</Text>

<Button
    as={PopupButton}
    id="gLwYN8cn"
    variant="brand"
    fontSize="10px"
    w="100%"
    maxW="350px"
    h="45"
    mb="20px"
    mt="20px"
    loadingText='Loading'
>
    Join!
</Button>








              </Flex>
            </Flex>
            <Box
                w={{base: "335px", md: "450px"}}
                mx={{base: "auto", lg: "unset"}}
                ms={{base: "auto", lg: "auto"}}
                mb="80px"
            >
            </Box>
            <Box
                display={{base: "none", lg: "block"}}
                overflow="hidden"
                my={{base: "5rem", sm: "0"}}
                w="960px"
                maxW={{md: "50vw", lg: "50vw"}}
                minH="100vh"
                position="absolute"
                left="0px"
            >
              <Box
                  // bgImage={signInImage}
                  w="100%"
                  h="100%"
                  bgSize="cover"
                  zIndex="-1"
                  bgPosition="50%"
                  bgColor="transparent"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
              >
                {/*<Canvas*/}
                {/*    w={dims.w}*/}
                {/*    h={dims.h}*/}
                {/*    options={{context: "2d"}}*/}
                {/*    draw={{sketch: sketchParticles, label: 'drawParticles', animate: true}}*/}
                {/*/>*/}




         



                <MainSpotsxDots dims={dims}/>
              </Box>
            </Box>
          </Flex>
        </Flex>
          {/*<CustomDot/>*/}
          {isLoading ? <PolkadotPinkLogo initialOptions={{opacity: 50, right: 0, scale: 0.5}}/> : overviewEls}
          <Box>
            <Heading p={4} display={'flex'} justifyContent={'center'}>Thank You Speakers</Heading>
            <Speakers apiUrl={apiSpeakersUrl} baseUrl={baseUrl}/>
          </Box>
          <Stack
              as={Box}
              textAlign={'center'}
              spacing={{base: 8, md: 14}}
              py={{base: 20, md: 36}}>
            <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{base: '3xl', sm: '4xl', lg: '6xl'}}>
              <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: '30%',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'brand.primary',
                    zIndex: -1,
                  }}>
                {'A Big Thank You To Our 2023 Partners and Sponsors'}
              </Text>
              <br/>
              {/*<Text as={'span'} color={'brand.primary'}>*/}
              {/*  We are here to educate, and give awesome teams a unique platform to innovate. The decentralized ecosystem has massive potential. We couldn't share and grow it without you, thank you!*/}
              {/*  You are energizing our journey towards a better decentralized future.*/}
              {/*</Text>*/}


              <Text as={'span'} fontSize="30px" bgGradient="linear(to-r, brand.primary, brand.secondary)">
    We aim to educate, and give awesome teams a unique platform to innovate on Polkadot Ecosystem. The decentralized ecosystem has massive potential. We couldn't share and grow it without you, thank you!
    You are energizing our journey towards a better decentralized future.
</Text>




            </Heading>
            <Partners apiUrl={apiPartnersUrl} baseUrl={baseUrl}/>
            
            <Box m={'1rem'} mt={'2rem'} display="flex"
                 justifyContent="center" alignItems={'center'}>
              <Text fontSize={'1.2rem'} mx={'1.5rem'} > Powered by</Text>
              <Link className={'anchor-sponsor'} target="_blank" href={kusama.url}>
                <Image boxSize="20rem" objectFit='contain' className={kusama.id} src={kusama.imageSrc}
                       alt={kusama.name}></Image>
              </Link>
            </Box>
          </Stack>
        </MainLayout>
      </Box>

  );
}

export default LandingPage;