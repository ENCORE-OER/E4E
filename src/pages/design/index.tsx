import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { CustomToast } from '../../utils/Toast/CustomToast';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { IconPathEdit } from '../../public/Icons/svgToIcons/iconPatheEdit';
import SegmentedButtonGroup from '../../components/SegmentedButtonGroup/SegmentedButtonGroup';

const Home = () => {
  const router = useRouter();
  const { user } = useUser();
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();

  const handleOptionsChange = (areComplete: boolean) => {
    setAreOptionsComplete(areComplete);
  };

  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [areOptionsComplete]);

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar pagePath={router.pathname} />

      <Box
        ml="200px"
        py="115px"
        pl="40px"
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
            <Box w="80% ">
              <LearningStepper activeStep={0} />
            </Box>

            <Box w="80%" paddingTop="2rem">
              <Text>
                This part will guide you in creating a tailored learning path to
                meet your specific educational goals. Start by detailing the
                educational context or setting in which you plan to carry out
                your activities.
              </Text>
            </Box>
            <Box w="80%" paddingTop="2rem">
              <SegmentedButtonGroup onOptionsChange={handleOptionsChange} />
            </Box>

            <Box w="5%" paddingRight="10%">
              <Button
                leftIcon={<IconPathEdit />}
                border={'1px solid'}
                colorScheme="yellow"
                position={'absolute'}
                bottom="5%"
                right="10%"
                onClick={() => {
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
                  }
                }}
                //isDisabled={!areOptionsComplete}
              >
                <Text fontWeight="bold" fontSize="lg">
                  Next
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;