import moment from "moment-timezone";

export const SETTINGS_KEY = 'swiggUserSettings'

export enum AUTH_TYPES {
  google = 'google',
  metamask = 'metamask',
  guest = 'anonymous'
}
export interface UserSettings {
  id: string
  userWalletAddress?: string
  username: string
  avatar?: string
  email?: string
  bio?: string
  authType?: string
  lastLoggedIn: string | Date | moment.Moment
  [key: string]: any
}
export interface UserAuthProviderValue {

  login: (type: string) => any
  logout: () => any
  signMessage: () => any
  saveSettings: (settings: any) => any
  resetSettings: () => any
  loading?: boolean
  settings?: UserSettings,
  walletAddress?: string,
  username?: string,
  id?: string,
  email?: string,
  isAuth: boolean,
  bio?: string
  authType: string
}

export const data = {
  stack: [
    {
      name: "Kusama",
      url: "https://kusama.network/",
      imageSrc: "assets/images/png/Kusama-2.png",
      id: "kusama",
    },
     {
       name: "Polytope Labs",
       url: "https://Polytopelabs.org/",
       // imageSrc: Polytope,
       id: "Polytope",
     },
    
    // {
    //   name: "NEAR",
    //   url: "https://near.or5g/",
    //   // imageSrc: near,
    //   id: "near",
    // },
  ],
  // smPartners: [
  //   {
  //     name: "Jia",
  //     url: "https://www.jia.xyz/",
  //     // imageSrc: jia,
  //     id: "jia",
  //   },
  //
  //   {
  //     name: "Bitlipa",
  //     url: "https://www.bitlipa.com/",
  //     // imageSrc: bitlipa,
  //     id: "bitlipa",
  //   },
  //   {
  //     name: "Sharehub",
  //     url: "https://Sharehub.co.ke/",
  //     // imageSrc: sharehub_logo,
  //     id: "sharehub",
  //   },
  //   {
  //     name: "Telos",
  //     url: "https://www.telos.net/",
  //     // imageSrc: telos,
  //     id: "telos",
  //   }
  //
  // ],
  // mediaPartners: [
  //   {
  //     name: "BitKE",
  //     url: "https://bitcoinke.io/",
  //     // imageSrc: bitke,
  //     id: "bitke",
  //   }
  // ],
}