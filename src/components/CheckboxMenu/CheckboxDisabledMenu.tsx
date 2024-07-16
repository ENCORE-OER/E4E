import { Box, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { useHasHydrated } from '../../utils/utils';
import { useEffect, useState } from 'react';

type CheckboxMenuProps = {
  solutions: string[];
  distractors: string[];
  //easyDistractors?: string[];
};

export default function CheckboxDisabledMenu({
    solutions,
    distractors,
  }: CheckboxMenuProps) {
    const hydrated = useHasHydrated();
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
 
    // Function to shuffle an array
    const shuffleArray = (array: string[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        // Combine solutions and distractors
        const combinedOptions = [...solutions, ...distractors];
        // Shuffle combined options
        const shuffledOptions = shuffleArray(combinedOptions);
        setOptions(shuffledOptions);
        // Set selected options to only solutions
        setSelectedOptions(solutions);
    }, [solutions, distractors]);

    return (
      <Box
        w="100%"
        padding={1}
        borderRadius={'lg'}
      >
        <CheckboxGroup value={selectedOptions} >
          <Stack spacing={2}>
            {hydrated &&
              options.map((option) => (
                <Checkbox key={option} value={option} colorScheme="yellow">
                  {option}
                </Checkbox>
              ))}
          </Stack>
        </CheckboxGroup>
      </Box>
    );
  }