import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, SpaceProps, SpacerProps } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { Dispatch, SetStateAction, useEffect } from 'react';

type SearchItems = any[];

type SearchBarProps = {
  inputValue: string[];
  setInputValue: Dispatch<SetStateAction<string[]>>;
  inputValueIds: any[];
  setInputValueIds: Dispatch<SetStateAction<any[]>>;
  placeholder?: string;
  items: SearchItems;
  domainIds: any[];
  px?: SpaceProps['px'];
  py?: SpaceProps['py'];
  pb?: SpacerProps['pb'];
  onSearchCallback: (domainIds: any[]) => Promise<void>;
};

/* For multi selected tag see https://github.com/anubra266/choc-autocomplete#multi-select-with-tags */

export default function SearchBar({
  inputValue,
  setInputValue,
  inputValueIds,
  setInputValueIds,
  placeholder,
  items,
  domainIds,
  px, // padding orizonal
  py, //padding vertical
  pb, // padding bottom
  onSearchCallback,
}: SearchBarProps) {
  useEffect(() => {
    console.log('SELECTED SKILLS: ' + inputValue);
  }, [inputValue]);

  useEffect(() => {
    console.log('SELECTED SKILL IDs: ' + inputValueIds);
  }, [inputValueIds]);

  return (
    <Flex align="center" px={px} py={py} pb={pb} gap="10px">
      <AutoComplete
        openOnFocus
        multiple
        //value={inputValue}
        onSelectOption={(e) => {
          const selectedValue = e.item.value;
          const selectedValueId = items.find(
            (item: any) => item.label === selectedValue
          ).id;

          setInputValue((prevInputValues) => {
            const updatedValues = prevInputValues.filter(
              // to avoid duplicate
              (value: any) => value !== selectedValue
            );
            return [...updatedValues, selectedValue];
          });
          setInputValueIds((prev) => {
            const updatedValueIds = prev.filter(
              (value: any) => value !== selectedValueId
            );

            return [...updatedValueIds, selectedValueId];
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
              setInputValue([e.currentTarget.value]);
            }}
          >
            {({ tags }) =>
              tags.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  onRemove={() => {
                    const tagId = items.find(
                      (item: any) => item.label === tag.label
                    ).id;
                    setInputValue((prevInputValues) => {
                      const updatedValues = prevInputValues.filter(
                        (value: any) => value !== tag.label
                      );
                      return updatedValues;
                    });
                    setInputValueIds((prev) => {
                      const updatedValueIds = prev.filter(
                        (value: any) => value !== tagId
                      );
                      return updatedValueIds;
                    });
                    /*tag.onRemove;*/
                  }}
                />
              ))
            }
          </AutoCompleteInput>

        </Flex>
        <AutoCompleteList>
          {items.map((item) => (
            <AutoCompleteItem
              key={item.id}
              value={item.label}
              textTransform="capitalize"
            >
              {item.label}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      <div
        onClick={() => {
          onSearchCallback(domainIds);

        }}
      >
        {/*<Link href="/discover">*/}
        <Button
          aria-label="Search database"
          //ml="1"
          variant="primary"
          //onClick={() => {}}
          _hover={{
            bg: 'primary',
            color: 'white',
          }}
        >
          Search
        </Button>
        {/*</Link>*/}
      </div>
    </Flex>
  );
}
