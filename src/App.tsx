import * as React from "react"
import {useEffect, useMemo} from "react"
import {ChakraProvider, extendTheme, useColorMode,} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import './index.css'
import {overrides} from './theme'
import {useBgColors, useTextColors} from "./theme/foundations/colors";
import {UserAuthProvider} from "./context/UserAuth";
import {wagmiClient} from "./utils/auth.helpers";
import {WagmiConfig} from "wagmi";
import {isAuthorized} from "./firebaseConfig";

export const App = () => {
  const {colorMode} = useColorMode();
  const bg = useBgColors()
  const color = useTextColors()
  useEffect(() => {
    isAuthorized()
  }, [])

  // const theme = {
  //   ...dotSafariTheme,
  //   style: {...bodyStyle}
  // }
  const theme = useMemo(() => {
    const style = {
      global: {
        // styles for the `body`
        body: {
          bg,
          color,
        },
      },
    }

    return extendTheme({
      ...overrides,
      ...style
    })
  }, [colorMode])

  return (<ChakraProvider theme={{...theme}}>
    {/*<ColorModeSwitcher justifySelf="flex-end" />*/}
    <WagmiConfig client={wagmiClient}>
      <UserAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            {/*<Route path="/admin/overviews" element={<OverviewsList/>}/>*/}
            {/*<Route path="/admin/" element={<Admin/>}/>*/}
            {/*<Route path="/login/" element={<LoginPage/>}/>*/}
            {/*<Route path="/auth/login" element={<LoginPage/>}/>*/}
          </Routes>
        </BrowserRouter>
        {/*<Toast/>*/}
      </UserAuthProvider>
    </WagmiConfig>
  </ChakraProvider>)
}
