import { Flex, Box, Text, Button } from '@chakra-ui/react';
import SegmentedButton from '../Buttons/SegmentedButton';
import TextBox from '../TextBox/TextBox';

type Option = {
  title: string;
  description?: string;
};

type OpenQuestionPanelProps = {
  isSmallerScreen?: boolean;
};

export default function OpenQuestionPanel({
  isSmallerScreen,
}: OpenQuestionPanelProps) {
  const targetLevel: Option[] = [
    { title: 'Primary' },
    { title: 'Middle School' },
    { title: 'High School' },
    { title: 'Academic' },
    { title: 'Professional' },
  ];

  const difficultLevel: Option[] = [
    { title: 'Easy' },
    { title: 'Medium' },
    { title: 'Hard' },
  ];

  const questionType: Option[] = [
    { title: 'Open' },
    { title: 'Short Answer' },
    { title: 'True False' },
  ];

  const QuestionCategory: Option[] = [
    { title: 'Factual Knowledge' },
    { title: 'Understanding of Concepts' },
    { title: 'Application of Skills' },
    { title: 'Analysys And Evaluation' },
  ];

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'60%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={targetLevel}
            selected={null}
            onChange={() => null}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
        <Box w={'35%'} paddingLeft={'2rem'}>
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
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Question Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={questionType}
            selected={null}
            onChange={() => null}
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
            options={QuestionCategory}
            selected={null}
            onChange={() => null}
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
