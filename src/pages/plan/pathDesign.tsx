import React from 'react';
import { Box, Flex, Heading, Text, Card, CardBody, Button } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import LearningStepper from '../../components/Stepper/Stepper';
import { useHasHydrated } from '../../utils/utils';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

const PathDesignPage = () => {
  const { user } = useUser();
  const hydrated = useHasHydrated();
  const router = useRouter();
  const {
    SPACING,
    pathDesignData,
    handleResetStep1,
  } = useLearningPathDesignContext();

  const handlePrevButtonClick = () => {
    handleResetStep1();
    router.push({
      pathname: '/plan/LearningObjective',
    });
  };


  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Plan" />
      <SideBar  pagePath={"/plan"}  />
      <Box ml="200px" py="115px" pl="40px" w="full" h="100vh" bg="background">
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
                objective and a suggested learning path. You have the flexibility
                to modify and customize both the description of the learning
                objective and the types and sequence of the proposed activities
              </Text>
            </Box>
          </Box>
          <Box paddingTop="0.5rem" w="80%" >
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
                  {hydrated && pathDesignData.skills&& (
                    pathDesignData.skills.join(', ')
                  )}
                  {'. '}
                  {hydrated && pathDesignData.verbsLearingObjective && (
                    pathDesignData.verbsLearingObjective.join(' and ')
                  )}
                  {' '}
                  {hydrated && pathDesignData.textLearingObjective }
                </Text>
              </CardBody>
            </Card>
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
      </Box>
    </Flex>
  );
};

export default PathDesignPage;
