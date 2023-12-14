import React, { useEffect } from 'react';
import { CheckboxGroup, Checkbox, Stack, Box } from '@chakra-ui/react';
import { useHasHydrated } from '../../utils/utils';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type CheckboxMenuProps = {
  onOptionsChange: (newSelectedOptions: string[]) => void;
  options: string[];
  reset: boolean;
  isHighlighted: boolean;
};

export default function CheckboxMenu({
  onOptionsChange,
  options,
  reset,
  isHighlighted,
}: CheckboxMenuProps) {
  //const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const hydrated = useHasHydrated();
  const { selectedOptions } = useLearningPathDesignContext();

  const handleCheckboxChange = (newSelectedOptions: string[]) => {
    // setSelectedOptions(newSelectedOptions);
    onOptionsChange(newSelectedOptions);
  };

  const resetState = () => {
    onOptionsChange([]);
  };

  useEffect(() => {
    if (reset) {
      resetState();
    }
  }, [reset]);

  return (
    <Box 
      w="100%"
      padding={1}
      border={((isHighlighted && selectedOptions.length === 0) && options.length > 0)  ? '1.5px solid #bf5521ff' : 'null'}
      borderRadius={'lg'}
    >
      <CheckboxGroup
        value={selectedOptions} 
        onChange={handleCheckboxChange}>
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
