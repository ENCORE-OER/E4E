/*
 *   Common parameter bteween all types of Exercises
 *
 *   Editable topic
 *
 *   Editable Learning Objective
 *
 *   Type of Assigment
 *       Theoretical
 *       Coding
 *       Practical
 *
 *   Creativity of AI
 *       Low
 *       Medium
 *       High
 *
 *   Bloom level
 *       Remember
 *       Understand
 *       Apply
 *       Analyze
 *       Evaluate
 *       Create
 *
 *   Target Level
 *       Primary
 *       Middle school
 *       High school
 *       College
 *       Accademy
 *
 * */

import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import {
  BloomLevelString,
  assignmentTypeOptions,
  bloomLevelOptions,
  targetLevelOptions,
  temperatureOptions,
} from '../../../types/encoreElements';
import SegmentedButton from '../../Buttons/ButtonsDesignPage/SegmentedButton';
import TextBox from '../../TextBox/TextBox';
import TabsCreateMenu from './TabsCreateMenu';

import axios from 'axios';
import { useGeneralContext } from '../../../Contexts/GeneralContext';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { mapStringToString } from '../../../utils/utils';
import LearningObjectiveTextBox from '../../TextBox/LearningObjectiveTextBox';

type SharedParameterProps = {
  isSmallerScreen?: boolean;
};

export default function SharedParameterTab({
  isSmallerScreen,
}: SharedParameterProps) {
  const {
    isGenerateButtonClicked,

    temperature,
    handleTemperature,

    bloomLevelExercise,
    handleBloomLevelExercise,

    assignmentType,
    handleAssignmentType,

    targetLevel,
    handleTargetLevel,
    chosenTargetLevel,

    chosenTopic,
    handleChosenTopic,

    learningObjective,
    handleLearningObjective,
  } = useCreateOERsContext();

  const { apiKey, setupModel } = useGeneralContext();

  const { addToast } = CustomToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLOGenerateButtonClicked, setIsLOGenerateButtonClicked] =
    useState<boolean>(false);

  const handleIsLOGenerateButtonClicked = (isComplete: boolean) => {
    setIsLOGenerateButtonClicked(isComplete);
  };

  const postGenerateLearningObjective = async (
    apiKey: string | undefined,
    setupModel: string | undefined,
    educationContext: number,
    learningContext: string,
    topic: string,
    bloomLevel: string
  ): Promise<string[] | undefined> => {
    try {
      //console.log('apiKey', apiKey);
      const resp = await axios.post(
        '/api/encore/genAI/generateLearningObjective',
        {
          topic: topic,
          context: learningContext,
          level: educationContext,
        },
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      // console.log('Success - resp.data.error:', resp?.data?.error);
      console.log('Success - resp.data:', resp?.data);

      // console.log('Success - resp:', resp);
      // switch (bloomLevel) {
      //   case 'Remember':
      //     return resp?.data['Remembering'];
      //     break;
      //   case 'Understand':
      //     return resp?.data['Understanding'];
      //     break;
      //   case 'Apply':
      //     return resp?.data['Applying'];
      //     break;
      //   case 'Analyze':
      //     return resp?.data['Analyzing'];
      //     break;
      //   case 'Evaluate':
      //     return resp?.data['Evaluating'];
      //     break;
      //   case 'Create':
      //     return resp?.data['Creating'];
      //     break;
      //   default:
      //     return resp?.data['Remembering'];
      // }

      const bloomLevelString = mapStringToString(bloomLevel, BloomLevelString);
      return resp?.data[bloomLevelString];

      // The API returns an array of 2 learning objectives for each bloom level, so I have to select the one corresponding to the selected bloom level
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateLearningObjective = async () => {
    setIsLoading(true);
    const lO = await postGenerateLearningObjective(
      apiKey,
      setupModel,
      chosenTargetLevel || 0,
      chosenTopic,
      chosenTopic,
      bloomLevelExercise?.title || ''
    );
    setIsLoading(false);

    console.log(lO);
    if (lO) handleLearningObjective(lO[0]);
  };
  return (
    <>
      <Box w="60%">
        <Flex paddingBottom="0.5rem">
          <Text as="b">Topic</Text>
        </Flex>
        <TextBox
          isHighlighted={
            (isGenerateButtonClicked && chosenTopic == '') ||
            (isLOGenerateButtonClicked && chosenTopic == '')
          }
          text={chosenTopic}
          onTextChange={handleChosenTopic}
          resize="none"
          placeholder="choose a topic or write it manually."
        />
      </Box>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Assignment Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && assignmentType === null}
            options={assignmentTypeOptions}
            selected={assignmentType}
            preselectedTitle={assignmentType?.title}
            onChange={handleAssignmentType}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
        <Box w={'40%'} paddingLeft={'2%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Creativity of AI</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && temperature == null}
            options={temperatureOptions}
            selected={temperature}
            preselectedTitle={temperature?.title}
            onChange={handleTemperature}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'80%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              (isGenerateButtonClicked && targetLevel == null) ||
              (isLOGenerateButtonClicked && targetLevel == null)
            }
            options={targetLevelOptions}
            selected={targetLevel}
            preselectedTitle={targetLevel?.title}
            onChange={handleTargetLevel}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'80%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Bloom Level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              (isGenerateButtonClicked && bloomLevelExercise == null) ||
              (isLOGenerateButtonClicked && bloomLevelExercise == null)
            }
            options={bloomLevelOptions}
            selected={bloomLevelExercise}
            preselectedTitle={bloomLevelExercise?.title}
            onChange={handleBloomLevelExercise}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Box paddingTop={'2rem'}>
        <Flex paddingBottom="0.5rem">
          <Text as="b">Learning Objective</Text>
        </Flex>
        <Flex w="100%" alignItems="center">
          <Box w="60%">
            <LearningObjectiveTextBox
              isGenerateButtonClicked={isGenerateButtonClicked}
              learningObjective={learningObjective}
              handleLearningObjective={handleLearningObjective}
              placeholder='Click "Generate" to get the learning objective or write it manually.'
            />
          </Box>
          <Box ml={4}>
            <Button
              colorScheme="yellow"
              border="solid 1px"
              borderRadius="lg"
              onClick={() => {
                handleIsLOGenerateButtonClicked(false);
                if (
                  bloomLevelExercise !== null &&
                  chosenTopic !== '' &&
                  chosenTargetLevel !== null
                ) {
                  handleGenerateLearningObjective();
                } else {
                  handleIsLOGenerateButtonClicked(true);
                  addToast({
                    message:
                      'Please ensure all required fields are filled out before proceeding.',
                    type: 'warning',
                  });
                }
              }}
            >
              <Text as="b">Generate</Text>
            </Button>
          </Box>
          {isLoading && (
            <Box ml={4}>
              <CircularProgress isIndeterminate color="yellow.400" />
            </Box>
          )}
        </Flex>
      </Box>
      <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
        <TabsCreateMenu isSmallerScreen={isSmallerScreen} />
        {/* this bring to the tabs and the api call */}
      </Box>
    </>
  );
}
