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
import { OerSkillInfo } from '../../types/encoreElements';

//type SearchItems = any[];

type SearchBarProps = {
  inputValue: string[];
  setInputValue: Dispatch<SetStateAction<string[]>>;
  inputValueIds: number[];
  setInputValueIds: Dispatch<SetStateAction<number[]>>;
  placeholder?: string;
  items: OerSkillInfo[];
  px?: SpaceProps['px'];
  py?: SpaceProps['py'];
  pb?: SpacerProps['pb'];
  onSearchCallback: () => Promise<void>;
};

type SkillsSelectedProps = {
  id: number;
  label: string;
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
  const [skillsSelected, setSkillsSelected] = useState<SkillsSelectedProps[]>(
    []
  );

  useEffect(() => {
    console.log('SELECTED SKILLS: ' + inputValue);
  }, [inputValue]);

  useEffect(() => {
    console.log('SELECTED SKILL IDs: ' + inputValueIds);
  }, [inputValueIds]);

  useEffect(() => {
    skillsSelected?.map((item: SkillsSelectedProps) =>
      console.log('SELECTED SKILLS LABEL: ' + item.label)
    );
  }, [skillsSelected]);

  return (
    <Flex align="center" px={px} py={py} pb={pb} gap="10px">
      <AutoComplete
        //openOnFocus
        multiple
        //value={inputValue}
        onSelectOption={(e) => {
          const selectedValue = e.item.value;
          const selectedValueId = items?.find(
            (item: OerSkillInfo) => item.label === selectedValue
          )?.id;

          setInputValue((prev) => {
            const updatedValues = prev.filter(
              // to avoid duplicate
              (value: string) => value !== selectedValue
            );
            return [...updatedValues, selectedValue];
          });

          if (selectedValueId) {
            setInputValueIds((prev) => {
              const updatedValueIds = prev.filter(
                (value: number) => value !== selectedValueId
              );
              return [...updatedValueIds, selectedValueId];
            });

            setSkillsSelected((prev) => {
              const newSkill: SkillsSelectedProps = {
                id: selectedValueId,
                label: selectedValue,
              };
              const isSkillSelected = prev?.some(
                (item: SkillsSelectedProps) => item.id === selectedValueId
              );
              if (!isSkillSelected) {
                return [...prev, newSkill];
              }
              return prev;
            });
          }
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
              setInputValue([currentValue]);
            }}
          >
            {({ tags }) =>
              tags?.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  onRemove={async () => {
                    const tagId = await skillsSelected?.find(
                      // items here is empty
                      (item: SkillsSelectedProps) => item.label === tag.label
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
                        (item: SkillsSelectedProps) => item.id !== tagId
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
