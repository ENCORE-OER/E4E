import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { CollectionProps } from '../../types/encoreElements';
import { useState } from 'react';
import { useHasHydrated } from '../../utils/utils';

type CollectionDropDownMenuProps = {
  options: CollectionProps[];
  title: string;
  onChange: (selectedIndex: number) => void;
};

const CollectionDropDownMenu = ({
  options,
  title,
  onChange,
}: CollectionDropDownMenuProps) => {
  const hydrated = useHasHydrated();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(options[index].name);
    onChange(index); // Chiamata alla funzione di callback con l'indice selezionato
  };

  return (
    <Box w="100%" flex="1" borderRadius="7px">
      <Menu>
        <MenuButton
          w="100%"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          _expanded={{ bg: 'yellow.400' }}
          textAlign="left"
          border={'1px solid #CED4DA'}
        >
          {selectedOption || title}
        </MenuButton>
        <MenuList>
          {hydrated &&
            options.map((option, index) => (
              <MenuItem key={option.id} onClick={() => handleSelect(index)}>
                {option.name}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CollectionDropDownMenu;
