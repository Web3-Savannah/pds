import {FcGoogle} from 'react-icons/fc';
import {Button, Center, Stack, Text} from '@chakra-ui/react';
import {useDisclosure} from "@chakra-ui/hooks";
import LoginEmail from "./LoginEmail";
import CustomIcon from "../customIcon/CustomIcon";
import styles from './LoginForm.module.css';

export interface LoginOptionsProps {
  loginHandlers: {
    handleWeb3SignIn?(): any;
    handleEmailSignIn?(): any;
    handleGoogleSignIn?(): any;
  }

  [key: string]: any;
}

export default function LoginOptions(props: LoginOptionsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center h={'60vh'} p={8}>
      <LoginEmail isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
      <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
        {/* Metamask */}
        <Button w={'full'} onClick={() => props.loginHandlers.handleWeb3SignIn()} leftIcon={<CustomIcon className={styles.customIcon} imgSrc={'assets/images/svg/metamask-fox.svg'} />}>
          <Center>
            <Text>Sign In with Metamask</Text>
          </Center>
        </Button>
        <Button w={'full'} onClick={() => props.loginHandlers.handleGoogleSignIn()} leftIcon={<FcGoogle/>}>
          <Center>
            <Text>Sign In with Google</Text>
          </Center>
        </Button>
      </Stack>
    </Center>
  );
}