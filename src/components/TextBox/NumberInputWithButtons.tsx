import { Button, Flex, FlexProps, Textarea, Tooltip } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import IconMinus from '../Icons/IconMinus/IconMinus';
import IconPlus from '../Icons/IconPlus/IconPlus';

type NumberInputWithButtonsProps = {
  numberInput: number;
  setNumberInput: Dispatch<SetStateAction<number>>;
  minNumber: number;
  maxNumber: number;
  isNumberZero: boolean;
  setIsNumberZero: Dispatch<SetStateAction<boolean>>;
  label_tooltip?: string;
  min_label_tooltip?: string;
  max_label_tooltip?: string;
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
  // setIsNumberZero,
  ...rest
}: NumberInputWithButtonsProps) {
  const handleNumberChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newNumber = Number(e.target.value);
    console.log('newNumber', newNumber);

    // Limit the number to 5
    newNumber = Math.min(newNumber, maxNumber);
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
    if (numberInput > minNumber) setNumberInput(numberInput - 1);
  };

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
          numberInput === minNumber && min_label_tooltip ? 'visible' : 'hidden'
        }
      >
        <Button bg="none" p={0} onClick={handleClickMinusButton}>
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
        <Button bg="none" p={0} onClick={handleClickPlusButton}>
          <IconPlus />
        </Button>
      </Tooltip>
    </Flex>
  );
}
