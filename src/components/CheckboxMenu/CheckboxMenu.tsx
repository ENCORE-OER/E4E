import React, {useEffect } from 'react';
import { CheckboxGroup, Checkbox, Stack, CSSReset } from '@chakra-ui/react';
import { useHasHydrated } from '../../utils/utils';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type CheckboxMenuProps = {
  onOptionsChange: (newSelectedOptions: string[]) => void;
  options: string[];
  reset: boolean;
};

export default function CheckboxMenu({
  onOptionsChange,
  options,
  reset,
}: CheckboxMenuProps) {
  //const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const hydrated = useHasHydrated();
  const {
    selectedOptions
  } = useLearningPathDesignContext();

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
    <>
      <CSSReset />
      <CheckboxGroup value={selectedOptions} onChange={handleCheckboxChange}>
        <Stack spacing={2}>
          {hydrated &&
            options.map((option) => (
              <Checkbox key={option} value={option} colorScheme="yellow">
                {option}
              </Checkbox>
            ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
