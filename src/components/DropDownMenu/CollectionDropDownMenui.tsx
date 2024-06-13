import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CollectionProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

type CollectionDropDownMenuProps = {
  options: CollectionProps[];
  title: string;
  selectedIndex: number;
  onChange: (selectedIndex: number) => void;
  isHighlighted?: boolean;
};

const CollectionDropDownMenu = ({
  options,
  title,
  selectedIndex,
  onChange,
  isHighlighted,
}: CollectionDropDownMenuProps) => {
  const hydrated = useHasHydrated();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options[selectedIndex]?.name ?? null
  );

  const handleSelect = (index: number) => {
    setSelectedOption(options[index].name);
    onChange(index); // Chiamata alla funzione di callback con l'indice selezionato
  };

  const handleHighlight = () => {
    // If the index is -1, it means that the item is not selected
    return selectedOption === null ? true : false;
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
          border={
            isHighlighted && handleHighlight()
              ? '2.5px solid #bf5521ff'
              : '1px solid #CED4DA'
          }
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
