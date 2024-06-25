import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ResponsiveValue,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { OptionsTypeOfAssignmentProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

type LessonDropDownMenuProps = {
  options: OptionsTypeOfAssignmentProps[]; // type of assignment (learning, assessment, others)
  title: string;
  onChange: (selectedIndex: number) => void;
  size?: ResponsiveValue<string>;
};

export default function LessonDropDownMenu({
  options,
  title,
  onChange,
  size,
}: LessonDropDownMenuProps) {
  const hydrated = useHasHydrated();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(options[index]?.name);
    onChange(index); // Chiamata alla funzione di callback con l'indice selezionato
  };

  return (
    <Flex
      w="fit-content"
      // flex="1"
      borderRadius="lg"
    >
      <Menu>
        <MenuButton
          bg={'blue.100'}
          borderRadius="lg"
          w="fit-content"
          fontSize={size}
          fontWeight="normal"
          py={0}
          size={size}
          // px={3}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          _expanded={{ bg: 'lightblue' }}
          textAlign="center"
          // border={'1px solid #CED4DA'}
        >
          {selectedOption || title || (
            <Text color="gray.400" fontWeight={'light'}>
              Type of Lesson
            </Text>
          )}
        </MenuButton>
        <MenuList borderRadius="lg">
          {hydrated &&
            options.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelect(index)}
                bg={option.colorBackground}
              >
                {option.name}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
