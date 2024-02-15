import { Flex, Box, Text, Button } from '@chakra-ui/react';
import SegmentedButton from '../Buttons/SegmentedButton';
import TextBox from '../TextBox/TextBox';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useState, useEffect } from 'react';

type OpenQuestionPanelProps = {
  isSmallerScreen?: boolean;
};

export default function OpenQuestionPanel({
  isSmallerScreen,
}: OpenQuestionPanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,
    targetLevelOptions,
    //difficultLevelOptions,
    questionTypeOptions,
    questionCategoryOptions,
    targetLevelOpenQuestion,
    handleSetTargetLevelOpenQuestion,
    questionType,
    handleSetQuestionType,
    questionCategoryOpenQuestion,
    handleSetQuestionCategoryOpenQuestion,
  } = useCreateOERsContext();

  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();

  const handleOptionsComplete = () => {
    if ( targetLevelOpenQuestion != null && questionType != null && questionCategoryOpenQuestion != null) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [targetLevelOpenQuestion, questionType, questionCategoryOpenQuestion]);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'70%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && targetLevelOpenQuestion == null}
            options={targetLevelOptions}
            selected={targetLevelOpenQuestion}
            preselectedTitle={targetLevelOpenQuestion?.title}
            onChange={handleSetTargetLevelOpenQuestion}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
        {/* <Box w={'35%'} paddingLeft={'2rem'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Difficult level</Text>
          </Flex>
          <SegmentedButton
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
            <Text as="b">Question Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && questionType == null}
            options={questionTypeOptions}
            selected={questionType}
            preselectedTitle={questionType?.title}
            onChange={handleSetQuestionType}
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
            isHighlighted={isGenerateButtonClicked && questionCategoryOpenQuestion == null}
            options={questionCategoryOptions}
            selected={questionCategoryOpenQuestion}
            preselectedTitle={questionCategoryOpenQuestion?.title}
            onChange={handleSetQuestionCategoryOpenQuestion}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex paddingTop="3rem" w="40%">
        <Button
          size="lg"
          colorScheme="yellow"
          border="solid 1px"
          borderRadius="lg"
          onClick={() => {
            handleOptionsComplete();
            if (areOptionsComplete) {
              handleIsGenerateButtonClicked(false);
            } else {
              addToast({
                message:
                  'Please ensure all required fields are filled out before proceeding.',
                type: 'warning',
              });
              handleIsGenerateButtonClicked(true);
            }
          }}
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
