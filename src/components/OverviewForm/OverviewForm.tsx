import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {getItem, OverviewItem} from "../../firebaseConfig";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea
} from "@chakra-ui/react";

const OverviewForm = (props) => {
  const { item, isEdit, isOpen, onClose } : {  [key: string]: any, item: OverviewItem} = props
  const [error, setError] = useState<string>('');
  const [doc, setDoc] = useState<OverviewItem>()
  // TODO move formik to the OverviewList page component
  // const {setValues} = useFormik()

  useEffect(() => {
    if(!isOpen) return
    async function loadDoc() {
      try {
        const doc = await getItem(item.id)
        // console.log('OverviewForm doc')
        // console.log(doc)
        setDoc(doc)
      } catch (e) {
        // console.log(e)
      }
    }
    loadDoc()
  }, [item, isOpen]);

  useEffect(() => {
    if(doc) {
      // console.log('doc set')
      // console.log(doc)
      // setValues({...doc})
    }
  }, [doc])


  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit" : "View"} Overview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              enableReinitialize={true}
              initialValues={{
                title: doc?.title ?? 'Title example',
                description: doc?.description ?? '',
                subtitle: doc?.subtitle ?? '',
                startTime: doc?.startTime ?? '',
                endTime: doc?.endTime ?? '',
                location: doc?.location ?? '',
                organizer: doc?.organizer ?? '',
                status: doc?.status ?? '',
              }}
              onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false);
                // console.log('values', values)
                // TODO add submit logic
              }}
            >
              <Form>
                <FormLabel>Title</FormLabel>
                <Field as={Input} disabled={!isEdit} name="title" placeholder="Title"/>
                <FormLabel>Description</FormLabel>
                <Field as={Textarea} disabled={!isEdit} name="description" placeholder="Description"/>
                <FormLabel>Subtitle</FormLabel>
                <Field as={Input} disabled={!isEdit} name="subtitle" placeholder="Subtitle"/>
                <FormLabel>Start Time</FormLabel>
                <Field as={Input} disabled={!isEdit} name="startTime" placeholder="Start Time"/>
                <FormLabel>End Time</FormLabel>
                <Field as={Input} disabled={!isEdit} name="endTime" placeholder="End Time"/>
                <FormLabel>Location</FormLabel>
                <Field as={Input} disabled={!isEdit} name="location" placeholder="Location"/>
                <FormLabel>Organizer</FormLabel>
                <Field as={Input} disabled={!isEdit} name="organizer" placeholder="Organizer"/>
                <FormLabel>Status</FormLabel>
                <Field as={Input} disabled={!isEdit} name="status" placeholder="Status"/>

                { isEdit && <Button type="submit" disabled={!isEdit}>
                    Submit
                </Button>}

              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>

  );
};

export default OverviewForm;