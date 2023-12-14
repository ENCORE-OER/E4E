import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useHasHydrated } from '../../utils/utils';
import { ArrayProps } from '../../types/encoreElements';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

export type onDataType = number | string;

type CollectionMenuProps = {
  initialTitle: string; // Titolo iniziale del menu
  data: ArrayProps[]; // Array di dati da scorrere nel menu
  options?: string[] | undefined;
  onData?: (data: string[] | number[]) => void;
  onSelectionChange?: (selectedItem: number) => void;
  isHighlighted: boolean;
  isBloomLevel?: boolean;
};

export default function CustomDropDownMenu({
  initialTitle,
  data, // Usa il prop data per popolare il menu
  options,
  onData,
  onSelectionChange,
  isHighlighted,
  isBloomLevel,
}: CollectionMenuProps) {
  //const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuTitle, setMenuTitle] = useState(initialTitle);
  const { collectionIndex, bloomLevelIndex } = useLearningPathDesignContext();
  const [selectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // for the open Menu
  const hydrated = useHasHydrated();

  const handleData = () => {
    if (onData) {
      onData(selectedOptions);
    }
  };
  const handleMenuItemClick = (item: ArrayProps, index: number) => {
    //setSelectedItem(item.name);
    if (onSelectionChange) onSelectionChange(index);
    setMenuTitle(item.name);
    handleToggleMenu(); // Chiudi il menu dopo la selezione, se necessario
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  const handleHighlight = () => {
    if (isBloomLevel) {
      return bloomLevelIndex === -1 ? true : false;
    } else {
      return collectionIndex === -1 ? true : false;
    }
  };

  useEffect(() => {
    handleData();
    console.log(bloomLevelIndex);
    console.log(collectionIndex);
  }, [selectedOptions]);
  return (
    <>
      <Box
        flex="1"
        border={
          isHighlighted && handleHighlight()
            ? '1.5px solid #bf5521ff'
            : '1px solid #CED4DA'
        }
        borderRadius="7px"
      >
        <Menu
          isOpen={isOpen}
          onOpen={handleToggleMenu}
          onClose={handleToggleMenu}
        >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
            {/* Could also use <Text align="left" overflow="hidden" whiteSpace="nowrap"> */}
            <Text align="left" noOfLines={1}>
              {
                selectedOptions.includes('All') &&
                options?.length === selectedOptions.length
                  ? 'All'
                  : selectedOptions.length > 0
                    ? selectedOptions.join(', ')
                    : menuTitle // Utilizza il valore memorizzato in menuTitle
              }
            </Text>
          </MenuButton>

          <MenuList>
            {hydrated &&
              data?.map((item: ArrayProps, index: number) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuItemClick(item, index)}
                >
                  <Text>{item.name}</Text>
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
