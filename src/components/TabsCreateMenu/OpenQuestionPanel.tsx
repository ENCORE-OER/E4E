import { Flex, Box, Text, Button } from '@chakra-ui/react';
import SegmentedButton from '../Buttons/SegmentedButton';
import TextBox from '../TextBox/TextBox';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';

type OpenQuestionPanelProps = {
  isSmallerScreen?: boolean;
};

export default function OpenQuestionPanel({
  isSmallerScreen,
}: OpenQuestionPanelProps) {
  const {
    targetLevelOptions,
    //difficultLevelOptions,
    questionTypeOptions,
    questionCategoryOptions,
    targetLevel,
    handleSetTargetLevel,
    questionType,
    handleSetQuestionType,
    questionCategory,
    handleSetQuestionCategory,
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
            preselectedTitle={targetLevel?.title}
            selected={null}
            onChange={handleSetTargetLevel}
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
            isHighlighted={false}
            options={questionTypeOptions}
            selected={null}
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
            isHighlighted={false}
            options={questionCategoryOptions}
            selected={null}
            preselectedTitle={questionCategory?.title}
            onChange={handleSetQuestionCategory}
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
