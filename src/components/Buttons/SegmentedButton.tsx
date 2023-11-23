import React, {useState, useEffect} from "react";
import { Button, ButtonGroup, Flex, Text, Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useHasHydrated } from '../../utils/utils';

type SegmentedButtonProps<T> = {
  options: Array<T & { title: string; description?: string }>;
  selected?: T | null;
  onChange?: (value: T) => void;
};

const SegmentedButton = <T extends {}>({ options, selected, onChange }: SegmentedButtonProps<T>) => {
  const [colored, setColored] = useState<string | null>(null);
  const hydrated = useHasHydrated();

  const handleOnChange = (value: T & { title: string; description?: string }) => {
    console.log('Selected value:', value);
    if (onChange) {
      onChange(value);
      setColored(value.title);
    }
  };

  useEffect(() => {
    //console.log('cambiato qualcosa');
  }, [selected]);

  return (
    <ButtonGroup 
      isAttached
      size="lg"
      w="100%"
    >
      {hydrated &&
        options?.map((option) => (
          <Button
            key={option.title}
            onClick={() => handleOnChange(option)}
            colorScheme={colored === option.title ? "yellow" : "gray"}
            w="33%" 
            border='1px'
            borderColor="darkgrey"
            borderRadius="25"
          >
            {colored === option.title  && (
              <Flex align="center" justify="center" marginRight="2">
                <CheckIcon />
              </Flex>
            )}
            <Box as="span" fontWeight="bold">
              {option.title}
            
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