import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import SegmentedButton from '../Buttons/SegmentedButton';
import TextBox from '../TextBox/TextBox';
import SliderInput from '../NumberInput/SliderNumberInput';
// import { useEffect } from 'react';

type FillGapsPanelProps = {
  isSmallerScreen?: boolean;
};

export default function FillGapsPanel({ isSmallerScreen }: FillGapsPanelProps) {
  const {
    targetLevelOptions,
    //difficultLevelOptions,
    lengthOptions,
    targetLevelFillGaps,
    handleSetTargetLevelFillGaps,
    //handleSetDifficultLevel,
    length,
    handleSetLength,
    distractorsFillGaps,
    handleSetDistractorsFillGaps,
    blanks,
    handleSetBlanks,
    //handleResetOptions,
  } = useCreateOERsContext();

  // useEffect(() => {
  //   // Recupera il valore da localStorage al montaggio del componente padre
  //   const storedValue = localStorage.getItem('distractorsFillGaps');
  //   if (storedValue) {
  //     handleSetDistractorsFillGaps(storedValue);
  //   }
  // }, []);

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
            selected={targetLevelFillGaps}
            preselectedTitle={targetLevelFillGaps?.title}
            onChange={handleSetTargetLevelFillGaps}
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
            options={difficultLevelOptions}
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
            <Text as="b">Lenght</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={false}
            options={lengthOptions}
            selected={length}
            preselectedTitle={length?.title}
            onChange={handleSetLength}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
          <Flex margin="0.4rem">
            <Text as="b">Number Of Blanks</Text>
          </Flex>
          <SliderInput
            value={blanks}
            onChange={handleSetBlanks}
            min={1}
            max={8}
          />
        </Box>
        <Box w={'40%'} marginLeft="2rem">
          <Flex margin="0.4rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <SliderInput
            value={distractorsFillGaps}
            onChange={handleSetDistractorsFillGaps}
            min={0}
            max={5}
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
