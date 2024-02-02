/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// import
import {HomeIcon, PersonIcon, RocketIcon,} from "./components/Icons/Icons";
import React from "react";

const dashRoutes = (navbarIcon = 'brand.dark') => {
  return [
    {
      path: "/",
      name: "Home",
      rtlName: "",
      icon: <HomeIcon color='inherit' w='12px' h='12px' me='5px'/>,
      layout: "/auth",
    },
    // {
    //   typeformId: "gLwYN8cn",
    //   name: "Buy Tickets",
    //   rtlName: "",
    //   icon: <RocketIcon color={navbarIcon} w='12px' h='12px' me='5px'/>,
    //   layout: "/auth",
    // },
    // {
    //   path: "/admin/overviews/",
    //   name: "Overview Items",
    //   rtlName: "",
    //   icon: <HomeIcon color='inherit' w='12px' h='12px' me='5px'/>,
    //   layout: "/auth",
    // }, {
    //   path: "/admin/",
    //   name: "Admin",
    //   rtlName: "",
    //   icon: <HomeIcon color='inherit' w='12px' h='12px' me='5px'/>,
    //   layout: "/auth",
    // },
  ];
}
export default dashRoutes;
