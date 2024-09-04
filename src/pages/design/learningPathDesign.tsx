import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LearningPathProvider } from '../../Contexts/LearningPathDesignContext/learningPathContext';
//import ConceptButtonsList from '../../components/Buttons/ConceptButtonsList';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import BoxSelectedLO from '../../components/Boxes/BoxSelectedLO';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import PreviousButton from '../../components/Buttons/ButtonsDesignPage/UnderlinedButtons/PreviousButton';
import ShowHideButton from '../../components/Buttons/ShowHideButton';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import LearningPathTabs from '../../components/Tabs/LearningPathTabs';
import InfoGenAITextBox from '../../components/TextBox/InfoTextBox/InfoGenAITextBox';
import LearningPathTitleTextBox from '../../components/TextBox/LearningPathTitleTextBox';
import LabelEmptyFieldTable from '../../components/Texts/LabelEmptyFieldTable';
import { ObjectLearningObjectiveProps } from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { handleSaveLearningScenarioClick } from '../../utils/learningScenarioUtils';
import { useHasHydrated, useIsSmallerScreen } from '../../utils/utils';
//import { useToast } from '@chakra-ui/react';

// type DiscoverPageProps = {
//   accessToken: string | undefined;
// };

const Home = (/*props: DiscoverPageProps*/) => {
  // const { user } = useUser();
  const hydrated = useHasHydrated();
  const isSmallerScreen = useIsSmallerScreen(); // Use this for the responsive design of the page
  const { addToast } = CustomToast();
  const {
    SPACING,
    // collectionIndex,
    // Used for updateLearningScenario API call
    idLearningScenario,
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience,
    bloomLevels,
    bloomLevelIndex,
    selectedSkillConceptTags,
    learningTextContext,
    selectedOptions, // verbsBloomLevel
    lessonActivities,
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
    macroSubject,
    isEditLessonPlanClicked,
    editActivityLessonIndex,
    handleIdLearningScenario,
    handleSaveLessonPlanClick,
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

  const [isSavingEmptyTitle, setIsSavingEmptyTitle] = useState<boolean>(false); // Set true if the save button is clicked but the learning path title is empty

  const handleEmptyTitle = () => {
    if (titleLearningPath.trim().length === 0) {
      setIsSavingEmptyTitle(true);
    }
  }

  const handleSave = async () => {

    await handleSaveLearningScenarioClick(
      idLearningScenario,
      selectedEducatorExperience,
      selectedContext,
      selectedGroupDimension,
      selectedLearnerExperience,
      bloomLevels,
      bloomLevelIndex,
      selectedOptions,
      selectedSkillConceptTags,
      learningTextContext,
      learningObjectiveObjects,
      titleLearningPath,
      macroSubject,
      lessonActivities,
      handleIdLearningScenario
    );

    if (isSavingEmptyTitle) {
      setIsSavingEmptyTitle(false);
    }
  };

  const handlePrevButtonClick = () => {
    if (!isEditLessonPlanClicked) {
      //handleResetStep1();
      router.replace({
        pathname: '/design/LearningObjective',
      });
    } else {
      handleEmptyTitle();

      addToast({
        message: 'The learning path title can\'t be empty!',
        type: 'error',
      });
    }
  };

  // EASY WAY: save always on DB when change page (change the route).
  // TODO: handle data saving in a better way. Maybe using an API to get the lessonPlan from DB, and checking if there are differences between data stored in localStorage and data stored on DB. Then handle an alert page if the User change page before saving, and if the user doesn't save retrieve the old data from DB.
  useEffect(() => {
    // console.log("USE EFFECT ROUTE!")
    const handleRouteChange = (url: string) => {
      // console.log("ROUTE CHANGE");
      // Check if we are leaving the LearningPathDesign page and if we are in edit mode
      if (
        router.pathname === '/design/learningPathDesign' &&
        url !== router.pathname &&
        (isEditLessonPlanClicked || editActivityLessonIndex !== null)
      ) {
        handleSaveLessonPlanClick();
        handleSave();
      }
    };

    // Trigger the event
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.pathname, isEditLessonPlanClicked, editActivityLessonIndex]);

  // useEffect(() => {
  //   if (titleLearningPath.trim().length > 0 && isSavingEmptyTitle) {
  //     setIsSavingEmptyTitle(!isSavingEmptyTitle);
  //   }
  // }, [titleLearningPath])

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
          w="100%"
          minH="100vh"
          bg="background"
          overflowX="auto"
          overflowY="hidden"
        >
          <Box
            // w="100%"
            w={isSmallerScreen ? '95%' : '80%'}
            h="100%"
          // overflowX="auto"
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
              paddingBottom="1.5rem"
              w="100%"
              justifyContent="left"
            //justify="space-between"
            >
              <LearningStepper
                activeStep={2}
                isSmallerScreen={isSmallerScreen}
              />
            </Box>

            <PreviousButton
              handlePreviousClick={handlePrevButtonClick}
              isSmallerScreen={isSmallerScreen}
              label_tooltip="Back to the learning objective step."
            />

            <Flex paddingTop="1rem" direction="column">
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
                    <Flex direction="column" gap={1}>
                      <LearningPathTitleTextBox
                        titleLearningPath={titleLearningPath}
                        handleTitleLearningPath={handleTitleLearningPath}
                        placeholder="Enter a title describing the lesson plan..."
                        isHighlighted={isSavingEmptyTitle && titleLearningPath.trim().length === 0}
                      />
                      {isSavingEmptyTitle && titleLearningPath.trim().length === 0 && (
                        <Text color="error_label" fontSize="small" fontWeight="normal">
                          Set a title for this learning path!
                        </Text>
                      )}
                    </Flex>
                  ) : (
                    titleLearningPath.trim().length > 0
                      ? <Text fontSize="xx-large">{titleLearningPath}</Text>
                      : <LabelEmptyFieldTable label="Title learning path" fontSize=" xx-large" />
                  ))}
              </Heading>
            </Flex>
            <Flex paddingTop="1rem" w="100%">
              {hydrated && (
                <LearningPathTabs
                  isSmallerScreen={isSmallerScreen}
                  handleSaveOnDB={handleSave}
                  handleEmptyTitle={handleEmptyTitle}
                />
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
          // handlePrevButtonClick={handlePrevButtonClick}
          />
        </Box>
      </Flex>
    </LearningPathProvider>
  );
};

export default Home;
