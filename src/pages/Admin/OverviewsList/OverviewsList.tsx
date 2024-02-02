import React, {useEffect, useState} from "react"
import {Box, Button, HStack, Icon, SimpleGrid, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {isAuthorized, OverviewItem} from "../../../firebaseConfig";
import {useOverviewItems} from "../../../@hooks/useOverviews";
import {CheckIcon} from "@chakra-ui/icons";
import MainLayout from "../../../components/Layout/MainLayout";
import OverviewForm from "../../../components/OverviewForm/OverviewForm";


export default function OverviewsList() {
  const [overviewItems, isLoading] = useOverviewItems()
  const [isEdit, setIsEdit] = useState(false)
  const [currentItem, setCurrentItem] = useState<OverviewItem>()
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleOpenForm = (e: any, item: OverviewItem) => {
    setCurrentItem(item)
    onOpen()
  }


  React.useEffect(() => {
    // console.log('Overview items')
    // console.log(doc)
    console.table(overviewItems)
  }, []);


  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const loadClaims = await isAuthorized()
        // console.log('loadClaims', loadClaims)
        // setIsEdit(true)
        setIsEdit(false)
      } catch (e) {
        // console.log(e)
        setIsEdit(false)
      }
    }
    fetchClaims()
  }, [isEdit, overviewItems])
  return (
      <MainLayout>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {overviewItems.map((item) => {
            // console.log(item)
            return (
              <HStack key={item.id} align={'top'}>
                <Box color={'green.400'} px={2}>
                  <Icon as={CheckIcon}/>
                </Box>
                <VStack align={'start'}>
                  <Text fontWeight={600}>{item.title}</Text>
                  <Text color={'gray.600'}>{item.description}</Text>
                  <Button onClick={(e) => handleOpenForm(e, item)}> {isEdit ? "Edit" : "View"} Overview</Button>
                </VStack>
              </HStack>
            )
          })}
        </SimpleGrid>

        {currentItem && <OverviewForm onClose={onClose} onOpen={onOpen} item={currentItem} isOpen={isOpen}/>}
      </MainLayout>
  )
}