import { Grid, GridItem, Box, Image, Text, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { keyframes, jsx } from '@emotion/react';
interface PartnersProps {
  apiUrl: string;
  baseUrl?: string;
}
interface Partner {
  no: string;
  name: string;
  level: string;
  imgName: string;
}
function Partners({ apiUrl, baseUrl }: PartnersProps) {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    // Fetch the speaker data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setPartners(data.partners))
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

const getImgWidth = (level: string) => {
  if(parseInt(level, 10) >= 5) {
    return "3rem"
  }
  if(parseInt(level, 10) >= 2) {
    return "10rem"
  }

  return "auto"
}

console.log('data ', partners);


  return (
    <Grid p={12} templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
      {partners.map((partner) => (
        <GridItem key={partner.no} borderRadius="md" overflow="hidden" >
          <Box p={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Image src={`${baseUrl}partners_pngs/${partner.imgName}`} alt={partner.name} objectFit="cover" maxW={getImgWidth(partner.level)} h="auto" />
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}

export default Partners;