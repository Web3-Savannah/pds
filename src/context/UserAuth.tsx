import React, {createContext, useContext, useEffect, useState} from 'react'
import firebase from "firebase/compat/app";
import {signInWithGoogle, signOut} from "../firebaseConfig";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import moment from "moment-timezone";
import {AUTH_TYPES, SETTINGS_KEY, UserAuthProviderValue, UserSettings} from "../utils/constants";
import {envConfig} from "../environment/dev";


/**
 * UserAuthContext is a React Context that provides a global state for authentication purposes.
 * It provides methods to login, logout, save settings, and reset settings.
 */
const UserAuthContext = createContext({} as UserAuthProviderValue)

/**
 * UserAuthProvider is a React component that wraps its children and provides them with the UserAuthContext state.
 * @param children - The components which will use the UserAuthContext state
 */
function UserAuthProvider({children}: any){

  // Retrieve the user's account data and information from the preferred user wallet
  const {
    connect,
    data: connectData,
    connectors,
    error: connectError,
    pendingConnector,
  } = useConnect();
  const { address, isConnecting, isDisconnected} = useAccount()

  // Initialize the UserAuthContext state
  const [settings, setSettings] = useState<any>({...envConfig.defaultSettings})
  const [walletAddress, setWalletAddress] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [avatar, setAvatar] = useState<string>()
  const [bio, setBio] = useState<string>()
  const [id, setId] = useState<string>()
  // @ts-ignore
  const [authType, setAuthType] = useState<string>(envConfig.defaultSettings.authType)
  const [loading, setLoading] = useState<boolean>()
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const { disconnect } = useDisconnect()

  /**
   * signMessage is a method that allows a user to sign a message with their wallet.
   */
  const signMessage  = () => {
  }

  /**
   * login is a method that allows a user to login with either Google or MetaMask.
   * @param selectedAuth - The type of authentication the user would like to use (Google or MetaMask)
   */
  const login = async ( selectedAuth?: string) => {
    let type = selectedAuth ? selectedAuth : 'metamask'
    // Update authType to current auth option
    if(type === 'google') {
      return await signInWithGoogle()
    }

    if(type === 'metamask'){
      connect({connector: connectors[0]});
    }
    // Update the authType to the current auth method web2 or web3
    saveSettings({...settings, authType: type})
  }

  /**
   * saveSettings is a method that saves the user's settings to local storage.
   * @param user - The user object containing the user's settings.
   */
  const saveSettings = (user: UserSettings) => {
    let updatedSettings: UserSettings = {...user}
    if(authType !== updatedSettings.authType && updatedSettings?.authType){
      setAuthType(updatedSettings.authType)
    }
    if (walletAddress !== updatedSettings.userWalletAddress) {
      updatedSettings = {...updatedSettings, userWalletAddress: walletAddress}
    }

    setSettings((prevSettings) => ({...prevSettings, ...updatedSettings}))
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings))
  }

  /**
   * resetSettings is a method that resets the user's settings to the default settings.
   */
  const resetSettings = async () => {
    setSettings({...envConfig.defaultSettings})
    localStorage.removeItem(SETTINGS_KEY)
    await signOut()
    setIsAuth(false)
  }

  /**
   * logout is a method that logs the user out and disconnects them from their wallet.
   */
  const logout = () => {
    resetSettings()
    disconnect()
  }

  // Update the UserAuthContext state when the component mounts
  useEffect(() => {
    // If we are login in with google
    // Set the firebase login details if we use Google Auth
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) return
      const userSettings: UserSettings = {
        email: user?.email,
        username: user?.displayName,
        id: user?.email,
        authType: AUTH_TYPES.google,
        lastLoggedIn: moment.tz(new Date(), "Africa/Nairobi").format()
      }
      saveSettings(userSettings)
      setIsAuth(true)
    })
    // Save user settings to local to persist
    const userPreferences = localStorage.getItem(SETTINGS_KEY);
    if (userPreferences){
      const prefs = {...JSON.parse(userPreferences)} as UserSettings
      setSettings(prefs)
      setAuthType(prefs.authType)
    }

    // if(isConnected && authType === AUTH_TYPES.metamask){
    //   setIsAuth(true)
    // }
  }, [])

  // We need to update the authType when the user changes it and also when it updates from local preferences
  useEffect(() => {
    if(authType && settings.authType !== authType){
      saveSettings({...settings, authType})
    }
    // We are successfully signed in with web3 i.e metamask
    // if(isConnected && authType === AUTH_TYPES.metamask){
    //   saveSettings({...settings, authType, walletAddress: data.address, username: data.address.substring(0,6)+'...'})
    //   setIsAuth(true)
    // }
  }, [ authType])

  useEffect(() => {
  }, [settings])

  // Pass the UserAuthContext state to the child components
  return (<UserAuthContext.Provider value={
    {
      logout,
      login,
      saveSettings,
      resetSettings,
      settings,
      loading,
      authType,
      isAuth
    } as UserAuthProviderValue
  }>
    {children}
  </UserAuthContext.Provider>)
}

/**
 * useAuthContext is a hook that allows a component to access the UserAuthContext state.
 */
const useAuthContext = (): UserAuthProviderValue => useContext(UserAuthContext)

export { useAuthContext, UserAuthContext, UserAuthProvider}