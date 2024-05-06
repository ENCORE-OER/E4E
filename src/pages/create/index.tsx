import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import SharedParameterTab from '../../components/Tabs/TabsCreatePage/SharedParameterTab';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import AnalyzerTabCreateOer from '../../components/Tabs/TabsCreatePage/AnalyzerTabCreateOer';
// import { stringArrayToOptionsObject } from '../../utils/utils';

const Create = () => {
  const { user } = useUser();
  const router = useRouter();
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  const {
    //isGenerateButtonClicked,
    apiGeneratedExerciseData,
    // handleOptionsChange,
    // typeOfExercisePanel,
    // apiGeneratedExerciseData,
  } = useCreateOERsContext();
  const { addToast } = CustomToast();
  const [step, setStep] = useState<number>(0);
  const handleStep = (step: number) => {
    setStep(step);
  };

  return (
    <>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/create'} />
        <Navbar user={user} pageName="Create" />

        <Box
          py="115px"
          pl={isSmallerScreen ? '90px' : '240px'}
          w="full"
          minH="100vh"
          bg="background"
        >
          <Box w="100%" h="100%">
            <Flex w="100%" justifyContent="left">
              <Heading>Create a new OER with Generative AI</Heading>
            </Flex>

            <Box w="100%" justifyContent="left">
              <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                <Text>
                  This section provides guidance on creating Open Educational
                  Resources (OER) supported by generative AI. <br />
                  Be aware that content produced by generative AI needs to be
                  evaluated in the same way as content gathered from other
                  information resources. Currently the system allows to generate
                  assessment content from starting resources.
                </Text>
              </Box>
              <AnalyzerTabCreateOer
                isSmallerScreen={isSmallerScreen}
                onChange={handleStep}
                step={step}
              />
              {(apiGeneratedExerciseData.Assignment !== '' || step > 1) && ( //todo finde a better way to check if the exercise is generated
                <Box paddingTop={'2rem'}>
                  <SharedParameterTab isSmallerScreen={isSmallerScreen} />{' '}
                  {/* in this there are also the different tabs for the exercises and the api call for the generation of the exercises*/}
                </Box>
              )}
              {(apiGeneratedExerciseData.Assignment !== '' || step > 1) && (
                <Box w={isSmallerScreen ? '95%' : '90%'}>
                  <Flex w="auto" justifyContent="right">
                    <Button
                      border="1px solid"
                      borderRadius="lg"
                      size="lg"
                      type="submit"
                      colorScheme="yellow"
                      mt={4}
                      w="10%"
                      onClick={() => {
                        // if (typeOfExercisePanel === 'Fill the Gaps') {
                        //   handleOptionsChange(
                        //     stringArrayToOptionsObject(apiGeneratedExerciseData)
                        //   );
                        // }else if(typeOfExercisePanel === 'multipleChoice'){
                        //   // handleOptionsChange(
                        //   //   stringArrayToOptionsObject(apiGeneratedExerciseData)
                        //   // );
                        // }
                        if (apiGeneratedExerciseData.Assignment !== '') {
                          // todo: implement a better check
                          router.push({
                            pathname: '/create/edit',
                          });
                        } else {
                          addToast({
                            message:
                              'Please generate an exercise before proceeding',
                            type: 'warning',
                          });
                        }
                      }}
                    >
                      <Text as="b">Edit</Text>
                    </Button>
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Create;
