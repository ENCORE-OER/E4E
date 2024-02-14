import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
//import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import TextBox from '../components/TextBox/TextBox';
import TabsCreateMenu from '../components/TabsCreateMenu/TabsCreateMenu';
//import { useCreateOERsContextContext } from '../Contexts/CreateOERsCotext';


const Create = () => {
  //const [data, setData] = useState(null);
  const { user } = useUser();
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // useEffect(() => {
  //   // Funzione asincrona per effettuare la chiamata API
  //   const fetchData = async () => {
  //     try {
  //       // Se stai usando fetch
  //       const response = await fetch('https://huggingface.co/spaces/polyglot-edu/generative-ai-for-ed');
  //       const result = await response.json();

  //       setData(result);
  //     } catch (error) {
  //       console.error('Errore durante la chiamata API:', error);
  //     }
  //   };
  //   fetchData(); // Chiamata API al caricamento del componente o in base a condizioni specifiche
  // }, []); // L'array vuoto come secondo argomento fa sì che useEffect si esegua solo al montaggio del componente

  return (
    <>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/create'} />
        <Navbar user={user} pageName="Create" />

        <Box
          //ml="200px"
          py="115px"
          pl={isSmallerScreen ? '90px' : '240px'}
          w="full"
          h={'full'}
          bg="background"
        >
          <Box w="100%" h="100%">
            <Flex
              w="100%"
              justifyContent="left"
            //justify="space-between"
            >
              <Heading>Create a new OER with Generative AI</Heading>
            </Flex>

            <Box w="100%" justifyContent="left">
              <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                <Text>
                  This section provides guidance on creating Open Educational
                  Resources (OER) supported by generative AI. <br />
                  Be aware that content produced by generative AI needs to be
                  evaluated in the same way as content gathered from other
                  information resources. Currently the system allows to generate
                  assessment content from starting resources.
                </Text>
              </Box>
              <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                <Flex paddingBottom="0.5rem">
                  <Text as="b">Educational resource input (text or URL)</Text>
                </Flex>
                <TextBox
                  //backgroundColor="#EDF2F7"
                  placeholder="Add text or URL"
                  rows={5}
                  onTextChange={() => {
                    null;
                  }}
                />
              </Box>
              <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                <TabsCreateMenu isSmallerScreen={isSmallerScreen} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Create;
