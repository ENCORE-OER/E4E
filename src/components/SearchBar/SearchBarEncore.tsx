import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, SpaceProps, SpacerProps } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
type SearchItems = any[];
type SearchBarProps = {
  inputValue: string[];
  setInputValue: Dispatch<SetStateAction<string[]>>;
  inputValueIds: number[];
  setInputValueIds: Dispatch<SetStateAction<number[]>>;
  placeholder?: string;
  items: SearchItems;
  px?: SpaceProps['px'];
  py?: SpaceProps['py'];
  pb?: SpacerProps['pb'];
  onSearchCallback: () => Promise<void>;
};
/* For multi selected tag see https://github.com/anubra266/choc-autocomplete#multi-select-with-tags */
export default function SearchBar({
  inputValue,
  setInputValue,
  inputValueIds,
  setInputValueIds,
  placeholder,
  items,
  px, // padding orizonal
  py, //padding vertical
  pb, // padding bottom
  onSearchCallback,
}: SearchBarProps) {
  type skillsSelectedProps = {
    id: number;
    label: string;
  }
  const [skillsSelected, setSkillsSelected] = useState<skillsSelectedProps[]>([]);
  useEffect(() => {
    console.log('SELECTED SKILLS: ' + inputValue);
  }, [inputValue]);
  useEffect(() => {
    console.log('SELECTED SKILL IDs: ' + inputValueIds);
  }, [inputValueIds]);
  useEffect(() => {
    skillsSelected?.map((item: any) => console.log('SELECTED SKILLS LABEL: ' + item.label));
  }, [skillsSelected]);
  return (
    <Flex align="center" px={px} py={py} pb={pb} gap="10px">
      <AutoComplete
        openOnFocus
        multiple
        //value={inputValue}
        onSelectOption={(e) => {
          const selectedValue = e.item.value;
          const selectedValueId = items?.find(
            (item: any) => item.label === selectedValue
          )?.id;
          setInputValue((prev) => {
            const updatedValues = prev.filter(
              // to avoid duplicate
              (value: string) => value !== selectedValue
            );
            return [...updatedValues, selectedValue];
          });
          setInputValueIds((prev) => {
            const updatedValueIds = prev.filter(
              (value: number) => value !== selectedValueId
            );
            return [...updatedValueIds, selectedValueId];
          });
          setSkillsSelected((prev) => {
            const newSkill: skillsSelectedProps = {
              id: selectedValueId,
              label: selectedValue,
            };
            const isSkillSelected = prev?.some(
              (item: skillsSelectedProps) => item.id === selectedValueId
            );
            if (!isSkillSelected) {
              return [...prev, newSkill];
            }
            return prev;
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
              const currentValue = e.currentTarget.value;
              setInputValue([currentValue])
            }}
          >
            {({ tags }) =>
              tags?.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  onRemove={async () => {
                    const tagId = await skillsSelected?.find(          // items here is empty
                      (item: skillsSelectedProps) => item.label === tag.label
                    )?.id;
                    setInputValue((prev) => {
                      const updatedValues = prev?.filter(
                        (value: string) => value !== tag.label
                      );
                      return updatedValues;
                    });
                    setInputValueIds((prev) => {
                      const updatedValueIds = prev?.filter(
                        (value: number) => value !== tagId
                      );
                      return updatedValueIds;
                    });
                    setSkillsSelected((prev) => {
                      const deletingSkill = prev?.filter(
                        (item: skillsSelectedProps) => item.id !== tagId
                      );
                      return deletingSkill;
                    });

                    tag.onRemove();
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
        onClick={(e) => {
          e.preventDefault();
          onSearchCallback();
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