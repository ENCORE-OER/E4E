import { Flex, Box, Text, Button } from '@chakra-ui/react';
import SegmentedButton from '../Buttons/SegmentedButton';
import TextBox from '../TextBox/TextBox';

type Option = {
  title: string;
  description?: string;
};

type FillGapsPanelProps = {
  isSmallerScreen?: boolean;
};

export default function FillGapsPanel({ isSmallerScreen }: FillGapsPanelProps) {
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

  const lenght: Option[] = [
    { title: 'Short', description: '(~150 words)' },
    { title: 'Medium', description: '(~250 words)' },
    { title: 'Long', description: '(~350 words)' },
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
          <SegmentedButton //
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
            <Text as="b">Lenght</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={lenght}
            selected={null}
            onChange={() => null}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
        <Box w={'20%'} marginLeft="2rem">
          <Flex margin="0.4rem">
            <Text as="b">Number Of Blanks</Text>
          </Flex>
          <TextBox
            onTextChange={() => {
              null;
            }}
          />
        </Box>
        <Box w={'20%'} marginLeft="2rem">
          <Flex margin="0.4rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <TextBox
            onTextChange={() => {
              null;
            }}
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
