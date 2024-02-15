import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import SegmentedButton from '../Buttons/SegmentedButton';
import SliderInput from '../NumberInput/SliderNumberInput';
import TextBox from '../TextBox/TextBox';

type FillGapsPanelProps = {
  isSmallerScreen?: boolean;
};

export default function FillGapsPanel({ isSmallerScreen }: FillGapsPanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,
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

  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();

  const handleOptionsComplete = () => {
    if (targetLevelFillGaps != null && length != null) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [targetLevelFillGaps, length]);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'70%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && targetLevelFillGaps == null
            }
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
            isHighlighted={isGenerateButtonClicked && length == null}
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
