import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../Contexts/GeneralContext';
import CreateOerTopicMenu from '../../components/DropDownMenuItem/CreateOerTopicMenu';

import { useEffect, useState } from 'react';
import InputsGenerateAI from '../../components/Inputs/InputsGenerateAI';
import Navbar from '../../components/NavBars/NavBarEncore';
import SideBar from '../../components/SideBar/SideBar';
import SharedParameterTab from '../../components/Tabs/TabsCreatePage/SharedParameterTab';
//import TabsCreateMenu from '../../components/Tabs/TabsCreatePage/TabsCreateMenu';
import TextBox from '../../components/TextBox/TextBox';
import { TopicData } from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { stringArrayToOptionsObject } from '../../utils/utils';

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
    sourceText,
    handleSourceText,
    isGenerateButtonClicked,
    handleOptionsChange,
    typeOfExercisePanel,
    apiGeneratedExerciseData: apiFillGapsData,
    handleDescription,
    handleTitle,
    handleAssignmentType,
    handleTargetLevel,
    handleChosenTopic,
  } = useCreateOERsContext();
  const { apiKey, handleApiKey, setupModel, handleSetupModel } =
    useGeneralContext();

  const { addToast } = CustomToast();

  const [topicData, setTopicData] = useState<TopicData>();
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  //const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>();

  const analyzeMaterial = async (material: string) => {
    console.log('Analyzing material: ');

    try {
      const resp = await axios.post(
        'api/encore/genAI/materialAnalyzer',
        {
          material: material,
        },
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      return resp.data;
    } catch (error) {
      console.error('Error during the API call:', error);
    }
  };

  const handleAnalize = async () => {
    setLoading(true);
    const analyzedMaterial = await analyzeMaterial(sourceText);
    setLoading(false);
    setTopicData(analyzedMaterial);
    handleTitle(analyzedMaterial.Title);
    console.log('topic data:', topicData);
    if (analyzedMaterial) setStep(1);
  };

  const handleTopicSelect = (index: number) => {
    setSelectedTopicIndex(index);
    if (topicData) {
      handleDescription(topicData.MainTopics[index].Description);
      handleAssignmentType(topicData.MainTopics[index].Type);
      handleTargetLevel(topicData.PerceivedDifficulty);
      handleChosenTopic(topicData.MainTopics[index].Topic);
    }
    setStep(2);
  };

  useEffect(() => {
    //console.log('Selected topic index:', selectedTopicIndex);
    //console.log('Selected topic title:', selectedTopicTitle);
  }, [selectedTopicIndex]);

  return (
    <>
      <Flex w="100%" h="100%">
        <SideBar pagePath={'/create'} />
        <Navbar user={user} pageName="Create" />

        <Box
          //ml="200px"
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
              <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                <InputsGenerateAI
                  apiKey={apiKey}
                  handleApiKey={handleApiKey}
                  setupModel={setupModel}
                  handleSetupModel={handleSetupModel}
                  isSmallerScreen={isSmallerScreen}
                />
                <Text as="b" pb="0.5rem">
                  Educational resource input (text or URL)
                </Text>
                <TextBox
                  placeholder="Add text or URL"
                  text={sourceText}
                  rows={5}
                  onTextChange={handleSourceText}
                />
              </Box>
              <Box w={isSmallerScreen ? '95%' : '90%'}>
                <Flex
                  w="auto"
                  justifyContent={step > 0 ? 'space-between' : 'flex-end'}
                  alignItems="center"
                >
                  {step > 0 && (
                    <Box>
                      <Flex paddingBottom="0.25rem" paddingTop="0.5rem">
                        <Text as="b">
                          Choose a starting topic from the generated ones
                        </Text>
                      </Flex>
                      <CreateOerTopicMenu
                        data={topicData}
                        title="Topics"
                        onTopicSelect={handleTopicSelect}
                      />
                    </Box>
                  )}
                  <Flex alignItems="center">
                    {loading && (
                      <Box mr={4} mt={4}>
                        <CircularProgress isIndeterminate color="yellow.400" />
                      </Box>
                    )}
                    <Button
                      border="1px solid"
                      borderRadius="lg"
                      size="lg"
                      type="submit"
                      colorScheme="yellow"
                      mt={4}
                      w="auto"
                      onClick={() => {
                        if (!sourceText) {
                          addToast({
                            message: 'Please provide a text or URL',
                            type: 'warning',
                          });
                        } else {
                          handleAnalize();
                        }
                      }}
                    >
                      Analize Material
                    </Button>
                  </Flex>
                </Flex>
              </Box>

              {step > 1 && (
                <Box paddingTop={'2rem'}>
                  {/*  <Flex paddingTop={'1rem'}>
                    <Text fontSize='2xl'> Parameter shared between exercises </Text>
                  </Flex> */}
                  <SharedParameterTab isSmallerScreen={isSmallerScreen} />
                </Box>
              )}
              {/* {step > 1 && (
                <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
                  <TabsCreateMenu isSmallerScreen={isSmallerScreen} />
                </Box>
              )} */}
              {step > 1 && (
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
                        if (typeOfExercisePanel === 'Fill the Gaps') {
                          handleOptionsChange(
                            stringArrayToOptionsObject(apiFillGapsData)
                          );
                        }
                        if (isGenerateButtonClicked) {
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
