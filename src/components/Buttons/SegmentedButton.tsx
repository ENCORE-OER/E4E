import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHasHydrated } from '../../utils/utils';

type SegmentedButtonProps<T> = {
  options: Array<T & { title: string; description?: string }>;
  selected?: T | null;
  onChange?: (value: T) => void;
  preselectedTitle?: string | null;
  isHighlighted: boolean;
  isSmallerScreen?: boolean;
};

const SegmentedButton = <T extends {}>({
  options,
  selected,
  onChange,
  preselectedTitle,
  isHighlighted,
  isSmallerScreen,
}: SegmentedButtonProps<T>) => {
  const [colored, setColored] = useState<string | null>(null);
  const hydrated = useHasHydrated();

  const handleOnChange = (
    value: T & { title: string; description?: string }
  ) => {
    console.log('Selected value:', value);
    if (onChange) {
      onChange(value);
      setColored(value.title);
    }
  };

  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [selected]);
  useEffect(() => {
    // Aggiorna il colore iniziale quando la prop preselectedTitle cambia
    if (preselectedTitle) {
      setColored(preselectedTitle);
    }
  }, [preselectedTitle]);

  return (
    <ButtonGroup
      isAttached
      size="lg"
      w="100%"
      border={isHighlighted ? '1.5px solid #bf5521ff' : '1.5px solid darkgrey'}
      borderRadius="25"
      style={{ animation: isHighlighted ? 'blink 1s infinite' : 'none' }}
      orientation={isSmallerScreen ? 'vertical' : 'horizontal'}
    >
      {hydrated &&
        options?.map((option, index) => (
          <Button
            key={option.title}
            onClick={() => handleOnChange(option)}
            colorScheme={colored === option.title ? 'yellow' : 'gray'}
            w="100%"
            borderRadius="25"
            borderLeft={index !== 0 ? '1px solid darkgrey' : 'none'}
            overflow='hidden'
          >
            {colored === option.title && (
              <Flex align="center" justify="center" marginRight="2">
                <CheckIcon />
              </Flex>
            )}
            <Box as="span" fontWeight="bold">
              <Text as="span" fontSize="lg">
                {option.title}
              </Text>

              <Text as="span" fontSize="xs" color="gray.600">
                {<br />}
                {option.description}
              </Text>
            </Box>
          </Button>
        ))}
    </ButtonGroup>
  );
};
export default SegmentedButton;
