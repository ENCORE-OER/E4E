import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';

type CustomNumberInputProps = {
  steppers?: boolean; // To use or not the steppers to increment/decrease the value
  valueNumber: string | number;
  handleChangeValue: (value: string) => void;
} & NumberInputProps;

export default function CustomNumberInput({
  steppers,
  valueNumber,
  handleChangeValue,
  ...rest
}: CustomNumberInputProps) {
  return (
    <NumberInput
      {...rest}
      value={valueNumber}
      min={0}
      onChange={handleChangeValue}
    >
      <NumberInputField />
      {steppers && (
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      )}
    </NumberInput>
  );
}
