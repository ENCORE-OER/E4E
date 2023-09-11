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
import {
  OerAudienceInfo,
  OerDomainInfo,
  OerMediaTypeInfo,
  OerSubjectInfo,
} from '../../types/encoreElements';
import DropDownMenuItem, {
  optionsObjType,
} from '../DropDownMenuItem/DropDownMenuItem';

export type onDataType =
  | number
  | string
  | OerAudienceInfo
  | OerMediaTypeInfo
  | OerDomainInfo
  | OerSubjectInfo;

type DropDownMenuProps = {
  options?: string[] | undefined;
  optionsObj?: optionsObjType[] | undefined;
  onData?: (data: string[] | number[]) => void;
};

export default function DropDownMenu({
  options,
  optionsObj,
  onData,
}: DropDownMenuProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false); // for the open Menu

  const handleData = () => {
    if (onData) {
      if (optionsObj) {
        onData(selectedOptionIds);
      } else {
        onData(selectedOptions);
      }
    }
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  useEffect(() => {
    handleData();
  }, [selectedOptions, selectedOptionIds]);

  // pusho tutti i name di optionsObj in options
  useEffect(() => {
    optionsObj?.map((item: optionsObjType) => {
      options?.push(item.name);
    });
    console.log('OPTIONS in DropDownMenu: ' + options);
  }, [optionsObj, options]);
  return (
    <>
      <Box flex="1">
        <Menu
          isOpen={isOpen}
          onOpen={handleToggleMenu}
          onClose={handleToggleMenu}
        >
          <MenuButton
            as={Button}
            variant="dropdown"
            rightIcon={<ChevronDownIcon />}
            //w={buttonWidth}
            w="100%"
          >
            {/* Could also use <Text align="left" overflow="hidden" whiteSpace="nowrap"> */}
            <Text align="left" noOfLines={1}>
              {selectedOptions.includes('All') &&
                (options?.length === selectedOptions.length ||
                  optionsObj?.length === selectedOptions.length)
                ? 'All'
                : selectedOptions.length > 0
                  ? selectedOptions.join(', ')
                  : 'Select Options'}
            </Text>
          </MenuButton>
          <MenuList
            maxH="15rem"
            maxW="100px"
            overflowY="auto"
            whiteSpace="pre-wrap"
            overflowWrap={'normal'}
          >
            {/*options?.map((option) => (
              <MenuItem key={option}>
                <DropDownMenuItem
                  item={option}
                  options={options}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  setSelectedOptionIds={setSelectedOptionIds}
                />
              </MenuItem>
            ))*/}
            {optionsObj?.map((option) => (
              <MenuItem key={option.id}>
                <DropDownMenuItem
                  idItem={option.id}
                  item={option.name}
                  optionsObj={optionsObj}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  selectedOptionIds={selectedOptionIds}
                  setSelectedOptionIds={setSelectedOptionIds}
                />
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
