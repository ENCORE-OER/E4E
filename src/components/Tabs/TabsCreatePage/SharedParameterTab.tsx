/*
 *   Common parameter bteween all types of Exercises
 *
 *   Editable topic
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

import { Box, Flex, Text } from '@chakra-ui/react';
//mport {  useState } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import {
  assignmentTypeOptions,
  bloomLevelOptions,
  targetLevelOptions,
  temperatureOptions,
} from '../../../types/encoreElements';
import SegmentedButton from '../../Buttons/ButtonsDesignPage/SegmentedButton';
import TextBox from '../../TextBox/TextBox';
import TabsCreateMenu from './TabsCreateMenu';

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

    chosenTopic,
    handleChosenTopic,
  } = useCreateOERsContext();
  return (
    <>
      <Box w="50%">
        <Flex paddingBottom="0.5rem">
          <Text as="b">Topic</Text>
        </Flex>
        <TextBox
          text={chosenTopic}
          onTextChange={handleChosenTopic}
          resize="none"
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
            isHighlighted={isGenerateButtonClicked && targetLevel == null}
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
              isGenerateButtonClicked && bloomLevelExercise == null
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
      <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
        <TabsCreateMenu isSmallerScreen={isSmallerScreen} />
        {/* this bring to the tabs and the api call */}
      </Box>
    </>
  );
}
