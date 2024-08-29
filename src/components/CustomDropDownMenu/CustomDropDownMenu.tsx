import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { ArrayProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import DeselectAllButton from '../Buttons/ButtonsDesignPage/DeselectAllButton';

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
  isBloomLevel,
  isYellowOnFocus,
  itemIndex,
  defaultMenuTitle,
  isCheckBoxNeeded,
}: CustomDropDownMenuProps) {
  const [menuTitle, setMenuTitle] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false); // for the open Menu
  const hydrated = useHasHydrated();

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

  const handleMenuItemClick = (item: ArrayProps, index: number) => {
    //setSelectedItem(item.name);
    if (onSelectionChange) {
      onSelectionChange(index);
      // handleData();
    }
    setMenuTitle(item.name || item.title || '');
    // if (!isCheckBoxNeeded) {
    //   handleToggleMenu(); // Close menu after the selection if necessary
    // }
  };

  const handleDeleteAllClick = () => {
    if (onSelectionChange) {
      onSelectionChange(-1);
    }
    //setMenuTitle(defaultMenuTitle);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  const handleHighlight = () => {
    // If the index is -1, it means that the item is not selected
    return itemIndex === -1 ? true : false;
  };

  return (
    <Box
      flex="1"
      border={
        isHighlighted && handleHighlight()
          ? '2.5px solid #bf5521ff'
          : '1px solid #CED4DA'
      }
      borderRadius="lg"
    >
      <Menu
        isOpen={isOpen}
        // onOpen={handleToggleMenu}
        onClose={handleToggleMenu}
        closeOnSelect={isCheckBoxNeeded ? false : true}
      >
        <Tooltip
          hasArrow
          // placement="bottom"
          label={
            isBloomLevel
              ? Array.isArray(itemIndex)
                ? // Se itemIndex è un array, mostra la descrizione del primo elemento selezionato
                data[itemIndex[0]]?.description
                : itemIndex !== undefined
                  ? // Se itemIndex è un numero, mostra la descrizione corrispondente
                  data[itemIndex]?.description
                  : null // Altrimenti non mostrare nulla
              : null
          }
          aria-label={
            Array.isArray(itemIndex)
              ? `Tooltip for ${data[itemIndex[0]]?.name || data[itemIndex[0]]?.title}`
              : itemIndex !== undefined
                ? `Tooltip for ${data[itemIndex]?.name || data[itemIndex]?.title}`
                : ''
          }
          //ml="1px"
          bg="gray.200"
          color="primary"
          p={2}
          fontSize={'sm'}
          borderRadius={5}
          isDisabled={!isBloomLevel}
        >
          <MenuButton
            as={Button}
            rightIcon={
              isOpen ? (
                <ChevronUpIcon fontSize="x-large" />
              ) : (
                <ChevronDownIcon fontSize="x-large" />
              )
            }
            w="100%"
            title={menuTitle}
            bg={'white'}
            _expanded={isYellowOnFocus ? { bg: 'yellow.300' } : undefined}
            aria-expanded={isOpen ? 'true' : 'false'}
            onClick={handleToggleMenu}
          >
            <Flex direction="row" w="100%" align="center" gap={3}>
              <Flex
                flex="1"
                justifyItems={'flex-start'}
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {menuTitle === defaultMenuTitle ? (
                  <Text
                    align="left"
                    fontWeight={'normal'}
                    color={'gray.400'}
                    noOfLines={1}
                  >
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
              </Flex>
            </Flex>
          </MenuButton>
        </Tooltip>

        <MenuList
          // maxW="80%"
          maxH="25rem"
          overflowY="auto"
          whiteSpace="pre-wrap"
          overflowWrap={'normal'}
        >
          {isCheckBoxNeeded && (
            // Array.isArray(itemIndex) &&
            // itemIndex.length > 0 &&
            <Flex
              w="100%"
              justifyContent={'flex-end'}
              px={2}
              py={1}
              align="center"
            >
              <DeselectAllButton
                handleClick={handleDeleteAllClick}
                isDisabled={!(Array.isArray(itemIndex) && itemIndex.length > 0)}
              />
            </Flex>
          )}
          <MenuOptionGroup>
            {hydrated &&
              data?.map((item: ArrayProps, index: number) => (
                <Tooltip
                  key={index}
                  hasArrow
                  placement="right"
                  label={isBloomLevel ? item.description : null} // Tooltip text
                  aria-label={`Tooltip for ${item.name || item.title}`}
                  //ml="1px"
                  bg="gray.200"
                  color="primary"
                  p={2}
                  fontSize={'sm'}
                  borderRadius={5}
                  isDisabled={!isBloomLevel}
                >
                  <Flex p={0.5}>
                    <MenuItem
                      onClick={
                        !isCheckBoxNeeded
                          ? () => handleMenuItemClick(item, index)
                          : undefined
                      }
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
                      <Flex direction={'row'} w="100%">
                        <Text flex="1" pr={5}>{item.name || item.title}</Text>
                        {isCheckBoxNeeded && (
                          <Flex justify={'flex-end'}>
                            <Checkbox
                              key={index}
                              value={item.name || item.title}
                              colorScheme="yellow"
                              onChange={() => handleMenuItemClick(item, index)}
                              isChecked={
                                Array.isArray(itemIndex)
                                  ? itemIndex.includes(index)
                                  : itemIndex === index
                              }
                            />
                          </Flex>
                        )}
                      </Flex>
                    </MenuItem>
                  </Flex>
                </Tooltip>
              ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}
