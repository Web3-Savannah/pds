import React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import MainLayout from "../../components/Layout/MainLayout";

function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout>
      <Box m={2}>
        <Heading as="h1" size="md">
          Web3 Marketing Dashboard
        </Heading>
        <Button onClick={onOpen} m={2}>
          Add New Campaign
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create New Campaign
            </DrawerHeader>
            <DrawerBody>
              <Stack>
                <Text>Name your Campaign:</Text>
                <Text>
                  <input type="text" placeholder="Campaign Name" />
                </Text>
                <SimpleGrid columns={3} spacing={8}>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Facebook_icon_2013.svg/1024px-Facebook_icon_2013.svg.png"
                    alt="Facebook logo"
                    width="50px"
                  />
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Twitter_Bird.svg/1024px-Twitter_Bird.svg.png"
                    alt="Twitter logo"
                    width="50px"
                  />
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Youtube_icon.svg/1024px-Youtube_icon.svg.png"
                    alt="YouTube logo"
                    width="50px"
                  />
                </SimpleGrid>
                <Button m={2}>
                  Create
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box>
          <Heading as="h3" size="md">
            Active Campaigns
          </Heading>
          <Stack>
            <IconButton
              aria-label="delete campaign"
              variant="solid"
            />
            <Text>Campaign Name</Text>
          </Stack>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Admin;