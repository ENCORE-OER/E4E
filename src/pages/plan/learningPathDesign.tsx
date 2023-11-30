import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  Button,
} from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LearningPathProvider } from '../../Contexts/learningPathContext';
import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { useCollectionsContext } from '../../components/CollectionsContext/CollectionsContext';
// import HeadingPlanDesign from '../../components/Heading/HeadingPlanDesign';
import LearningPathEditor from '../../components/Layout/LearningPathEditor';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import { APIV2 } from '../../data/api';
import { OerInCollectionProps, OerProps } from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';
import LearningStepper from '../../components/Stepper/Stepper';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  const { user } = useUser();
  const hydrated = useHasHydrated();
const { SPACING, pathDesignData, /*handleResetStep1*/ } =
    useLearningPathDesignContext();

  const router = useRouter();
  const { collections, indexCollectionClicked } =
    useCollectionsContext();

  const [oersById, setOersById] = useState<OerProps[]>([]);

  const { addToast } = CustomToast();
  const [conceptSelectedIndex, setConceptSelectedIndex] = useState<number>(-1);

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
  
  const handlePrevButtonClick = () => {
    //handleResetStep1();
    router.push({
      pathname: '/plan/LearningObjective',
    });
  };

  // setIndexCollectionClicked is used in CollectionMenu component
  useEffect(() => {
    console.log(indexCollectionClicked);

    if (collections?.length > 0 && hydrated && indexCollectionClicked >= 0) {
      if (collections[indexCollectionClicked]?.oers?.length > 0) {
        try {
          const fetchOerData = async () => {
            const oerData = await Promise.all(
              collections[indexCollectionClicked]?.oers?.map(
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

          if (
            collections[indexCollectionClicked]?.conceptsSelected?.length === 0
          ) {
            addToast({
              message: 'No concepts selected in this collection!',
              type: 'error',
            });
            addToast({
              message:
                'You need to select concepts from the saved OERs to create learning paths.',
              type: 'warning',
            });
          } else {
            setConceptSelectedIndex(0);
          }
        } catch (error) {
          throw error;
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
    } else if (collections?.length === 0 && indexCollectionClicked < 0) {
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
  }, [indexCollectionClicked]);

  useEffect(() => {
    console.log(conceptSelectedIndex);
  }, [conceptSelectedIndex]);

  return (
    <LearningPathProvider>   
      <Flex w="100%" h="100%">
        <Navbar user={user} pageName="Plan" />
        <SideBar pagePath={'/plan'} />

        <Box
          ml="200px"
          py="115px"
          px="40px"
          w="full"
          h={conceptSelectedIndex === -1 ? '100vh' : 'full'}
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
            <Box paddingTop="1.5rem" w="100%" justifyContent="left">
              <Box w="80% ">
                <LearningStepper activeStep={2} />
              </Box>
              <Box w="80%" paddingTop="2rem">
                <Text>
                  Based on the information provided this a potential learning
                  objective and a suggested learning path. You have the
                  flexibility to modify and customize both the description of the
                  learning objective and the types and sequence of the proposed
                  activities
                </Text>
              </Box>
            </Box>
            <Box paddingTop="0.5rem" w="80%">
              <Card size="sm" shadow={0} backgroundColor={'#F8F9FA'}>
                <Heading size={'sl'} fontFamily={'body'}>
                  Learning objective
                </Heading>
                <CardBody
                  backgroundColor={'#EDF2F7'}
                  border="1px"
                  borderColor={'#CED4DA'}
                  borderRadius={'md'}
                >
                  <Text>
                    List key principle of:{' '}
                    {hydrated &&
                      pathDesignData.skills &&
                      pathDesignData.skills.join(', ')}
                    {'. '}
                    {hydrated &&
                      pathDesignData.verbsLearingObjective &&
                      pathDesignData.verbsLearingObjective.join(' and ')}{' '}
                    {hydrated && pathDesignData.textLearingObjective}
                  </Text>
                </CardBody>
              </Card>
            </Box>

            <Box position="relative" paddingTop="2rem">
              <Flex>
                <Box
                  p={3}
                  w="80%"
                  h="auto"
                  border="2px"
                  borderRadius="10px"
                  borderColor="secondary"
                  borderStyle="solid"
                >
                  <ConceptButtonsList
                  collections={collections}
                  conceptSelectedIndex={conceptSelectedIndex}
                  setConceptSelectedIndex={setConceptSelectedIndex}
                  collectionIndex={indexCollectionClicked}
                />
                </Box>

              </Flex>

              <LearningPathEditor
                collectionIndex={indexCollectionClicked}
                setConceptSelectedIndex={setConceptSelectedIndex}
                oers={oersById}
                conceptSelectedIndex={conceptSelectedIndex}
                collectionColor={collections[indexCollectionClicked]?.color}
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
