import {Center, Text} from '@chakra-ui/react';
import {useAccount, useConnect} from "wagmi";
import LoginOptions from "./LoginOptions";
import {useAuthContext} from "../../context/UserAuth";
import {AUTH_TYPES} from "../../utils/constants";


export default function LoginForm() {
  const {
    connect,
    data: connectData,
    connectors,
    error: connectError,
    pendingConnector,
  } = useConnect();
  // useAccount makes it easy to access user account data and information from the preferred user wallet
  const {isConnected, address, connector, status} = useAccount()
  const { login, isAuth } = useAuthContext()
  const loginHandlers = {
    handleWeb3SignIn: () => {
      login(AUTH_TYPES.metamask)
    },
    handleGoogleSignIn: async () => {
      await login(AUTH_TYPES.google)
    },
    handleEmailSignIn: () => {
      console.log('Email login logic');
    }
  }
  if (!isAuth) {
    return <LoginOptions loginHandlers={loginHandlers}/>;
  }
  return <Center h={'60vh'} p={6}><Text> You are already signed in, sign out to login again </Text></Center>;
}