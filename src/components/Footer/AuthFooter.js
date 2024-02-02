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

/*eslint-disable*/
import React from "react";
import {Flex, Link, List, ListItem, Text} from "@chakra-ui/react";
import {useBgColors, useTextColors} from "../../theme/foundations/colors";

export default function AuthFooter(props) {
  const textColor = useTextColors()
  const bgColor = useBgColors()
  return (
      <Flex
          flexDirection={{
            base: "column",
          }}
          alignItems={{
            base: "center",
          }}
          justifyContent='space-between'
          pb='1.8rem'
          pt='0.9rem'
          fontSize='sm'>
        <Text
            color={textColor}
            textAlign={{
              base: "center",
            }}
            mb={{base: "20px"}}>
          &copy; {1900 + new Date().getYear()},{" "}
          <Text as='span' mx='2px'>
            {document.documentElement.dir === "rtl"
              ? " مصنوع من ❤️ بواسطة"
              : "Made with ❤️ by "}
        </Text>
        <Link color={textColor} href='https://twitter.com/TheSafariDAO' target='_blank'>
          {document.documentElement.dir === "rtl"
              ? " SafariDAO"
              : "SafariDAO "}
        </Link>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
          }}>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
          }}>
        </ListItem>
        <ListItem
            me={{
              base: "20px",
            }}>
          <Link
              color={textColor}
              fontSize='sm'
              href='https://twitter.com/ethsafari' target={'_blank'}>
            {document.documentElement.dir === "rtl" ? "مدونة" : "Web3 Savannah"}
          </Link>
        </ListItem>
        <ListItem me={{
          base: "20px",
        }}>
          <Link
              color={textColor}
              href='https://discord.gg/CkMF5Ff83f' target={'_blank'}>
            {document.documentElement.dir === "rtl" ? "رخصة" : "Discord"}
          </Link>
        </ListItem>
        <ListItem me={{
          base: "20px",
        }}>
          {/*<Link*/}
          {/*    color={textColor}*/}
          {/*    href='https://twitter.com/TheSafariDAO' target={'_blank'}>*/}
          {/*  {document.documentElement.dir === "rtl" ? "رخصة" : "SafariDAO"}*/}
          {/*</Link>*/}
        </ListItem>
      </List>
    </Flex>
  );
}
