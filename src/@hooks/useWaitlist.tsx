import React, {useEffect, useState} from 'react';
import {addWaitlistEmail} from "../firebaseConfig";
import {useToast} from "@chakra-ui/react";

const useWaitlist = () => {
  const toast = useToast()
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (error) setError(null);
    if (success) setSuccess(false);
  }, [email]);

  const handleSubmit = (values: any) => {
    setLoading(true);
    setEmail(values.email);
    const addToWaitlist = async () => {
      try {
        await addWaitlistEmail(values.email)
        setLoading(false)
        toast({
          title: "You've signed up!",
          description: "We'll let you know when slots open. Follow us on social media to not miss a beat!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      } catch (e) {
        console.log(e)
      }
    }
    addToWaitlist()
  };

  return {
    email,
    loading,
    error,
    success,
    setEmail,
    handleSubmit
  };
};

export default useWaitlist;