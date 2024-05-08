import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { ArrayProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

export type onDataType = number | string;

type CustomDropDownMenuProps = {
  data: ArrayProps[]; // data array to scroll through the menu
  // options?: string[] | undefined;
  onData?: (data?: string[] | number[]) => void;
  onSelectionChange?: (selectedItem: number, event?: any) => void;
  isHighlighted?: boolean;
  isBloomLevel?: boolean;
  itemIndex?: number | number[];
  defaultMenuTitle: string;
  isYellowOnFocus?: boolean;
  isCheckBoxNeeded?: boolean;
};

export default function CustomDropDownMenu({
  data, // use this to populate the menu
  // options,
  // onData,
  onSelectionChange,
  isHighlighted,
  // isBloomLevel,
  isYellowOnFocus,
  itemIndex,
  defaultMenuTitle,
  isCheckBoxNeeded,
}: CustomDropDownMenuProps) {
  //const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuTitle, setMenuTitle] = useState<string | undefined>(undefined);
  // const { collectionIndex, resourceIndex, bloomLevelIndex, selectedSkillConceptsTags } =
  // const { selectedSkillConceptsTags } = useLearningPathDesignContext();
  // const [selectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // for the open Menu
  const hydrated = useHasHydrated();

  // useEffect(() => {
  //   // Aggiorna il titolo in base agli indici
  //   if (isBloomLevel) {
  //     // Se è un Bloom Level e l'indice è valido
  //     setMenuTitle(data[bloomLevelIndex]?.name || 'Select Bloom Level');
  //   } else {
  //     // Se è una Collection e l'indice è valido
  //     setMenuTitle(data[collectionIndex]?.name || 'Select Collection');
  //   }
  //   // ... altri effetti necessari
  // }, [isBloomLevel, collectionIndex, resourceIndex, bloomLevelIndex, data]);

  useEffect(() => {
    if (itemIndex !== undefined) {
      if (Array.isArray(itemIndex)) {
        if (itemIndex.length === 0) {
          // Reset menu title if there aren't resources selected
          setMenuTitle(defaultMenuTitle);
        } else {
          // Sum all the name of the selected resources
          const longTitle = itemIndex
            .map(
              (index: number) =>
                data[index]?.name || data[index]?.title || defaultMenuTitle
            )
            .join(', ');
          setMenuTitle(longTitle);
        }
      } else if (!Array.isArray(itemIndex)) {
        setMenuTitle(
          itemIndex > -1
            ? data[itemIndex]?.name ||
            data[itemIndex]?.title ||
            defaultMenuTitle
            : defaultMenuTitle
        );
      }
    }
  }, [itemIndex, data, defaultMenuTitle]);

  // const handleData = () => {
  //   if (onData) {
  //     // onData(selectedOptions);
  //     onData()
  //   }
  // };
  const handleMenuItemClick = (item: ArrayProps, index: number) => {
    //setSelectedItem(item.name);
    if (onSelectionChange) {
      onSelectionChange(index);
      // handleData();
    }
    setMenuTitle(item.name || item.title || '');
    handleToggleMenu(); // Chiudi il menu dopo la selezione, se necessario

    //TODO: fix this, the problem is that idk how to delete the tags without refreshing the page => FIXED: use .clear() method
    // if (!isBloomLevel && selectedSkillConceptsTags.length > 0) {
    //   // Refresha la pagina
    //   window.location.reload();
    // }
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  const handleHighlight = () => {
    // If the index is -1, it means that the item is not selected
    return itemIndex === -1 ? true : false;
  };

  // useEffect(() => {
  //   handleData();
  //   // console.log(bloomLevelIndex);
  //   // console.log(collectionIndex);1
  // }, [selectedOptions]);

  return (
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
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          title={menuTitle}
          bg={'white'}
          _expanded={isYellowOnFocus ? { bg: 'yellow.400' } : undefined}
        >
          {menuTitle === defaultMenuTitle ? (
            <Text align="left" fontWeight={'normal'} color={'gray.400'}>
              {menuTitle}
            </Text>
          ) : (
            /* Could also use <Text align="left" overflow="hidden" whiteSpace="nowrap"> */

            <Text align="left" noOfLines={1}>
              {/* {
                    selectedOptions.includes('All') &&
                      options?.length === selectedOptions.length
                      ? 'All'
                      : selectedOptions.length > 0
                        ? selectedOptions.join(', ')
                        : menuTitle // Utilizza il valore memorizzato in menuTitle
                  } */}
              {menuTitle}
            </Text>
          )}
        </MenuButton>

        <MenuList>
          {hydrated &&
            data?.map((item: ArrayProps, index: number) => (
              <Flex p={0.5} key={index}>
                <MenuItem
                  onClick={!isCheckBoxNeeded ? () => handleMenuItemClick(item, index) : undefined}
                  closeOnSelect={isCheckBoxNeeded ? false : true}
                  bg={
                    Array.isArray(itemIndex)
                      ? itemIndex.includes(index)
                        ? 'accent.200'
                        : undefined
                      : itemIndex === index
                        ? 'accent.200'
                        : undefined
                  }
                  borderRadius={5}
                >
                  <Flex direction={'row'} w='100%'>
                    <Text flex='1'>{item.name || item.title}</Text>
                    {isCheckBoxNeeded &&
                      <Flex flex='1' justify={'flex-end'}>
                        <Checkbox
                          key={index}
                          value={item.name || item.title}
                          colorScheme="yellow"
                          onChange={() => handleMenuItemClick(item, index)}
                          isChecked={Array.isArray(itemIndex) ? itemIndex.includes(index) : itemIndex === index}
                        />
                      </Flex>
                    }
                  </Flex>
                </MenuItem>
              </Flex>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
