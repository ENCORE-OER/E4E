import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LearningPathProvider } from '../../Contexts/learningPathContext';
//import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import BoxSelectedLO from '../../components/Boxes/BoxSelectedLO';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import ShowHideButton from '../../components/Buttons/ShowHideButton';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import TableLearningPath from '../../components/Tables';
import { ObjectLearningObjectiveProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
//import { useToast } from '@chakra-ui/react';

// type DiscoverPageProps = {
//   accessToken: string | undefined;
// };

const Home = (/*props: DiscoverPageProps*/) => {
  const { user } = useUser();
  const hydrated = useHasHydrated();
  const {
    SPACING,
    // collectionIndex,
    // selectedCustomLearningObjective,
    // handleSelectedCustomLearningObjectiveChange,
    // storedLearningObjective,
    // // Used for updateLearningScenario API call
    // idLearningScenario,
    // bloomLevels,
    // bloomLevelIndex,
    // selectedSkillConceptsTags,
    // learningTextContext,
    // selectedOptions, // verbsBloomLevel
    // ----------------------------------------
    // This are used with <ThreeTextBoxes /> component
    // handleUseLearningObjectives,
    // handleSetCustomLearningObjectives,
    // handleNewStoredLearningObjectives,
    // handleLearningObjectives,
    // ----------------------------------------
    handleResetAll,
    // handleStoredLearningObjective,
    // handleLearningObjective,
    //learningObjectives,
    learningObjectiveObjects,
  } = useLearningPathDesignContext();

  const router = useRouter();
  // const { collections } = useCollectionsContext();

  // ==================================================================

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // ==================================================================

  // const [oersById, setOersById] = useState<
  //   (OerProps | OerFreeSearchProps | undefined)[]
  // >([]);

  // const { addToast } = CustomToast();
  //const [conceptSelectedIndex, setConceptSelectedIndex] = useState<number>(-1);
  // const [isLoading, setIsLoading] = useState(false); // used to show the loading spinner for the learning objective boxes
  // const [isLearningObjectiveChanged, setIsLearningObjectiveChanged] =
  //   useState(false); // used to say if the learning objective has been changed
  // const [isOriginalLOSelected, setIsOriginalLOSelected] = useState(false); // used to say if there is a new learning objective selected

  // Show Generate Learning Objectives area
  const [showBox, setShowBox] = useState(true); // used to show the API setup boxes
  const [isClicked, setIsClicked] = useState(false); // used for the API setup button

  // const getDataOerById = async (id_oer?: number) => {
  //   const api = new APIV2(props.accessToken);

  //   if (id_oer) {
  //     try {
  //       const oer = await api.getOerById(id_oer);
  //       return oer[0];
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // };

  // // update the learning objective in the learning scenario on the database
  // const updateLearningScenario = async () => {
  //   // const api = new APIV2(props.accessToken);

  //   try {
  //     // await api.updateLearningScenario(
  //     //   idLearningScenario,
  //     //   bloomLevels[bloomLevelIndex]?.name ?? '',
  //     //   selectedOptions ?? [],
  //     //   selectedSkillConceptsTags?.map((item: SkillItemProps) => item.id) ?? [],
  //     //   learningTextContext ?? '',
  //     //   selectedCustomLearningObjective ?? ''
  //     // );

  //     await axios.put(
  //       `/api/encore/updateLearningObjective/${idLearningScenario}`,
  //       {
  //         BloomLevel: {
  //           name: bloomLevels[bloomLevelIndex]?.name,
  //           verbs: selectedOptions,
  //         },
  //         Skills: selectedSkillConceptsTags?.map(
  //           (item: SkillItemProps) => item.id
  //         ),
  //         LearningContext: learningTextContext,
  //         textLearningObjective: selectedCustomLearningObjective,
  //       }
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const handleSaveLearningObjectiveButtonClick = () => {
  //   //handleNewStoredLearningObjectives();

  //   // Check if all the required fields are filled out.
  //   // This also for the handleStoredLearningObjective() function to hav the same data locally and on the database
  //   if (
  //     idLearningScenario?.trim() !== '' &&
  //     bloomLevelIndex !== null &&
  //     bloomLevelIndex > -1 &&
  //     selectedSkillConceptsTags.length > 0 &&
  //     learningTextContext?.trim() !== '' &&
  //     selectedOptions.length > 0 &&
  //     selectedCustomLearningObjective?.trim() !== ''
  //   ) {
  //     handleStoredLearningObjective(); // store the actual selected learning objective in the context

  //     // update the learning objective in the learning scenario on the database
  //     updateLearningScenario();
  //     setIsLearningObjectiveChanged(false);
  //     addToast({
  //       message: 'Learning objective saved!',
  //       type: 'success',
  //     });
  //   } else if (selectedCustomLearningObjective?.trim() === '') {
  //     addToast({
  //       message: "The learning objective can't be empty! ",
  //       type: 'error',
  //     });
  //   } else {
  //     addToast({
  //       message:
  //         'Please ensure all required fields are filled out before saving new updates.',
  //       type: 'warning',
  //     });
  //   }
  // };

  // const handleUndoLearningObjectiveButtonClick = () => {
  //   //handleUseLearningObjectives();
  //   handleLearningObjective(); // restore the last stored learning objective
  //   setIsLearningObjectiveChanged(false);

  //   addToast({
  //     message: 'Learning objective restored',
  //     type: 'info',
  //   });
  // };

  const handlePrevButtonClick = () => {
    //handleResetStep1();
    router.push({
      pathname: '/design/LearningObjective',
    });
  };

  // useEffect(() => {
  //   //handleLearningObjectives();
  //   setIsLoading(false);
  //   //handleSetCustomLearningObjectives();
  // }, [oersById]);

  // useEffect(() => {

  // }, []);

  // // setIndexCollectionClicked is used in CollectionMenu component
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (collections?.length > 0 && hydrated) {
  //     if (collections[collectionIndex]?.oers?.length > 0) {
  //       try {
  //         const fetchOerData = async () => {
  //           const oerData = await Promise.all(
  //             collections[collectionIndex]?.oers?.map(
  //               async (oer: OerInCollectionProps) => {
  //                 const oerFound = await getDataOerById(oer?.id);
  //                 return oerFound;
  //               }
  //             )
  //           );
  //           setOersById(oerData);
  //         };

  //         fetchOerData();

  //         //console.log(oersById);

  //         // this part is commented because we don't need to select a concept to create a learning path
  //         /* if (
  //           collections[indexCollectionClicked]?.conceptsSelected?.length === 0
  //         ) {
  //           addToast({
  //             message:
  //               'You need to select concepts from the saved OERs to create learning paths.',
  //             type: 'warning',
  //           });
  //           throw new Error('No concepts selected in this collection!');

  //         } else {
  //           setConceptSelectedIndex(0);
  //         }*/
  //         setIsLoading(false);
  //       } catch (error) {
  //         addToast({
  //           message: `${error}`,
  //           type: 'error',
  //         });

  //         setIsLoading(false);
  //       }
  //     } else {
  //       addToast({
  //         message: 'No OERs found in this collection!',
  //         type: 'error',
  //       });
  //       addToast({
  //         message: 'You need to save OERs to create learning paths.',
  //         type: 'warning',
  //       });
  //     }
  //   } else if (collections?.length === 0 && collectionIndex < 0) {
  //     addToast({
  //       message: 'No collection created!',
  //       type: 'error',
  //     });
  //     addToast({
  //       message:
  //         'Before accessing Plan, create a collection and save the OERs that interest you.',
  //       type: 'warning',
  //     });
  //     setTimeout(() => {
  //       router.push({
  //         pathname: '/',
  //       });
  //     }, 1000);
  //   }

  //   setIsLoading(false);
  // }, [hydrated, collectionIndex]);

  return (
    <LearningPathProvider>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/design'} />
        <Navbar user={user} pageName="Design" />

        <Box
          py="115px"
          pl={isSmallerScreen ? '90px' : '240px'}
          w="full"
          minH="100vh"
          bg="background"
        >
          <Box
            // w="100%"
            w={isSmallerScreen ? '95%' : '80%'}
            h="100%"
          >
            <Flex
              w="100%"
              justifyContent="left"
            //justify="space-between"
            >
              <Heading>Learning path design</Heading>
            </Flex>

            <Box
              paddingTop="1.5rem"
              w="100%"
              justifyContent="left"
            //justify="space-between"
            >
              <LearningStepper
                activeStep={2}
                isSmallerScreen={isSmallerScreen}
              />
            </Box>

            <Flex paddingTop="1.5rem" direction="column">
              <Flex>
                <ShowHideButton
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  showBox={showBox}
                  setShowBox={setShowBox}
                  isUpDown={true}
                  showButtonName="Learning objective(s)"
                  hideButtonName="Learning objective(s)"
                  fontWeight="bold"
                  color="primary"
                  border="none"
                />
              </Flex>
              {showBox && hydrated && (
                <Flex direction="column" gap={2} pt={3}>
                  {learningObjectiveObjects
                    .filter(
                      (objectLO: ObjectLearningObjectiveProps) =>
                        objectLO.isSelected
                    )
                    .map(
                      (
                        objectLO: ObjectLearningObjectiveProps,
                        index: number
                      ) => (
                        <BoxSelectedLO
                          key={index}
                          index={index}
                          learningObjective={objectLO.learningObjective}
                        />
                      )
                    )}
                </Flex>
              )}
            </Flex>

            <Flex paddingTop='1.5rem'>
              <TableLearningPath />
            </Flex>

            {/* <Box
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
            </Box> */}
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
