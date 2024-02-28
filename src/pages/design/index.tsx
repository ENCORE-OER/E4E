import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import FooterButtonsGroup from '../../components/Buttons/ButtonsDesignPage/FooterButtonsGroup';
import Navbar from '../../components/NavBars/NavBarEncore';
import SegmentedButtonGroup from '../../components/SegmentedButtonGroup/SegmentedButtonGroup';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';

const Home = () => {
  const router = useRouter();
  const { user } = useUser();
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);
  const { addToast } = CustomToast();
  const hydrated = useHasHydrated();
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

  // ==================================================================

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // ==================================================================

  const handleOptionsComplete = (areComplete: boolean) => {
    setAreOptionsComplete(areComplete);
  };

  const handleNextClick = () => {
    if (areOptionsComplete) {
      router.push({
        pathname: '/design/LearningObjective',
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
        w="full"
        minH="100vh"
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
                activeStep={0}
                isSmallerScreen={isSmallerScreen}
              />
            </Box>

            <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
              <Text>
                This part will guide you in creating a tailored learning path to
                meet your specific educational goals. Start by detailing the
                educational context or setting in which you plan to carry out
                your activities.
              </Text>
            </Box>
            <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
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
