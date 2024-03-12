import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import Navbar from '../../components/NavBars/NavBarEncore';
import PathDesignCentralBars from '../../components/PathDesignCentralBars/';
import PathDesignGenLO from '../../components/PathDesignGenLO';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { SkillItemProps } from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';

const Home = (/*props: DiscoverPageProps*/) => {
  const {
    DIMENSION,
    SPACING,
    LANGUAGE_GEN_LO_API,
    TEMPERATURE_GEN_LO_API,
    bloomLevelIndex,
    //learningTextContext: text,
    step,
    collectionIndex,
    selectedSkillConceptsTags,
    handleStepChange,
    selectedOptions,
    //handleResetStep0,
    handleCollectionIndexChange,
    // takes the value of the selected option in "Educational Scenario"
    selectedContext, // used for the api call
    selectedLearnerExperience, // used for the api call
    selectedEducatorExperience, // used for the api call
    selectedGroupDimension, // used for the api call
    bloomLevels, // used for the api call
    learningTextContext, // used for the api call (learning context)
    selectedCustomLearningObjective,
    handleSelectedCustomLearningObjectiveChange,
    selectedLearningObjectiveIndex,
    handleSelectedLearningObjectiveIndexChange,
    handleResetAll,
    handleIdLearningScenario,
    apiKey,
    handleApiKey,
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
  const [isNextButtonClicked, setIsNextButtonClicked] =
    useState<boolean>(false); // Used to highlight the required fields when the user clicks on the next button or try to generate the learning objectives

  const [generatedLOs, setGeneratedLOs] = useState<string[]>([]); // Array to keep track of the generated learning objectives

  const handleCollectionSelection = () => {
    // Update the state to show the text when a collection is selected
    setSelectedCollection(true);
  };

  const handleCollectionChange = (collectionIndex: number) => {
    handleCollectionIndexChange(collectionIndex);
    handleStepChange(1); // Update the state to show the text when a collection is selected
  };

  const handlePrevButtonClick = () => {
    //handleResetStep0();
    router.push({
      pathname: '/design',
    });
  };

  const saveLearningScenario = async () => {
    if (
      selectedEducatorExperience?.title !== undefined &&
      selectedContext?.title !== undefined &&
      selectedGroupDimension?.title !== undefined &&
      selectedLearnerExperience?.title !== undefined &&
      bloomLevels[bloomLevelIndex]?.name !== undefined &&
      selectedOptions !== undefined &&
      selectedSkillConceptsTags !== undefined &&
      learningTextContext !== undefined &&
      generatedLOs[selectedLearningObjectiveIndex] !== undefined
    ) {
      try {
        // const api = new APIV2(undefined);
        // const resp = await api.saveLearningScenario(
        //   // objectiveId
        //   selectedEducatorExperience?.title,
        //   selectedContext?.title,
        //   selectedGroupDimension?.title,
        //   selectedLearnerExperience?.title,
        //   bloomLevels[bloomLevelIndex]?.name,
        //   selectedOptions, // verbsBloomLevel
        //   selectedSkillConceptsTags.map((item: SkillItemProps) => item.id),
        //   learningTextContext,
        //   //selectedCustomLearningObjective
        //   generatedLOs[selectedLearningObjectiveIndex]
        // );
        const resp = await axios.post('/api/encore/saveLearningScenario', {
          Context: {
            EducatorExperience: selectedEducatorExperience?.title,
            EducationContext: selectedContext?.title,
            Dimension: selectedGroupDimension?.title,
            LearnerExperience: selectedLearnerExperience?.title,
          },
          Objective: {
            //id: objectiveId,
            BloomLevel: {
              name: bloomLevels[bloomLevelIndex]?.name,
              verbs: selectedOptions,
            },
            Skills: selectedSkillConceptsTags.map(
              (item: SkillItemProps) => item.id
            ),
            LearningContext: learningTextContext,
            textLearningObjective: generatedLOs[selectedLearningObjectiveIndex],
          },
          Path: {
            Nodes: [],
            Edges: [],
          },
        });
        console.log(resp?.data);
        console.log('Learning scenario id: ' + resp?.data?._id);
        handleIdLearningScenario(resp?.data?._id ?? '');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNextClick = () => {
    if (
      selectedCollection !== null &&
      bloomLevelIndex !== null &&
      bloomLevelIndex > -1 &&
      selectedSkillConceptsTags.length > 0 &&
      learningTextContext?.trim() !== '' &&
      selectedOptions.length > 0 && // verbsBloomLevel
      selectedLearningObjectiveIndex > -1 &&
      generatedLOs.length > 0 // that means that the learning objectives have been generated and the Educator has selected one
    ) {
      handleSelectedCustomLearningObjectiveChange(
        generatedLOs[selectedLearningObjectiveIndex]
      );
      console.log(
        'selectedCustomLearningObjective: ' + selectedCustomLearningObjective
      );
      saveLearningScenario();
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

  return (
    <>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/design'} />
        <Navbar user={user} pageName="Design" />

        <Box
          //ml="200px"
          py="115px"
          pl={isSmallerScreen ? '90px' : '240px'}
          w="full"
          h={step >= 2 ? 'full' : '100vh'}
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

            <Box
              paddingTop="1.5rem"
              w="100%"
              justifyContent="left"
              //justify="space-between"
            >
              <Box w={isSmallerScreen ? '95%' : '90%'}>
                <LearningStepper
                  activeStep={1}
                  isSmallerScreen={isSmallerScreen}
                />
              </Box>
              <Box w="100% " paddingTop="1.5rem">
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

            <Flex w="100%" paddingTop="1.5rem">
              <Text fontSize="sm">
                Select here the collection that contain potential relevant
                resources
              </Text>
            </Flex>
            <Box w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}>
              <CustomDropDownMenu
                data={collections}
                onData={handleCollectionSelection}
                onSelectionChange={handleCollectionChange}
                isHighlighted={isNextButtonClicked}
                isBloomLevel={false}
              />
            </Box>

            {step >= 1 && (
              <Flex direction="column" w={isSmallerScreen ? '95%' : '90%'}>
                <Flex paddingTop="1.5rem" w="90%">
                  <Text>
                    To define a learning path effectively, it is crucial to
                    choose the desired level within the Bloom taxonomy and
                    provide indications of the skills, concepts, and contextual
                    information that need to be achieved.
                  </Text>
                </Flex>
                <Box>
                  <PathDesignCentralBars
                    collectionIndex={collectionIndex}
                    isNextButtonClicked={isNextButtonClicked}
                    isSmallerScreen={isSmallerScreen}
                    bloomLevelTitleTextBox="Select the Bloom level for the learning objective"
                    skillConceptTitleTextBox="Add here the skill or the concepts to be covered"
                    skillConceptDescriptionTextBox="The selection of skills and concepts here is informed by the
                    collection of Open Educational Resources (OERs)"
                    contextTitleTextBox="Add here the context"
                    contextDescriptionTextBox="Here the contextual information that will assist in delineating the
                    specific context of the educational activity"
                    placeholderContextBox="Add any relevant information you want to specify in the learning objective(s)..."
                    verbsTitleTextBox="Select the verbs related to your learning objective"
                    bloomLevelDescriptionTextBox="This level indicates the cognitive complexity or depth of
                    understanding associated with a particular learning objective"
                  />
                </Box>
                <PathDesignGenLO
                  LANGUAGE_GEN_LO_API={LANGUAGE_GEN_LO_API}
                  TEMPERATURE_GEN_LO_API={TEMPERATURE_GEN_LO_API}
                  bloomLevelIndex={bloomLevelIndex}
                  selectedContext={selectedContext}
                  selectedSkillConceptsTags={selectedSkillConceptsTags}
                  selectedOptions={selectedOptions}
                  selectedGroupDimension={selectedGroupDimension}
                  selectedLearnerExperience={selectedLearnerExperience}
                  selectedEducatorExperience={selectedEducatorExperience}
                  learningTextContext={learningTextContext}
                  generatedLOs={generatedLOs}
                  setGeneratedLOs={setGeneratedLOs}
                  handleSelectedLearningObjectiveIndexChange={
                    handleSelectedLearningObjectiveIndexChange
                  }
                  setIsNextButtonClicked={setIsNextButtonClicked}
                  isHighligted={isNextButtonClicked}
                  apiKey={apiKey}
                  handleApiKey={handleApiKey}
                />
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
    </>
  );
};

export default Home;
