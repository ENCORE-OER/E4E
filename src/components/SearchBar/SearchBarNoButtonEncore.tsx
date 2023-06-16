import { SearchIcon } from '@chakra-ui/icons';
import { Flex, SpaceProps, SpacerProps } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { Dispatch, SetStateAction } from 'react';

type SearchItems = any[];

type SearchBarProps = {
  inputValue: string[];
  setInputValue: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
  px?: SpaceProps['px'];
  py?: SpaceProps['py'];
  pb?: SpacerProps['pb'];
};

/* For multi selected tag see https://github.com/anubra266/choc-autocomplete#multi-select-with-tags */

export default function SearchBar({
  inputValue,
  setInputValue,
  placeholder,
  px, // padding orizonal
  py, //padding vertical
  pb, // padding bottom
}: SearchBarProps) {
  return (
    <Flex align="center" px={px} py={py} pb={pb} gap="10px">
      <AutoComplete
        openOnFocus
        multiple
        value={inputValue}
        onSelectOption={(e) => {
          const selectedValue = e.item.value;
          //console.log('SELECTED VALUE SEARCH: ' + selectedValue);
          setInputValue((prevInputValues) => {
            const updatedValues = prevInputValues.filter(
              // to avoid duplicate
              (value: any) => value !== selectedValue
            );
            return [...updatedValues, selectedValue];
          });
        }}
      >
        <Flex align="center">
          <SearchIcon color="gray.300" mr="3" />
          <AutoCompleteInput
            variant="filled"
            placeholder={placeholder || 'Search...'}
            onChange={(e) => {
              e.preventDefault();
              //setInputValue(e.currentTarget.value);
            }}
          >
            {({ tags }) =>
              tags.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  /*onRemove={() => {
                    setInputValue((prevInputValues) => {
                      const updatedValues = prevInputValues.filter(
                        (value: any) => value !== tag.label
                      );
                      return updatedValues;
                    });
                  }}*/
                />
              ))
            }
          </AutoCompleteInput>
        </Flex>
      </AutoComplete>
    </Flex>
  );
}
