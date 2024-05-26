import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import PathDesignCentralBars from '../../components/Views/PathDesignViews/PathDesignCentralBars';
import PathDesignGenLO from '../../components/Views/PathDesignViews/PathDesignGenLO';
import PathDesignGenLessonPlan from '../../components/Views/PathDesignViews/PathDesignGenLessonPlan';
import PathDesignHeaderBars from '../../components/Views/PathDesignViews/PathDesignHeaderBars';
import { CustomToast } from '../../utils/Toast/CustomToast';

const Home = (/*props: DiscoverPageProps*/) => {
  const {
    DIMENSION,
    SPACING,
    // LANGUAGE_GEN_LO_API,
    // TEMPERATURE_GEN_LO_API,
    bloomLevelIndex,
    //learningTextContext: text,
    step,
    collectionIndex,
    resourcesIndex,
    selectedSkillConceptsTags,
    handleStepChange,
    selectedOptions,
    //handleResetStep0,
    handleCollectionIndexChange,
    setResourcesIndex,
    // handleResourceIndexChange,
    // takes the value of the selected option in "Educational Scenario"
    selectedContext, // used for the api call
    // selectedLearnerExperience, // used for the api call
    // selectedEducatorExperience, // used for the api call
    // selectedGroupDimension, // used for the api call
    bloomLevels, // used for the api call
    learningTextContext, // used for the api call (learning context)
    selectedCustomLearningObjective,
    // handleSelectedCustomLearningObjectiveChange,
    // selectedLearningObjectiveIndex,
    // handleSelectedLearningObjectiveIndexChange,
    handleResetAll,
    // handleIdLearningScenario,
    // ----- Learning Objective Objects -----
    learningObjectiveObjects,
    setLearningObjectiveObjects,
    numberOfLO,
    setNumberOfLO
  } = useLearningPathDesignContext();
  const { collections } = useCollectionsContext();
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { addToast } = CustomToast();

  // ==================================================================

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // ==================================================================

  const [selectedCollection, setSelectedCollection] = useState<boolean | null>(
    null
  );
  const [selectedResource, setSelectedResource] = useState<boolean | null>(
    null
  );
  // const [resourceIndex, setResourceIndex] = useState<number>(-1); // Used to keep track of the selected resource in the collection
  const [isNextButtonClicked, setIsNextButtonClicked] =
    useState<boolean>(false); // Used to highlight the required fields when the user clicks on the next button or try to generate the learning objectives

  // const [totalLearningObjectives, setTotalLearningObjectives] = useState<string[]>([]); // Array to keep track of the all learning objectives (generated + empty)
  // const [learningObjectiveObjects, setLearningObjectiveObjects] = useState<ObjectLearningObjectiveProps[]>([]);   // Array of {learningObject, isSelected, isGenerated}, to keep track if an added empty LO was selected before click on "Generate LO" button

  const handleCollectionSelection = () => {
    // Update the state to show the text when a collection is selected
    setSelectedCollection(true);
  };

  const handleCollectionChange = (newCollectionIndex: number) => {
    if (collectionIndex !== newCollectionIndex) {
      handleCollectionIndexChange(newCollectionIndex);
      setResourcesIndex([]);
    }
    // Change to step 1 only if a collection is selected
    if (newCollectionIndex > -1) {
      handleStepChange(1); // Update the state to show the text when a collection is selected
    }
  };

  const handleResourceSelection = () => {
    // Update the state to show the text when a collection is selected
    if (resourcesIndex.length > 0 && selectedResource === null) {
      setSelectedResource(true);
    } else if (resourcesIndex.length === 0 && selectedResource === true) {
      setSelectedResource(null);
    }
  };

  // Create this function in the LearningPathDesignContext??? This is also needed in LearningPath page???
  const handleResourceChange = (newResourceIndex: number) => {
    if (newResourceIndex > -1) {
      if (resourcesIndex.includes(newResourceIndex)) {
        const updatedResourcesIndex = resourcesIndex.filter(
          (index: number) => index !== newResourceIndex
        );
        setResourcesIndex(updatedResourcesIndex);
      } else {
        setResourcesIndex((prevIndex: number[]) => [
          ...prevIndex,
          newResourceIndex,
        ]);
      }
    } else {
      setResourcesIndex([]);
    }
  };

  const handlePrevButtonClick = () => {
    //handleResetStep0();
    router.push({
      pathname: '/design',
    });
  };

  // const saveLearningScenario = async () => {
  //   if (
  //     selectedEducatorExperience?.title !== undefined &&
  //     selectedContext?.title !== undefined &&
  //     selectedGroupDimension?.title !== undefined &&
  //     selectedLearnerExperience?.title !== undefined &&
  //     bloomLevels[bloomLevelIndex]?.name !== undefined &&
  //     selectedOptions !== undefined &&
  //     selectedSkillConceptsTags !== undefined &&
  //     learningTextContext !== undefined &&
  //     learningObjectiveObjects[selectedLearningObjectiveIndex] !== undefined
  //   ) {
  //     try {
  //       // const api = new APIV2(undefined);
  //       // const resp = await api.saveLearningScenario(
  //       //   // objectiveId
  //       //   selectedEducatorExperience?.title,
  //       //   selectedContext?.title,
  //       //   selectedGroupDimension?.title,
  //       //   selectedLearnerExperience?.title,
  //       //   bloomLevels[bloomLevelIndex]?.name,
  //       //   selectedOptions, // verbsBloomLevel
  //       //   selectedSkillConceptsTags.map((item: SkillItemProps) => item.id),
  //       //   learningTextContext,
  //       //   //selectedCustomLearningObjective
  //       //   generatedLOs[selectedLearningObjectiveIndex]
  //       // );
  //       const resp = await axios.post('/api/encore/saveLearningScenario', {
  //         Context: {
  //           EducatorExperience: selectedEducatorExperience?.title,
  //           EducationContext: selectedContext?.title,
  //           Dimension: selectedGroupDimension?.title,
  //           LearnerExperience: selectedLearnerExperience?.title,
  //         },
  //         Objective: {
  //           //id: objectiveId,
  //           BloomLevel: {
  //             name: bloomLevels[bloomLevelIndex]?.name,
  //             verbs: selectedOptions,
  //           },
  //           Skills: selectedSkillConceptsTags.map(
  //             (item: SkillItemProps) => item.id
  //           ),
  //           LearningContext: learningTextContext,
  //           textLearningObjective:
  //             learningObjectiveObjects[selectedLearningObjectiveIndex]
  //               .learningObjective,
  //         },
  //         Path: {
  //           Nodes: [],
  //           Edges: [],
  //         },
  //       });
  //       console.log(resp?.data);
  //       console.log('Learning scenario id: ' + resp?.data?._id);
  //       handleIdLearningScenario(resp?.data?._id ?? '');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleNextClick = () => {
    if (
      selectedCollection !== null &&
      // selectedResource !== null &&
      bloomLevelIndex !== null &&
      bloomLevelIndex > -1 &&
      selectedSkillConceptsTags.length > 0 &&
      learningTextContext?.trim() !== '' &&
      selectedOptions.length > 0 && // verbsBloomLevel
      // selectedLearningObjectiveIndex > -1 &&
      learningObjectiveObjects.length > 0 // that means that the learning objectives have been generated and the Educator has selected one
    ) {
      // handleSelectedCustomLearningObjectiveChange(
      //   learningObjectiveObjects[selectedLearningObjectiveIndex]
      //     .learningObjective
      // );
      console.log(
        'selectedCustomLearningObjective: ' + selectedCustomLearningObjective
      );
      //saveLearningScenario();
      router.push({
        pathname: '/design/learningPathDesign',
      });
    } else {
      addToast({
        message:
          'Please ensure all required fields are filled out before proceeding.',
        type: 'warning',
      });
      setIsNextButtonClicked(true);
    }
  };

  useEffect(() => {
    handleCollectionSelection();
  }, [collectionIndex]);

  useEffect(() => {
    handleResourceSelection();
  }, [resourcesIndex]);

  useEffect(() => {
    console.log('Selected Collection: ', selectedCollection);
    console.log('Selected Resource: ', selectedResource);
  }, [selectedCollection, selectedResource]);

  return (
    <Flex w="100%" h="100%">
      <SideBar pagePath={'/design'} />
      <Navbar user={user} pageName="Design" />

      <Box
        py="115px"
        pl={isSmallerScreen ? '90px' : '240px'}
        w="100%"
        minH={step >= 2 ? 'full' : '100vh'}
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
            <Box
              //  w={isSmallerScreen ? '95%' : '90%'}
              w="100%"
            >
              <LearningStepper
                activeStep={1}
                isSmallerScreen={isSmallerScreen}
              />
            </Box>
            <Box
              //  w={isSmallerScreen ? '95%' : '90%'}
              w="100%"
              paddingTop="2rem"
            >
              <Text>
                This section is designed to assist you in crafting a
                personalized learning journey to achieve specific learning
                objectives.
                <br />
                It does so by seamlessly integrating various activities and
                learning resources focused on your chosen topics.
              </Text>
            </Box>
          </Box>

          {/* This component contains the collections and resources DropDownMenus */}
          <PathDesignHeaderBars
            SPACING={SPACING}
            DIMENSION={DIMENSION}
            isSmallerScreen={isSmallerScreen}
            collections={collections}
            handleCollectionSelection={handleCollectionSelection}
            handleCollectionChange={handleCollectionChange}
            resources={collections[collectionIndex]?.oers} // Create an array of resources names???
            handleResourceSelection={handleResourceSelection}
            handleResourceChange={handleResourceChange}
            isNextButtonClicked={isNextButtonClicked}
          />

          {step >= 1 && (
            <Flex direction="column">
              {/*  This component contains the SkillsSearchBar, the BloomLevel DropDownMenu, The VerbsBloomLevel Checkbox and the LearningContext TextBox */}
              <PathDesignCentralBars
                collectionIndex={collectionIndex}
                resourcesIndex={resourcesIndex}
                bloomLevelIndex={bloomLevelIndex}
                isNextButtonClicked={isNextButtonClicked}
                isSmallerScreen={isSmallerScreen}
                bloomLevelTitleTextBox="Select the Bloom level for the learning objective*"
                skillConceptTitleTextBox="Add here the skills or the concepts to be covered*"
                contextTitleTextBox="Specify the context"
                placeholderContextBox="Add any relevant information you want to specify in the learning objective(s)..."
                verbsTitleTextBox="Select the verbs related to your learning objective*"
              />
              <PathDesignGenLO
                // LANGUAGE_GEN_LO_API={LANGUAGE_GEN_LO_API}
                // TEMPERATURE_GEN_LO_API={TEMPERATURE_GEN_LO_API}
                bloomLevelIndex={bloomLevelIndex}
                selectedBloomLevel={bloomLevels[bloomLevelIndex]?.name || ''}
                selectedContext={selectedContext}
                selectedSkillConceptsTags={selectedSkillConceptsTags}
                selectedOptions={selectedOptions}
                // selectedGroupDimension={selectedGroupDimension}
                // selectedLearnerExperience={selectedLearnerExperience}
                // selectedEducatorExperience={selectedEducatorExperience}
                learningTextContext={learningTextContext}
                // totalLearningObjectives={totalLearningObjectives}
                // setTotalLearningObjectives={setTotalLearningObjectives}
                learningObjectiveObjects={learningObjectiveObjects}
                setLearningObjectiveObjects={setLearningObjectiveObjects}
                // handleSelectedLearningObjectiveIndexChange={
                //   handleSelectedLearningObjectiveIndexChange
                // }
                setIsNextButtonClicked={setIsNextButtonClicked}
                isHighligted={isNextButtonClicked}
                isSmallerScreen={isSmallerScreen}
                // apiKey={apiKey}
                // handleApiKey={handleApiKey}
                numberOfLO={numberOfLO}
                setNumberOfLO={setNumberOfLO}
              />

              <PathDesignGenLessonPlan />
            </Flex>
          )}
          <FooterButtonsGroup
            SPACING={SPACING}
            handleResetAll={handleResetAll}
            handleNextClick={handleNextClick}
            handlePrevButtonClick={handlePrevButtonClick}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
