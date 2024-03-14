import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../Contexts/GeneralContext';

import InputAPIKey from '../../components/Inputs/InputAPIKey';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import TabsCreateMenu from '../../components/TabsCreatePage/TabsCreateMenu';
import TextBox from '../../components/TextBox/TextBox';
import { CustomToast } from '../../utils/Toast/CustomToast';

const Create = () => {
  const { user } = useUser();
  const router = useRouter();
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  const {
    sourceText,
    handleSourceText,
    isGenerateButtonClicked,
    handleOptionsChange,
    exercise,
    apiFillGapsData,
  } = useCreateOERsContext();
  const { apiKey, handleApiKey } = useGeneralContext();

  const { addToast } = CustomToast();

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
                <Flex
                  paddingBottom="0.5rem"
                  flexWrap="wrap"
                  direction={isSmallerScreen ? 'column' : 'row'}
                >
                  <Text as="b">Educational resource input (text or URL)</Text>
                  <InputAPIKey
                    apiKey={apiKey}
                    handleApiKey={handleApiKey}
                    size="sm"
                    w={isSmallerScreen ? '100%' : '40%'}
                    ml="auto"
                  />
                </Flex>
                <TextBox
                  //backgroundColor="#EDF2F7"
                  placeholder="Add text or URL"
                  text={sourceText}
                  rows={5}
                  onTextChange={handleSourceText}
                />
              </Box>
              <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                <TabsCreateMenu isSmallerScreen={isSmallerScreen} />
              </Box>
            </Box>
            <Flex w="auto" position="absolute" bottom="5%" right="8%">
              <Button
                marginLeft={'1px'}
                border={'1px solid'}
                borderRadius="lg"
                size="lg"
                type="submit"
                colorScheme="yellow"
                mt={4}
                w="100%"
                onClick={() => {
                  if (exercise == 'Fill the gaps') {
                    handleOptionsChange(apiFillGapsData.words);
                  }
                  if (isGenerateButtonClicked) {
                    router.push({
                      pathname: '/create/edit',
                    });
                  } else {
                    addToast({
                      message: 'Please generate an exercise before proceeding',
                      type: 'warning',
                    });
                  }
                }}
              >
                <Text as="b">Edit</Text>
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Create;
