import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import { useHasHydrated } from '../../utils/utils';
import axios from 'axios';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useRouter } from 'next/router';
import EditOpenQuestion from '../../components/TabsCreatePage/EditOpenQuestion';
import EditMultipleChoice from '../../components/TabsCreatePage/EditMultipleChoice';
import EditFillGaps from '../../components/TabsCreatePage/EditFillGaps';

// import FillGapsPrototipo from '../../components/TabsCreatePage/FillGapsPrototipo.json';
// import OpenQuestionPrototipo from '../../components/TabsCreatePage/OpenQuestionPrototipo.json';
//import MultipleChoicePrototipo from '../../components/TabsCreatePage/MultipleChoicePrototipo.json';
import { MdSave } from 'react-icons/md';
// import openQuestion from '../../components/TabsCreatePage/openQuestion.json';

const Edit = () => {
  const { user } = useUser();
  const router = useRouter();
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();
  const {
    exercise,
    title,
    description,
    data,
    handleData,
    apiFillGapsData,
    apiOpenQuestionData,
    apiMultipleChiocesData,
  } = useCreateOERsContext();

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);

  const handleOptionsComplete = () => {
    if (
      title != null &&
      title != '' &&
      description != null &&
      description != ''
    ) {
      setAreOptionsComplete(true);
    }
  };

  const handleSaveButtonClick = async () => {
    setLoading(true);
    // Costruisci l'oggetto di dati da inviare nella richiesta
    const requestData = {
      data: data,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        '/api/encore/createExerciseOER',
        requestData
      );

      // Gestisci la risposta
      setResponse(apiResponse.data);
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      // Gestisci l'errore, mostra un messaggio o fai qualcos'altro
    } finally {
      setLoading(false);
    }
  };

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
              <Heading>Edit the {hydrated && exercise} exercise</Heading>
            </Flex>
            <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
              <Text>This section provides guidance...</Text>
            </Box>
            {hydrated && exercise === 'Fill the gaps' && (
              /* Genera il primo elemento in base alla tua variabile */
              <Box w="80%">
                <EditFillGaps fillGapsData={apiFillGapsData} />
              </Box>
            )}
            {hydrated && exercise === 'Open Question' && (
              /* Genera il secondo elemento in base alla tua variabile */
              <Box w="80%">
                <EditOpenQuestion openQuestionData={apiOpenQuestionData} />
              </Box>
            )}
            {hydrated && exercise === 'Multiple Choice' && (
              /* Genera il terzo elemento in base alla tua variabile */
              <Box w="80%">
                <EditMultipleChoice
                  multipleChoiceData={apiMultipleChiocesData}
                />
              </Box>
            )}
            <Flex w="auto" position="absolute" bottom="5%" right="8%">
              <Button
                border={'1px solid'}
                borderRadius="lg"
                size="lg"
                type="submit"
                colorScheme="yellow"
                mt={4}
                w="100%"
                onClick={() => {
                  router.push('/create');
                }}
              >
                <Text>Back</Text>
              </Button>
              {loading && (
                <Box ml={4}>
                  <CircularProgress isIndeterminate color="yellow.400" />
                </Box>
              )}
              <Button
                marginLeft={'0.2rem'}
                border={'1px solid'}
                borderRadius="lg"
                size="lg"
                type="submit"
                colorScheme="yellow"
                mt={4}
                w="100%"
                //isDisabled={true}
                onClick={() => {
                  handleOptionsComplete();
                  if (areOptionsComplete) {
                    handleData();
                    console.log('Save');
                    handleSaveButtonClick();
                  } else {
                    addToast({
                      message:
                        'Please insert a title and a description of the exercise.',
                      type: 'warning',
                    });
                  }
                }}
              >
                <Text>Save</Text>
                <Icon as={MdSave} w="40%" h="40%" />
              </Button>
            </Flex>
            {!loading &&
              response &&
              addToast({
                message: 'Exercise saved successfully.',
                type: 'success',
              })}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Edit;
