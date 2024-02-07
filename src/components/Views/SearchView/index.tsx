import { Box, HStack, Text, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import icon_infocircle from '../../../public/Icons/icon_infocircle.svg';
import SearchBarEncore from '../../SearchBar/SearchBarEncore';

type SearchViewProps = {
  searchValue: string[];
  setSearchValue: Dispatch<SetStateAction<string[]>>;
  suggestions: string[] | undefined;
  searchCallback1: () => Promise<void>;
};

export default function SearchView({
  searchValue,
  setSearchValue,
  suggestions,
  searchCallback1,
}: SearchViewProps) {
  return (
    <Box w="full" minW="400px">
      <HStack>
        <Text variant="label" my="6px">
          Keywords
        </Text>
        <Tooltip
          hasArrow
          placement="top"
          label="Keywords. Search resources in Green, Digital and Entrepreneurial skills from ENCORE OERs database."
          aria-label="Search resources in Green, Digital and Entrepreneurial skills from ENCORE OERs database."
          ml="1px"
          bg="white"
          color="primary"
          p={2}
        >
          <span>
            {' '}
            {/*use span element to fix problem of communication between Tooltip element and svg image*/}
            <Image src={icon_infocircle} alt="infocircle" />
          </span>
        </Tooltip>
      </HStack>

      <SearchBarEncore
        inputValue={searchValue}
        setInputValue={setSearchValue}
        //inputValueIds={selectedSkillIds}
        //setInputValueIds={setSelectedSkillIds}
        items={suggestions}
        onSearchCallback={searchCallback1}
        placeholder="Search resources"
      />
    </Box>
  );
}
