import { Box, Flex, Text } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import SliderInput from '../../NumberInput/SliderNumberInput';

export default function MultipleChoicePanel() {
  const {
    correctAnswerQuiz,
    handleCorrectAnswerQuiz,

    easyDistractors,
    handleEasyDistractors,

    distractorsMultipleChoice,
    handleDistractorsMultipleChoice,

    chosenTypeOfAssignment,
  } = useCreateOERsContext();

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'30%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Correct Answers</Text>
          </Flex>
          <SliderInput
            min={1}
            max={chosenTypeOfAssignment === 0 ? 3 : 1} // 0 = theoretical assignment, 2 = practical assignment
            value={correctAnswerQuiz}
            onChange={handleCorrectAnswerQuiz}
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
            onChange={handleEasyDistractors}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <SliderInput
            min={0}
            max={8}
            value={distractorsMultipleChoice}
            onChange={handleDistractorsMultipleChoice}
          />
        </Box>
      </Flex>
    </>
  );
}
