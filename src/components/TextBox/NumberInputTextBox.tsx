import { Flex, FlexProps, Textarea, Tooltip } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type NumberInputTextBoxProps = {
  numberInput: number;
  setNumberInput: Dispatch<SetStateAction<number>>;
  isNumberZero: boolean;
  setIsNumberZero: Dispatch<SetStateAction<boolean>>;
  label_tooltip?: string;
} & FlexProps;

export default function NumberInputTextBox({
  numberInput,
  isNumberZero,
  label_tooltip,
  setNumberInput,
  setIsNumberZero,
  ...rest
}: NumberInputTextBoxProps) {
  const handleNumberChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newNumber = Number(e.target.value);
    console.log('newNumber', newNumber);

    // Limit the number to 5
    newNumber = Math.min(newNumber, 5);
    console.log('number modified', newNumber);
    setNumberInput(newNumber);
    if (newNumber > 0) {
      setIsNumberZero(false);
    }
  };
  return (
    <Flex align="center" {...rest}>
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
          w="70px"
          //h='50px'
          border={isNumberZero ? '2.5px solid #bf5521ff' : '1px solid'}
          borderRadius="lg"
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
    </Flex>
  );
}
