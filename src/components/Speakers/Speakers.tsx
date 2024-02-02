import { Grid, GridItem, Box, Image, Text, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { keyframes, jsx } from '@emotion/react';
import config from '../../config';

interface SpeakersProps {
  apiUrl: string;
  baseUrl?: string;
}
interface Speaker {
  NO: string;
  NAME: string;
  ORGANISATION: string;
  TITLE: string;
  BIO: string;
  TOPIC: string;
  TYPE: string;
  TRACK: string;
  'Profile Picture': string;
}


function Speakers({ apiUrl, baseUrl }: SpeakersProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    // Fetch the speaker data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setSpeakers(data.speakers))
      .catch((error) => console.log(error));
  }, [apiUrl]);

  const GrowShrink = keyframes`
  from {
    box-shadow: lg; 
  }

  to {
    box-shadow: 2xl;
  }
`;

  return (
    <Grid p={12} templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
      {speakers.map((speaker) => (
        <GridItem key={speaker.NO} borderRadius="md" overflow="hidden" boxShadow="lg" _hover={{ animation: `${GrowShrink} 0.3s ease-in-out`, boxShadow: '2xl' }} >
          <Box position="relative" p={4}>
            <Box display={'flex'}>
              <Image src={`${baseUrl}ps_speakers_pics_standard_500x500/${speaker['Profile Picture']}`} borderRadius={'20rem'} alt={speaker.NAME} objectFit="cover" w={["8rem", ""]} h="auto" />
            </Box>
          </Box>
          <Box p={4}>
          <Heading size="md" mb={2}>
                  {speaker.NAME}
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  {speaker.TITLE}
                </Text>
            <Text fontSize="sm">{speaker.BIO}</Text>

          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}

export default Speakers;