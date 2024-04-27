import { Box, Flex, Text } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { questionTypeOptions } from '../../../types/encoreElements';
import SegmentedButton from '../../Buttons/ButtonsDesignPage/SegmentedButton';

type OpenQuestionPanelProps = {
  isSmallerScreen?: boolean;
};

export default function OpenQuestionPanel({
  isSmallerScreen,
} //analyzeMaterial,
: OpenQuestionPanelProps) {
  const {
    isGenerateButtonClicked,

    questionType,
    handleQuestionType,
    // apiGeneratedExerciseData: apiData, // is used in the GenerateExerciseResponseView component
    // handleGeneratedExerciseData,
    // handleTextToJSONOpenQuestion: handleTextToJSON,
  } = useCreateOERsContext();

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'60%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Question Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && questionType == null}
            options={questionTypeOptions}
            selected={questionType}
            preselectedTitle={questionType?.title}
            onChange={handleQuestionType}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
    </>
  );
}
