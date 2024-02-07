import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { LearningPathProvider } from '../../Contexts/learningPathContext';
//import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { Icon } from '@chakra-ui/react';
import { MdSave, MdUndo } from 'react-icons/md';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import LearningPathEditor from '../../components/Layout/LearningPathEditor';
import ThreeTextBoxes from '../../components/LearningObjectiveTextBoxes/LearningObjectiveTextBoxes';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { APIV2 } from '../../data/api';
import {
  OerFreeSearchProps,
  OerInCollectionProps,
  OerProps,
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
    handleUseLearningObjectives,
    handleSetCustomLearningObjectives,
    handleNewStoredLearningObjectives,
    handleLearningObjectives,
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSaveLearningObjectiveButtonClick = () => {
    handleNewStoredLearningObjectives();
    addToast({
      message: 'Learning objective saved!',
      type: 'success',
    });
  };

  const handleUndoLearningObjectiveButtonClick = () => {
    handleUseLearningObjectives();
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
    handleLearningObjectives();
    setIsLoading(false);
    handleSetCustomLearningObjectives();
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
              <Box paddingTop="0.5rem">
                <Card size="sm" shadow={0} backgroundColor={'#F8F9FA'}>
                  <Heading size={'sl'} fontFamily={'body'}>
                    Learning objective
                  </Heading>
                  <Flex
                    w="100%"
                    pr={isSmallerScreen ? '0' : `${SPACING}%`}
                    direction={isSmallerScreen ? 'column' : 'row'}
                    // flexWrap="wrap"
                    //wrap={'wrap'}
                  >
                    <Box
                      w={isSmallerScreen ? '100%' : '90%'}
                      pb={isSmallerScreen ? '2' : '0'}
                      pr={isSmallerScreen ? '0' : `5`}
                    >
                      <ThreeTextBoxes />
                    </Box>
                    <Flex
                      w={isSmallerScreen ? '100%' : '10%'}
                      gap="3%"
                      justifyContent={'flex-end'}
                    >
                      <Button
                        //marginRight={'1px'}
                        border={'1px solid'}
                        w={isSmallerScreen ? '20%' : '50%'}
                        colorScheme="yellow"
                        onClick={handleSaveLearningObjectiveButtonClick}
                      >
                        <Flex align="center">
                          <Icon as={MdSave} w={8} h={8} />
                        </Flex>
                      </Button>
                      <Button
                        //marginRight={'1px'}
                        border={'1px solid'}
                        w={isSmallerScreen ? '20%' : '50%'}
                        colorScheme="yellow"
                        onClick={handleUndoLearningObjectiveButtonClick}
                      >
                        <Flex align="center">
                          <Icon as={MdUndo} w={8} h={8} />
                        </Flex>
                      </Button>
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
                wPathEditor={isSmallerScreen ? '90%' : '85%'}
              />
            </Box>
          </Box>
          <Flex paddingTop="1.5rem" w="100%">
            <Flex
              w="auto"
              paddingRight={`${SPACING}%`}
              position={'fixed'}
              bottom="5%"
              right="11%"
            >
              <Button
                marginRight={'1px'}
                border={'1px solid'}
                w="100%"
                colorScheme="yellow"
                onClick={handlePrevButtonClick}
              >
                <Text fontWeight="bold" fontSize="lg">
                  Previous
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </LearningPathProvider>
  );
};

export default Home;
