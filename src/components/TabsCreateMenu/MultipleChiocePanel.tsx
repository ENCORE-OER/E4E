import { Flex, Box, Text, Button } from '@chakra-ui/react';
import SegmentedButton from '../Buttons/SegmentedButton';
import TextBox from '../TextBox/TextBox';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import SliderInput from '../NumberInput/SliderNumberInput';

type MultipleChoicePanelProps = {
  isSmallerScreen?: boolean;
};

export default function MultipleChoicePanel({
  isSmallerScreen,
}: MultipleChoicePanelProps) {
  const {
    targetLevelOptions,
    //difficultLevelOptions,
    exerciseTypeOptions,
    questionCategoryOptions,
    targetLevelMultipleChoice,
    handleSetTargetLevelMultipleChoice,
    exerciseType,
    handleSetExerciseType,
    questionCategoryMultipleChoice,
    handleSetQuestionCategoryMultipleChoice,
    correctAnswer,
    handleSetCorrectAnswer,
    easyDistractors,
    handleSetEasyDistractors,
    distractorsMultipleChioce,
    handleSetDistractorsMultipleChoice,
  } = useCreateOERsContext();

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'70%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={targetLevelOptions}
            selected={null}
            preselectedTitle={targetLevelMultipleChoice?.title}
            onChange={handleSetTargetLevelMultipleChoice}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
        {/* <Box w={'35%'} paddingLeft={'2rem'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Difficult level</Text>
          </Flex>
          <SegmentedButton //
            isHighlighted={false}
            options={difficultLevel}
            selected={null}
            onChange={() => null}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box> */}
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Exercise Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={exerciseTypeOptions}
            selected={null}
            preselectedTitle={exerciseType?.title}
            onChange={handleSetExerciseType}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'90%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Question Category</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={questionCategoryOptions}
            selected={null}
            preselectedTitle={questionCategoryMultipleChoice?.title}
            onChange={handleSetQuestionCategoryMultipleChoice}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'30%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Correct Answers</Text>
          </Flex>
          <SliderInput
            min={1}
            max={3}
            value={correctAnswer}
            onChange={handleSetCorrectAnswer}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Easy Distractors</Text>
          </Flex>
          <SliderInput
            min={0}
            max={8}
            value={easyDistractors}
            onChange={handleSetEasyDistractors}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <SliderInput
            min={0}
            max={8}
            value={distractorsMultipleChioce}
            onChange={handleSetDistractorsMultipleChoice}
          />
        </Box>
      </Flex>
      <Flex paddingTop="3rem" w="40%">
        <Button
          size="lg"
          colorScheme="yellow"
          border="solid 1px"
          borderRadius="lg"
        >
          <Text as="b">Generate</Text>
        </Button>
      </Flex>
      <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
        <Flex paddingBottom="0.5rem">
          <Text as="b">Output</Text>
        </Flex>
        <TextBox
          rows={10}
          onTextChange={() => {
            null;
          }}
        />
      </Box>
    </>
  );
}
