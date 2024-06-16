import { Button, Flex, FlexProps, Textarea, Tooltip } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import IconMinus from '../Icons/IconMinus/IconMinus';
import IconPlus from '../Icons/IconPlus/IconPlus';

type NumberInputWithButtonsProps = {
  numberInput: number;
  setNumberInput: Dispatch<SetStateAction<number>>;
  minNumber: number;
  maxNumber: number;
  isNumberZero: boolean;
  setIsNumberZero?: Dispatch<SetStateAction<boolean>>;
  isEmptyLearningObjectivesPresent?: boolean;
  isLoading?: boolean;
  label_tooltip?: string;
  min_label_tooltip?: string;
  max_label_tooltip?: string;
  isDisabled?: boolean;
} & FlexProps;

export default function NumberInputWithButtons({
  numberInput,
  minNumber,
  maxNumber,
  isNumberZero,
  label_tooltip,
  min_label_tooltip,
  max_label_tooltip,
  setNumberInput,
  isEmptyLearningObjectivesPresent,
  isLoading,
  isDisabled,
  // setIsNumberZero,
  ...rest
}: NumberInputWithButtonsProps) {
  const handleNumberChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newNumber = Number(e.target.value);
    console.log('newNumber', newNumber);

    // Limit the number to 5
    newNumber = Math.max(Math.min(newNumber, maxNumber), minNumber);
    console.log('number modified', newNumber);
    setNumberInput(newNumber);
    // if (newNumber > 0) {
    //   setIsNumberZero(false);
    // }
  };

  const handleClickPlusButton = () => {
    if (numberInput < maxNumber) setNumberInput(numberInput + 1);
  };

  const handleClickMinusButton = () => {
    // If there are empty objectives, decrease numberOfLO
    // otherwise, do nothing
    if (
      (isEmptyLearningObjectivesPresent !== undefined &&
        isEmptyLearningObjectivesPresent) ||
      isEmptyLearningObjectivesPresent === undefined
    ) {
      // Decrease numberOfLO only if it's greater than the minimum allowed
      if (numberInput > minNumber) setNumberInput(numberInput - 1);
    }
  };

  useEffect(() => {
    if (numberInput < minNumber) {
      setNumberInput(minNumber);
    }
  }, [numberInput]);

  return (
    <Flex
      {...rest}
      align="center"
      direction="row"
      gap={0}
      borderRadius="lg"
      border={isNumberZero ? '2.5px solid #bf5521ff' : '1px solid'}
      bg="gray.300"
      p={0}
    >
      <Tooltip
        label={min_label_tooltip}
        bg={'accent.900'}
        color="black"
        placement={'top'}
        borderRadius={'md'}
        visibility={
          (numberInput === minNumber ||
            (isEmptyLearningObjectivesPresent !== undefined &&
              !isEmptyLearningObjectivesPresent)) &&
          min_label_tooltip
            ? 'visible'
            : 'hidden'
        }
      >
        <Button
          bg="none"
          p={0}
          onClick={handleClickMinusButton}
          isDisabled={
            isLoading ||
            (isEmptyLearningObjectivesPresent !== undefined &&
              !isEmptyLearningObjectivesPresent) ||
            numberInput === minNumber ||
            isDisabled
          }
        >
          <IconMinus />
        </Button>
      </Tooltip>
      <Tooltip
        label={label_tooltip}
        bg={'accent.900'}
        color="black"
        placement={'top'}
        borderRadius={'md'}
        visibility={label_tooltip ? 'visible' : 'hidden'}
      >
        <Textarea
          display="flex"
          textAlign={'center'}
          justifyContent={'center'}
          variant="solid"
          resize="none"
          //size="sm"
          w="60px"
          //h='50px'
          borderX={isNumberZero ? '2.5px solid #bf5521ff' : '1px solid'}
          borderRadius={0}
          rows={1}
          flexWrap="nowrap"
          overflowWrap={'break-word'}
          typeof="number"
          errorBorderColor={
            numberInput === 0 ? '2.5px solid #bf5521ff' : 'none'
          }
          value={numberInput}
          onChange={handleNumberChange}
          isDisabled={isLoading || isDisabled}
        />
      </Tooltip>
      <Tooltip
        label={max_label_tooltip}
        bg={'accent.900'}
        color="black"
        placement={'top'}
        borderRadius={'md'}
        visibility={
          numberInput === maxNumber && max_label_tooltip ? 'visible' : 'hidden'
        }
      >
        <Button
          bg="none"
          p={0}
          onClick={handleClickPlusButton}
          isDisabled={isLoading || numberInput === maxNumber || isDisabled}
        >
          <IconPlus />
        </Button>
      </Tooltip>
    </Flex>
  );
}
