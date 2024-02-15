import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useHasHydrated } from '../../utils/utils';

type SliderInputProps = {
  value: number;
  onChange: (value: number | string) => void;
  min: number;
  max: number;
};

export default function SliderInput({
  value,
  onChange,
  min,
  max,
}: SliderInputProps) {
  const hydrated = useHasHydrated();
  console.log('SliderInput value:', value);

    return (
      <Flex>
        <NumberInput
          maxW="100px"
          mr="2rem"
          min={min}
          max={max}
          defaultValue={value}
          value={value}
          onChange={onChange}
          focusBorderColor="yellow.500"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          min={min}
          max={max}
          flex="1"
          focusThumbOnChange={false}
          defaultValue={3}
          value={value as number}
          onChange={onChange}
          colorScheme="yellow"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px">
            {hydrated && value}
          </SliderThumb>
        </Slider>
      </Flex>
    );
  }
