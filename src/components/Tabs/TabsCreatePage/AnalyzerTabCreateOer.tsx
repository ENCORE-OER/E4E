/*
 *  This file contain the part of the create oer page that insert:
 *  the source,
 *  the apy key
 *  the setup model
 *  the analyzer button and api call
 */
import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../../Contexts/GeneralContext';
import { TopicData, targetLevelOptions } from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import CreateOerTopicMenu from '../../DropDownMenuItem/CreateOerTopicMenu';
import InputGenAISetup from '../../Inputs/InputsGenAISetup';
import TextBox from '../../TextBox/TextBox';

type AnalyzerTabCreateOerProps = {
  isSmallerScreen?: boolean;
  step: number;
  onChange: (step: number) => void;
};

export default function AnalyzerTabCreateOer({
  isSmallerScreen,
  step,
  onChange,
}: AnalyzerTabCreateOerProps) {
  const {
    handleDescription,
    handleTitle,
    handleAssignmentType,
    handleTargetLevel,
    handleChosenTopic,
    handleMacroSubject,
    sourceText,
    handleSourceText,
    apiGeneratedExerciseData,
  } = useCreateOERsContext();
  const { apiKey, handleApiKey, setupModel, handleSetupModel } =
    useGeneralContext();
  const [topicData, setTopicData] = useState<TopicData>();
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { addToast } = CustomToast();

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

  const handleAnalyze = async () => {
    setLoading(true);
    const analyzedMaterial = await analyzeMaterial(sourceText);
    setLoading(false);
    setTopicData(analyzedMaterial);
    console.log('topic data:', topicData);
    if (analyzedMaterial) {
      handleTitle(analyzedMaterial?.Title);
      handleMacroSubject(analyzedMaterial?.MacroSubject);
    }
    if (analyzedMaterial) onChange(1);
    // if(topicData){
    //   console.log('topic data:', topicData);
    //   if(topicData?.Title) handleTitle(topicData?.Title);

    //   if(topicData?.MacroSubject) handleMacroSubject(topicData?.MacroSubject);
    // }
  };

  const handleTopicSelect = (index: number) => {
    setSelectedTopicIndex(index);
    if (topicData) {
      handleDescription(topicData.MainTopics[index].Description);
      handleAssignmentType(topicData.MainTopics[index].Type);
      handleTargetLevel(targetLevelOptions[topicData.PerceivedDifficulty]);
      handleChosenTopic(topicData.MainTopics[index].Topic);
    }
    onChange(2);
  };

  useEffect(() => {
    //console.log('Selected topic index:', selectedTopicIndex);
    //console.log('Selected topic title:', selectedTopicTitle);
  }, [selectedTopicIndex]);

  return (
    <>
      <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
        <InputGenAISetup
          apiKey={apiKey}
          handleApiKey={handleApiKey}
          setupModel={setupModel}
          handleSetupModel={handleSetupModel}
          // isSmallerScreen={isSmallerScreen}
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
          justifyContent={
            apiGeneratedExerciseData.Assignment !== '' || step > 0
              ? 'space-between'
              : 'flex-end'
          }
          alignItems="center"
        >
          {(apiGeneratedExerciseData.Assignment !== '' || step > 0) && (
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
                  handleAnalyze();
                }
              }}
            >
              Analyze Material
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
