// import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import AnalyzerTabCreateOer from '../../components/Tabs/TabsCreatePage/AnalyzerTabCreateOer';
import SharedParameterTab from '../../components/Tabs/TabsCreatePage/SharedParameterTab';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useIsSmallerScreen } from '../../utils/utils';
// import { stringArrayToOptionsObject } from '../../utils/utils';

export interface CreateProps {
  isAddContentModal?: boolean; // Used for the AddContentModal
  isEditClicked?: boolean;
  setIsEditClicked: Dispatch<SetStateAction<boolean>>;
}

const Create = ({
  isAddContentModal,
  isEditClicked,
  setIsEditClicked,
}: CreateProps) => {
  // const { user } = useUser();
  const router = useRouter();
  const isSmallerScreen = useIsSmallerScreen(); // Use this for the responsive design of the page
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

  const handleEditClick = () => {
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

      !isAddContentModal
        ? router.push({
            pathname: '/create/edit',
          })
        : isEditClicked !== undefined && !isEditClicked
          ? setIsEditClicked(!isEditClicked)
          : undefined;
    } else {
      addToast({
        message: 'Please generate an exercise before proceeding',
        type: 'warning',
      });
    }
  };

  return (
    <Flex w="100%" h="100%">
      {!isAddContentModal && <SideBar pagePath={'/create'} />}
      {!isAddContentModal && (
        <Navbar
          // user={user}
          pageName="Create"
        />
      )}

      <Box
        py={!isAddContentModal ? '115px' : '1rem'}
        pl={isSmallerScreen || isAddContentModal ? '90px' : '240px'}
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
              isAddContentModal={isAddContentModal}
            />
            {(apiGeneratedExerciseData.Assignment !== '' || step > 1) && ( //todo find a better way to check if the exercise is generated
              <Box paddingTop={'2rem'}>
                <SharedParameterTab
                  isSmallerScreen={isSmallerScreen}
                  isAddContentModal={isAddContentModal}
                />{' '}
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
                    onClick={handleEditClick}
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
  );
};

export default Create;
