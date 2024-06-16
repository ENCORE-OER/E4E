// import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';
import { CreateProps } from '.';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import CheckboxDropdown from '../../components/DropDownMenu/CheckboxDropdown';
import CollectionDropDownMenu from '../../components/DropDownMenu/CollectionDropDownMenui';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import EditFillGaps from '../../components/Tabs/TabsCreatePage/EditFillGaps';
import EditMultipleChoice from '../../components/Tabs/TabsCreatePage/EditMultipleChoice';
import EditOpenQuestion from '../../components/Tabs/TabsCreatePage/EditOpenQuestion';
import {
  OerInCollectionProps,
  domainOptions,
  licenseOption,
  tyopeOfResourcesOption,
} from '../../types/encoreElements/index';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated, useIsSmallerScreen } from '../../utils/utils';

const Edit = ({
  isAddContentModal,
  isEditClicked,
  setIsEditClicked,
}: CreateProps) => {
  // const { user } = useUser();
  const router = useRouter();
  const isSmallerScreen = useIsSmallerScreen(); // Use this for the responsive design of the page
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();
  const { collections, addResource } = useCollectionsContext();
  const {
    title,
    description,
    data,
    handleData,
    apiGeneratedExerciseData,
    chosenTypeOfExercise,
    // apiFillGapsData
    // apiOpenQuestionData,
    // apiMultipleChiocesData,
  } = useCreateOERsContext();

  // This is the collection selected in "Learning Objective" page
  const { collectionIndex: selectedCollectionIndex } =
    useLearningPathDesignContext();

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [areOptionsComplete, setAreOptionsComplete] = useState<boolean>(true);
  const [collectionIndex, setCollectionIndex] = useState<number>(
    isAddContentModal ? selectedCollectionIndex : -1
  );
  const [selectedLicence, setSelectedLicence] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string[]>([]);
  const [selectedTypeOfResource, setSelectedTypeOfResource] = useState<
    string[]
  >([]);
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  const handleSelectedLicence = (selectedLicence: string[]) => {
    setSelectedLicence(selectedLicence);
  };
  const handleSelectedDomain = (selectedDomain: string[]) => {
    setSelectedDomain(selectedDomain);
  };
  const handleSelectedTypeOfResource = (selectedTypeOfResource: string[]) => {
    setSelectedTypeOfResource(selectedTypeOfResource);
  };
  const handleSelectedAudience = (selectedAudience: string[]) => {
    setSelectedAudience(selectedAudience);
  };

  const handleCollectionChange = (collectionIndex: number) => {
    setCollectionIndex(collectionIndex);
  };

  const handleOptionsComplete = () => {
    if (title != '' && description != '' && collectionIndex > -1) {
      setAreOptionsComplete(true);
    } else {
      setAreOptionsComplete(false);
    }
  };

  const handleSaveButtonClick = async () => {
    setLoading(true);
    // Costruisci l'oggetto di dati da inviare nella richiesta
    const requestData = {
      data: data,
    };
    console.log('requestData', requestData);

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        '/api/encore/createExerciseOER',
        requestData
      );

      // Gestisci la risposta
      setResponse(apiResponse.data);
      console.log('response', response);
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      // Gestisci l'errore, mostra un messaggio o fai qualcos'altro
    } finally {
      setLoading(false);
    }
  };

  const handleAddExerciseToCollection = async () => {
    if (!loading && response) {
      const temp: OerInCollectionProps = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        concepts: [],
        urlSource: response.data.source,
        generated_by_ai: response.data.generated_by_ai,
      };
      console.log('temp', temp);
      await addResource(collections[collectionIndex].id, temp);
    } else {
      console.log('Unable to add exercise to collection:', {
        loading,
        response,
      });
    }
  };

  const handleBackClick = () => {
    !isAddContentModal
      ? router.push('/create')
      : isEditClicked !== undefined && isEditClicked
        ? setIsEditClicked(!isEditClicked)
        : undefined;
  };

  const handleSaveClick = () => {
    handleOptionsComplete();
    if (areOptionsComplete) {
      handleData();
      handleSaveButtonClick();

      //console.log('Save');
    } else {
      addToast({
        message: 'Please insert a title and a description of the exercise.',
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    if (!loading && response && !toastDisplayed) {
      addToast({
        message: 'Exercise saved successfully.',
        type: 'success',
      });
      setToastDisplayed(true);
    }
  }, [loading, response, toastDisplayed]);

  useEffect(() => {
    handleOptionsComplete();
    handleData();
    //console.log('data', data);
  }, [title, description]);

  useEffect(() => {
    //console.log('response', response);
    if (response) {
      handleAddExerciseToCollection();
    }
  }, [response]);

  useEffect(() => {
    // console.log('selectedLicence', selectedLicence);
    // console.log('selectedDomain', selectedDomain);
    // console.log('selectedTypeOfResource', selectedTypeOfResource);
    // console.log('selectedAudience', selectedAudience);
    // console.log('collectionIndex', collectionIndex);
  }, [
    selectedLicence,
    selectedDomain,
    selectedTypeOfResource,
    selectedAudience,
  ]);

  return (
    <>
      <Flex w="100%" h="100%">
        {!isAddContentModal && <SideBar pagePath={'/create'} />}
        {!isAddContentModal && (
          <Navbar
            // user={user}
            pageName="Create"
          />
        )}
        <Box
          //ml="200px"
          py={!isAddContentModal ? '115px' : '1rem'}
          pl={isSmallerScreen || isAddContentModal ? '90px' : '240px'}
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
              <Heading>Edit the exercise</Heading>
            </Flex>
            <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
              <Text>This section provides guidance...</Text>
            </Box>
            <Box w="80%">
              <Flex>
                <Box w="30%">
                  <Flex paddingBottom="0.5rem" paddingTop="1rem">
                    <Text as="b">License</Text>
                  </Flex>
                  <CheckboxDropdown
                    options={licenseOption}
                    onChange={handleSelectedLicence}
                    title="License"
                  />
                </Box>
                <Spacer />
                <Box w="65%">
                  <Flex paddingBottom="0.5rem" paddingTop="1rem">
                    <Text as="b">
                      Select a collection to save the exercise to
                    </Text>
                  </Flex>
                  <CollectionDropDownMenu
                    options={collections}
                    title="Select a collection"
                    selectedIndex={collectionIndex}
                    onChange={handleCollectionChange}
                    isHighlighted={areOptionsComplete}
                  />
                </Box>
              </Flex>
              <Flex>
                <Box w="30%">
                  <Flex paddingBottom="0.5rem" paddingTop="1rem">
                    <Text as="b">Domain</Text>
                  </Flex>
                  <CheckboxDropdown
                    options={domainOptions}
                    onChange={handleSelectedDomain}
                    title="Select"
                  />
                </Box>
                <Spacer />
                <Box w="30%">
                  <Flex paddingBottom="0.5rem" paddingTop="1rem">
                    <Text as="b">Type of resources</Text>
                  </Flex>
                  <CheckboxDropdown
                    options={tyopeOfResourcesOption}
                    onChange={handleSelectedTypeOfResource}
                    title="Select"
                  />
                </Box>
                <Spacer />
                <Box w="30%">
                  <Flex paddingBottom="0.5rem" paddingTop="1rem">
                    <Text as="b">Audience</Text>
                  </Flex>
                  <CheckboxDropdown
                    options={licenseOption}
                    onChange={handleSelectedAudience}
                    title="Select"
                  />
                </Box>
              </Flex>
            </Box>
            {/* {console.log('chosenTypeOfExercise', chosenTypeOfExercise)} */}
            {hydrated && chosenTypeOfExercise === 3 && (
              /* Genera il primo elemento in base alla tua variabile */
              <Box w="80%">
                <EditFillGaps fillGapsData={apiGeneratedExerciseData} />
              </Box>
            )}
            {hydrated && chosenTypeOfExercise < 3 && (
              /* Genera il secondo elemento in base alla tua variabile */
              <Box w="80%">
                <EditOpenQuestion openQuestionData={apiGeneratedExerciseData} />
              </Box>
            )}
            {hydrated && chosenTypeOfExercise > 3 && (
              /* Genera il terzo elemento in base alla tua variabile */
              <Box w="80%">
                <EditMultipleChoice
                  multipleChoiceData={apiGeneratedExerciseData}
                />
              </Box>
            )}
            <Flex w="auto" position="absolute" bottom="5%" right="8%">
              <Button
                border="1px solid"
                borderRadius="lg"
                size="lg"
                type="submit"
                colorScheme="yellow"
                mt={4}
                w="100%"
                onClick={handleBackClick}
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
                onClick={handleSaveClick}
              >
                <Text>Save</Text>
                <Icon as={MdSave} w="40%" h="40%" />
              </Button>
            </Flex>
            {/* {console.log('response', response)}
            {!loading &&
              response &&
              addToast({
                message: 'Exercise saved successfully.',
                type: 'success',
              })
            } */}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Edit;
