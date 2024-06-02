import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGeneralContext } from '../../Contexts/GeneralContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import InputsGenerateAI from '../../components/Inputs/InputsGenAISetup/InputsGenerateAI';
import Navbar from '../../components/NavBars/NavBarEncore';
import SegmentedButtonGroup from '../../components/SegmentedButtonGroup/SegmentedButtonGroup';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import InfoAPISetupTextBox from '../../components/TextBox/InfoAPISetupTextBox';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated, useIsSmallerScreen } from '../../utils/utils';

const Home = () => {
  const router = useRouter();
  const { user } = useUser();
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);
  const { addToast } = CustomToast();
  const hydrated = useHasHydrated();
  const isSmallerScreen = useIsSmallerScreen(); // Use this for the responsive design of the page
  const {
    SPACING,
    // handleEducatorExperienceChange,
    // handleLearnerExperienceChange,
    // handleGroupDimensionChange,
    // handleContextChange,
    // handleCollectionIndexChange,
    resetAll,
    handleResetAll,
  } = useLearningPathDesignContext();

  const { apiKey, setupModel, handleApiKey, handleSetupModel } =
    useGeneralContext();

  // ==================================================================

  const handleOptionsComplete = (areComplete: boolean) => {
    setAreOptionsComplete(areComplete);
  };

  const handleNextClick = () => {
    if (areOptionsComplete) {
      router.push({
        pathname: '/design/learningObjective',
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

  // We put this in the ReserButton component
  // const handleResetClick = () => {
  //   console.log('Reset clicked');

  //   handleEducatorExperienceChange(null);
  //   handleLearnerExperienceChange(null);
  //   handleGroupDimensionChange(null);
  //   handleContextChange(null);
  //   handleCollectionIndexChange(-1);
  //   setResetAll(true);

  // }

  // useEffect(() => {
  //   //console.log('cambiato qualcosa');
  // }, [areOptionsComplete]);

  return (
    <Flex w="100%" h="100%">
      <SideBar pagePath={router.pathname} />
      <Navbar user={user} pageName="Design" />

      <Box
        py="115px"
        pl={isSmallerScreen ? '90px' : '240px'}
        w="100%"
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
            <Flex
              // w={isSmallerScreen ? '95%' : '90%'}
              w="100%"
            >
              <LearningStepper
                activeStep={0}
                isSmallerScreen={isSmallerScreen}
              />
            </Flex>

            <Flex w="100%" paddingTop="1.5rem" direction={'column'}>
              <Text fontWeight="bold" fontSize="lg" pb={1}>
                API Setup
              </Text>
              <Flex direction={'row'} flexWrap={'wrap'}>
                <InputsGenerateAI
                  apiKey={apiKey}
                  handleApiKey={handleApiKey}
                  setupModel={setupModel}
                  handleSetupModel={handleSetupModel}
                />
                <InfoAPISetupTextBox />
              </Flex>
            </Flex>

            <Box
              //  w={isSmallerScreen ? '95%' : '90%'}
              w="100%"
              paddingTop="1rem"
            >
              <Text>
                This part will guide you in creating a tailored learning path to
                meet your specific educational goals. Start by detailing the
                educational context or setting in which you plan to carry out
                your activities.
              </Text>
            </Box>
            <Box
              w="100%"
              // w={isSmallerScreen ? '95%' : '90%'}
              paddingTop="1.5rem"
            >
              {hydrated && (
                <SegmentedButtonGroup
                  onOptionsChange={handleOptionsComplete}
                  isNextButtonClicked={isNextButtonClicked}
                  isSmallerScreen={isSmallerScreen}
                  resetAll={resetAll}
                  handleResetAll={handleResetAll}
                />
              )}
            </Box>

            <FooterButtonsGroup
              SPACING={SPACING}
              handleResetAll={handleResetAll}
              handleNextClick={handleNextClick}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
