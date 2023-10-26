import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import TextBox from '../../components/TextBox/TextBox';

const PathDesignPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [text, setText] = useState('');
  const handleTextChange = (newText: string) => {
    setText(newText);
  };
  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [text]);
  // const { selectedItems } = router.query; // Ottieni i dati passati come parametro nell'URL

  // Converti la stringa JSON in un array di oggetti
  //const selectedItemsArray = JSON.parse(selectedItems);

  // Ora puoi utilizzare selectedItemsArray nella tua pagina
  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar pagePath={router.pathname} />
      <Box ml="200px" py="115px" pl="40px" w="full" h="100vh" bg="background">
        <Box w="100%" h="100%">
          <Flex
            w="100%"
            justifyContent="left"
            //justify="space-between"
          >
            <Heading>Learning path design</Heading>
          </Flex>
          <Flex paddingTop="1.5rem" w="80%" justifyContent="left">
            <Text>
              Based on the information provided this a potential learning
              objective and a suggested learning path. You have the flexibility
              to modify and customize both the description of the learning
              objective and the types and sequence of the proposed activities
            </Text>
          </Flex>
          <Box paddingTop="0.5rem" w="80%">
            <TextBox
              backgroundColor="#EDF2F7"
              placeholder="Add Learning Objective..."
              onTextChange={handleTextChange}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default PathDesignPage;
