import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LearningPathProvider } from '../../Contexts/LearningPathDesignContext/learningPathContext';
//import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import BoxSelectedLO from '../../components/Boxes/BoxSelectedLO';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import ShowHideButton from '../../components/Buttons/ShowHideButton';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import LearningPathTabs from '../../components/Tabs/LearningPathTabs';
import InfoGenAITextBox from '../../components/TextBox/InfoGenAITextBox';
import LearningPathTitleTextBox from '../../components/TextBox/LearningPathTitleTextBox';
import { ObjectLearningObjectiveProps } from '../../types/encoreElements';
import { useHasHydrated, useIsSmallerScreen } from '../../utils/utils';
//import { useToast } from '@chakra-ui/react';

// type DiscoverPageProps = {
//   accessToken: string | undefined;
// };

const Home = (/*props: DiscoverPageProps*/) => {
  // const { user } = useUser();
  const hydrated = useHasHydrated();
  const isSmallerScreen = useIsSmallerScreen(); // Use this for the responsive design of the page
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
    titleLearningPath,
    handleTitleLearningPath,
    isEditLessonPlanClicked,
  } = useLearningPathDesignContext();

  const router = useRouter();
  // const { collections } = useCollectionsContext();

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
  // const [isClicked, setIsClicked] = useState(false); // used for the API setup button

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

  return (
    <LearningPathProvider>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/design'} />
        <Navbar
          // user={user}
          pageName="Design"
        />

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
                {hydrated && (
                  <ShowHideButton
                    // isClicked={isClicked}
                    // setIsClicked={setIsClicked}
                    showBox={showBox}
                    setShowBox={setShowBox}
                    isUpDown={true}
                    showButtonName={
                      learningObjectiveObjects.length > 1
                        ? 'Learning objectives'
                        : 'Learning objective'
                    }
                    fontWeight="bold"
                    color="primary"
                    border="none"
                    letterSpacing={0}
                  />
                )}
              </Flex>
              {showBox && hydrated && (
                <Flex direction="column" gap={2} pt={3}>
                  {learningObjectiveObjects.map(
                    (objectLO: ObjectLearningObjectiveProps, index: number) => (
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

            <Flex pt="2rem">
              {/* TODO: Add a Textarea. The title of the lesson plan must be editable. */}
              {/* <Heading fontSize={'x-large'}>
                Introduction to usability - lesson plan
              </Heading> */}

              <Heading fontWeight={'bold'} w="100%">
                {hydrated &&
                  (isEditLessonPlanClicked ? (
                    <LearningPathTitleTextBox
                      titleLearningPath={titleLearningPath}
                      handleTitleLearningPath={handleTitleLearningPath}
                      placeholder="Enter a title describing the lesson plan..."
                    />
                  ) : (
                    <Text>{titleLearningPath}</Text>
                  ))}
              </Heading>
            </Flex>
            <Flex paddingTop="1rem" w="100%">
              {hydrated && (
                <LearningPathTabs isSmallerScreen={isSmallerScreen} />
              )}
            </Flex>
            <Flex paddingTop={'1.5rem'}>
              <InfoGenAITextBox isSmallerScreen={isSmallerScreen} />
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
