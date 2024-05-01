import { Box, Flex, Text } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import SliderInput from '../../NumberInput/SliderNumberInput';

export default function FillGapsPanel() {
  const {
    distractorsFillGaps,
    handleDistractorsFillGaps,

    easyDistractorsFillGaps,
    handleEasyDistractorsFillGaps,

    blanks,
    handleBlanks,
  } = useCreateOERsContext();

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'30%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Blanks</Text>
          </Flex>
          <SliderInput value={blanks} onChange={handleBlanks} min={1} max={8} />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Easy Distractors</Text>
          </Flex>
          <SliderInput
            value={easyDistractorsFillGaps}
            onChange={handleEasyDistractorsFillGaps}
            min={0}
            max={blanks}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <SliderInput
            value={distractorsFillGaps}
            onChange={handleDistractorsFillGaps}
            min={0}
            max={blanks}
          />
        </Box>
      </Flex>
    </>
  );
}
