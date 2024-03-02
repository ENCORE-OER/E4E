import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { LearningPathProvider } from '../../Contexts/learningPathContext';
//import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { Icon } from '@chakra-ui/react';
import axios from 'axios';
import { MdSave, MdUndo } from 'react-icons/md';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import BoxSelectedLearningObjective from '../../components/Boxes/BoxSelectedLearningObjective';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import LearningPathEditor from '../../components/Layout/LearningPathEditor';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { APIV2 } from '../../data/api';
import {
  OerFreeSearchProps,
  OerInCollectionProps,
  OerProps,
  SkillItemProps,
} from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';
//import { useToast } from '@chakra-ui/react';

//

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  const { user } = useUser();
  const hydrated = useHasHydrated();
  const {
    SPACING,
    collectionIndex,
    selectedCustomLearningObjective,
    handleSelectedCustomLearningObjectiveChange,
    storedLearningObjective,
    // Used for updateLearningScenario API call
    idLearningScenario,
    bloomLevels,
    bloomLevelIndex,
    selectedSkillConceptsTags,
    learningTextContext,
    selectedOptions, // verbsBloomLevel
    // ----------------------------------------
    // This are used with <ThreeTextBoxes /> component
    // handleUseLearningObjectives,
    // handleSetCustomLearningObjectives,
    // handleNewStoredLearningObjectives,
    // handleLearningObjectives,
    // ----------------------------------------
    handleResetAll,
    handleStoredLearningObjective,
    handleLearningObjective,
    //learningObjectives,
  } = useLearningPathDesignContext();

  const router = useRouter();
  const { collections } = useCollectionsContext();

  // ==================================================================

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // ==================================================================

  const [oersById, setOersById] = useState<
    (OerProps | OerFreeSearchProps | undefined)[]
  >([]);

  const { addToast } = CustomToast();
  //const [conceptSelectedIndex, setConceptSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false); // used to show the loading spinner for the learning objective boxes
  const [isLearningObjectiveChanged, setIsLearningObjectiveChanged] =
    useState(false); // used to say if the learning objective has been changed
  const [isOriginalLOSelected, setIsOriginalLOSelected] = useState(true); // used to say if there is a new learning objective selected

  const getDataOerById = async (id_oer?: number) => {
    const api = new APIV2(props.accessToken);

    if (id_oer) {
      try {
        const oer = await api.getOerById(id_oer);
        return oer[0];
      } catch (error) {
        throw error;
      }
    }
  };

  // update the learning objective in the learning scenario on the database
  const updateLearningScenario = async () => {
    // const api = new APIV2(props.accessToken);

    try {
      // await api.updateLearningScenario(
      //   idLearningScenario,
      //   bloomLevels[bloomLevelIndex]?.name ?? '',
      //   selectedOptions ?? [],
      //   selectedSkillConceptsTags?.map((item: SkillItemProps) => item.id) ?? [],
      //   learningTextContext ?? '',
      //   selectedCustomLearningObjective ?? ''
      // );

      await axios.put(
        `/api/encore/updateLearningObjective/${idLearningScenario}`,
        {
          BloomLevel: {
            name: bloomLevels[bloomLevelIndex]?.name,
            verbs: selectedOptions,
          },
          Skills: selectedSkillConceptsTags?.map(
            (item: SkillItemProps) => item.id
          ),
          LearningContext: learningTextContext,
          textLearningObjective: selectedCustomLearningObjective,
        }
      );
    } catch (error) {
      throw error;
    }
  };

  const handleSaveLearningObjectiveButtonClick = () => {
    //handleNewStoredLearningObjectives();

    // Check if all the required fields are filled out.
    // This also for the handleStoredLearningObjective() function to hav the same data locally and on the database
    if (
      idLearningScenario?.trim() !== '' &&
      bloomLevelIndex !== null &&
      bloomLevelIndex > -1 &&
      selectedSkillConceptsTags.length > 0 &&
      learningTextContext?.trim() !== '' &&
      selectedOptions.length > 0 &&
      selectedCustomLearningObjective?.trim() !== ''
    ) {
      handleStoredLearningObjective(); // store the actual selected learning objective in the context

      // update the learning objective in the learning scenario on the database
      updateLearningScenario();
      setIsLearningObjectiveChanged(false);
      addToast({
        message: 'Learning objective saved!',
        type: 'success',
      });
    } else if (selectedCustomLearningObjective?.trim() === '') {
      addToast({
        message: "The learning objective can't be empty! ",
        type: 'error',
      });
    } else {
      addToast({
        message:
          'Please ensure all required fields are filled out before saving new updates.',
        type: 'warning',
      });
    }
  };

  const handleUndoLearningObjectiveButtonClick = () => {
    //handleUseLearningObjectives();
    handleLearningObjective(); // restore the last stored learning objective
    setIsLearningObjectiveChanged(false);

    addToast({
      message: 'Learning objective restored',
      type: 'info',
    });
  };

  const handlePrevButtonClick = () => {
    //handleResetStep1();
    router.push({
      pathname: '/design/LearningObjective',
    });
  };

  useEffect(() => {
    //handleLearningObjectives();
    setIsLoading(false);
    //handleSetCustomLearningObjectives();
  }, [oersById]);

  // useEffect(() => {

  // }, []);

  // setIndexCollectionClicked is used in CollectionMenu component
  useEffect(() => {
    setIsLoading(true);
    if (collections?.length > 0 && hydrated) {
      if (collections[collectionIndex]?.oers?.length > 0) {
        try {
          const fetchOerData = async () => {
            const oerData = await Promise.all(
              collections[collectionIndex]?.oers?.map(
                async (oer: OerInCollectionProps) => {
                  const oerFound = await getDataOerById(oer?.id);
                  return oerFound;
                }
              )
            );
            setOersById(oerData);
          };

          fetchOerData();

          //console.log(oersById);

          // this part is commented because we don't need to select a concept to create a learning path
          /* if (
            collections[indexCollectionClicked]?.conceptsSelected?.length === 0
          ) {
            addToast({
              message:
                'You need to select concepts from the saved OERs to create learning paths.',
              type: 'warning',
            });
            throw new Error('No concepts selected in this collection!');
            
          } else {
            setConceptSelectedIndex(0);
          }*/
          setIsLoading(false);
        } catch (error) {
          addToast({
            message: `${error}`,
            type: 'error',
          });

          setIsLoading(false);
        }
      } else {
        addToast({
          message: 'No OERs found in this collection!',
          type: 'error',
        });
        addToast({
          message: 'You need to save OERs to create learning paths.',
          type: 'warning',
        });
      }
    } else if (collections?.length === 0 && collectionIndex < 0) {
      addToast({
        message: 'No collection created!',
        type: 'error',
      });
      addToast({
        message:
          'Before accessing Plan, create a collection and save the OERs that interest you.',
        type: 'warning',
      });
      setTimeout(() => {
        router.push({
          pathname: '/',
        });
      }, 1000);
    }

    setIsLoading(false);
  }, [hydrated, collectionIndex]);

  return (
    <LearningPathProvider>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/design'} />
        <Navbar user={user} pageName="Design" />

        <Box
          //ml="200px"
          py="115px"
          pl={isSmallerScreen ? '90px' : '240px'}
          //px="40px"
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
              <Heading>Learning path design</Heading>
            </Flex>
            <Box w={isSmallerScreen ? '95%' : '90%'}>
              <Box paddingTop="1.5rem" justifyContent="left">
                <Box>
                  <LearningStepper
                    activeStep={2}
                    isSmallerScreen={isSmallerScreen}
                  />
                </Box>
                <Box paddingTop="2rem">
                  <Text>
                    Based on the information provided this a potential learning
                    objective and a suggested learning path. You have the
                    flexibility to modify and customize both the description of
                    the learning objective and the types and sequence of the
                    proposed activities
                  </Text>
                </Box>
              </Box>
              <Box paddingTop="1rem">
                <Card size="sm" shadow={0} backgroundColor={'#F8F9FA'}>
                  <Flex direction="row" w="100%">
                    <Heading size={'sl'} fontFamily={'body'} pl="3">
                      Learning objective
                    </Heading>
                    {hydrated && isOriginalLOSelected ? (
                      <Flex flexWrap={'wrap'} flex="1">
                        <Text pl="5%" color="red.500">
                          {'New learning objective selected.'}
                        </Text>
                        <Text color="red.500">
                          {'Save to retrieve it after eventually changes!'}
                        </Text>
                      </Flex>
                    ) : null}
                    {hydrated &&
                    isLearningObjectiveChanged &&
                    !isOriginalLOSelected ? (
                      <Text pl="5%" color="red">
                        {"Unsaved changes. Don't forget to save!"}
                      </Text>
                    ) : null}
                  </Flex>

                  <Flex
                    w="100%"
                    pr={isSmallerScreen ? '0' : `${SPACING}%`}
                    //pr='0'
                    direction={isSmallerScreen ? 'column' : 'row'}
                    //direction='column'
                    align={'center'}

                    // flexWrap="wrap"
                    //wrap={'wrap'}
                  >
                    <Box
                      w={isSmallerScreen ? '100%' : '90%'}
                      pb={isSmallerScreen ? '2' : '0'}
                      pr={isSmallerScreen ? '0' : `5`}
                    >
                      {
                        //<ThreeTextBoxes />
                      }
                      {hydrated && (
                        <BoxSelectedLearningObjective
                          text={selectedCustomLearningObjective}
                          onTextChange={
                            handleSelectedCustomLearningObjectiveChange
                          }
                          isLearningObjectiveChanged={
                            isLearningObjectiveChanged
                          }
                          setIsLearningObjectiveChanged={
                            setIsLearningObjectiveChanged
                          }
                          storedLearningObjective={storedLearningObjective}
                          isOriginalLOSelected={isOriginalLOSelected}
                          setIsOriginalLOSelected={setIsOriginalLOSelected}
                        />
                      )}

                      {/* TODO: this is the best solution? I could also let BoxSelectedLearningObjective and use the save button to update the text */}

                      {
                        // hydrated &&
                        //   <BoxGeneratedLO
                        //     textLearningObjective={selectedCustomLearningObjective}
                        //     handleConfirmLO={handleSelectedCustomLearningObjectiveChange}
                        //   />
                      }
                    </Box>
                    <Flex
                      w={isSmallerScreen ? '100%' : '10%'}
                      //w='100%'
                      gap={isSmallerScreen ? '3%' : '2%'}
                      justifyContent={'flex-end'}
                      direction={isSmallerScreen ? 'row' : 'column'}
                      //columnGap={isSmallerScreen ? '3%' : '2%'}
                    >
                      <Flex py={1} w={isSmallerScreen ? '15%' : '100%'}>
                        <Tooltip
                          display={'flex'}
                          label="Save the updated learning objective"
                          bg={'accent.900'}
                          color="black"
                          placement={'top'}
                          borderRadius={'md'}
                        >
                          <Button
                            //marginRight={'1px'}
                            border={'1px solid'}
                            // w='100%'
                            colorScheme="yellow"
                            onClick={handleSaveLearningObjectiveButtonClick}
                          >
                            <Flex align="center">
                              <Icon as={MdSave} w={8} h={8} />
                            </Flex>
                          </Button>
                        </Tooltip>
                      </Flex>
                      <Flex py={1} w={isSmallerScreen ? '15%' : '100%'}>
                        <Tooltip
                          display={'flex'}
                          label="Restore the last saved learning objective"
                          bg={'accent.900'}
                          color="black"
                          placement={'top'}
                          borderRadius={'md'}
                        >
                          <Button
                            //marginRight={'1px'}
                            border={'1px solid'}
                            // w='100%'
                            colorScheme="yellow"
                            //isDisabled={storedLearningObjective === selectedCustomLearningObjective}
                            onClick={handleUndoLearningObjectiveButtonClick}
                          >
                            <Flex align="center">
                              <Icon as={MdUndo} w={8} h={8} />
                            </Flex>
                          </Button>
                        </Tooltip>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
            </Box>
            <Box
              position="relative"
              paddingTop={isSmallerScreen ? '1rem' : '2rem'}
            >
              <LearningPathEditor
                //setConceptSelectedIndex={setConceptSelectedIndex}
                isLoading={isLoading}
                oers={oersById}
                conceptSelectedIndex={0}
                collectionColor={[collections[collectionIndex]?.color]}
                wPathEditor={isSmallerScreen ? '90%' : '95%'}
              />
            </Box>
          </Box>
          <FooterButtonsGroup
            SPACING={SPACING}
            handleResetAll={handleResetAll}
            handlePrevButtonClick={handlePrevButtonClick}
          />
        </Box>
      </Flex>
    </LearningPathProvider>
  );
};

export default Home;
