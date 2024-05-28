import {
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { ArrayProps, MultipleArrayProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import DeselectAllButton from '../Buttons/ButtonsDesignPage/DeselectAllButton';

export type onDataType = number | string;

type MultipleDataDropDownMenuProps = {
  multipleData: MultipleArrayProps[]; // data array to scroll through the menu
  // options?: string[] | undefined;
  onData?: (data?: string[] | number[]) => void;
  onSelectionChange?: (
    selectedBloomActiviesIndex: number,
    selectedActivityIndex: number,
    event?: any
  ) => void;
  isHighlighted?: boolean;
  isBloomLevel?: boolean;
  itemIndex: number[][];
  defaultMenuTitle: string;
  isYellowOnFocus?: boolean;
  isCheckBoxNeeded?: boolean;
};

export default function MultipleDataDropDownMenu({
  multipleData, // use this to populate the menu
  // options,
  // onData,
  onSelectionChange,
  isHighlighted,
  // isBloomLevel,
  isYellowOnFocus,
  itemIndex,
  defaultMenuTitle,
  isCheckBoxNeeded,
}: MultipleDataDropDownMenuProps) {
  const [menuTitle, setMenuTitle] = useState<string | undefined>(
    defaultMenuTitle
  );
  const [isOpen, setIsOpen] = useState(false); // for the open Menu
  const hydrated = useHasHydrated();

  useEffect(() => {
    if (itemIndex.length === 0) {
      // Reset menu title if there aren't resources selected
      setMenuTitle(defaultMenuTitle);
    } else {
      // Sum all the name of the selected resources
      const longTitle = itemIndex
        .flatMap((indexArray: number[], i: number) =>
          indexArray.map(
            (index: number) =>
              multipleData[i]?.activities[index]?.name || defaultMenuTitle
          )
        )
        .join(', ');
      setMenuTitle(longTitle);
    }
  }, [itemIndex, multipleData, defaultMenuTitle]);

  // const handleData = () => {
  //   if (onData) {
  //     // onData(selectedOptions);
  //     onData()
  //   }
  // };
  const handleMenuItemClick = (
    data: MultipleArrayProps,
    indexData: number,
    selectedItemIndex: number
  ) => {
    //setSelectedItem(item.name);
    if (onSelectionChange) {
      onSelectionChange(indexData, selectedItemIndex);
      // handleData();
    }
    setMenuTitle(data.activities[selectedItemIndex].name || defaultMenuTitle);
    // handleToggleMenu(); // Chiudi il menu dopo la selezione, se necessario
    if (!isCheckBoxNeeded) {
      setIsOpen(false);
    }

    //TODO: fix this, the problem is that idk how to delete the tags without refreshing the page => FIXED: use .clear() method
    // if (!isBloomLevel && selectedSkillConceptsTags.length > 0) {
    //   // Refresha la pagina
    //   window.location.reload();
    // }
  };

  const handleDeleteAllClick = () => {
    if (onSelectionChange) {
      onSelectionChange(-1, -1);
    }

    setMenuTitle(defaultMenuTitle);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  const handleHighlight = () => {
    // If the index is -1, it means that the item is not selected
    const isHighlighted = itemIndex.map((items: number[]) =>
      items.length > 0 ? false : true
    );
    if (isHighlighted.includes(true)) {
      return true;
    }
    // return itemIndex.length > 0 ? false : true;
  };

  // useEffect(() => {
  //   handleData();
  //   // console.log(bloomLevelIndex);
  //   // console.log(collectionIndex);1
  // }, [selectedOptions]);

  useEffect(() => {
    multipleData.flatMap((data) =>
      data.activities.map((item) => {
        console.log('multipleData:', item.name);
      })
    );
  }, [multipleData]);

  return (
    <Flex
      flex="1"
      border={
        isHighlighted && handleHighlight()
          ? '1.5px solid #bf5521ff'
          : '1px solid #CED4DA'
      }
      borderRadius="lg"
    >
      <Menu
        isOpen={isOpen}
        // onOpen={handleToggleMenu}
        onClose={handleToggleMenu}
        closeOnSelect={!isCheckBoxNeeded}
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
          // title={menuTitle}
          bg={'white'}
          _expanded={isYellowOnFocus ? { bg: 'yellow.300' } : undefined}
          //aria-expanded={isOpen ? 'true' : 'false'}
          onClick={handleToggleMenu}
        // isDisabled={true}
        >
          <Flex direction="row" w="100%" align="center" gap={3}>
            <Flex
              // flex="1"
              w="100%"
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

            {/* TODO: Implementation of X button inside the MENU to deselect all the options selected before. */}
            {/* PROBLEM: It's not possible to e.stopPropagation() to menu button */}
            {/* {!isOpen &&
                isCheckBoxNeeded &&
                Array.isArray(itemIndex) &&
                itemIndex.length > 0 &&
                (
                  <Flex justify={'flex-end'}>
                    <Button
                      // position='absolute'
                      // right={0}
  
                      bg='none'
                      _hover={{ backgroundColor: 'blue.300' }}
                      w='fit-content'
                      p={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAllClick();
                      }}
                    >
                      <CloseIcon
                        fontSize='small'
                      // as="button"
                      // bg='none'
                      // _hover={{ backgroundColor: 'gray.300' }}
                      // w='fit-content'
                      // p={0}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleDeleteAllClick();
                      // }}
                      />
                    </Button>
                  </Flex>
                )
              } */}
          </Flex>
        </MenuButton>

        <MenuList
          maxH="25rem"
          overflowY="auto"
        // whiteSpace="pre-wrap"
        // overflowWrap={'normal'}
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
                isDisabled={itemIndex.length === 0}
              />
            </Flex>
          )}
          {hydrated &&
            multipleData?.map((data: MultipleArrayProps, indexData: number) => (
              <MenuOptionGroup key={indexData} w="fit-content">
                <Text fontWeight="bold" py={2} px={5} bg="accent.900">
                  {data.title}
                </Text>
                {hydrated &&
                  data?.activities?.map(
                    (activity: ArrayProps, index: number) => (
                      <Flex p={0.5} key={index}>
                        <MenuItem
                          onClick={
                            !isCheckBoxNeeded
                              ? () =>
                                handleMenuItemClick(data, indexData, index)
                              : undefined
                          }
                          bg={
                            itemIndex[indexData]?.includes(index)
                              ? 'accent.200'
                              : undefined
                          }
                          borderRadius={5}
                        >
                          <Flex direction={'row'} w="100%">
                            <Text flex="1">{activity.name}</Text>
                            {isCheckBoxNeeded && (
                              <Flex flex="1" justify={'flex-end'}>
                                <Checkbox
                                  key={index}
                                  value={activity.name || activity.title}
                                  colorScheme="yellow"
                                  onChange={() =>
                                    handleMenuItemClick(data, indexData, index)
                                  }
                                  isChecked={
                                    itemIndex[indexData]?.includes(index) ||
                                    false
                                  }
                                />
                              </Flex>
                            )}
                          </Flex>
                        </MenuItem>
                      </Flex>
                    )
                  )}
              </MenuOptionGroup>
            ))}
          ;
        </MenuList>
      </Menu>
    </Flex>
  );
}
