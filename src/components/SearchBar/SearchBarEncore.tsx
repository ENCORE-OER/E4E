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
  //inputValueIds?: number[];
  //setInputValueIds?: Dispatch<SetStateAction<number[]>>;
  placeholder?: string;
  items?: OerSkillInfo[]; // suggested skills
  px?: SpaceProps['px'];
  py?: SpaceProps['py'];
  pb?: SpacerProps['pb'];
  onSearchCallback: () => Promise<void>;
};

/*type SkillsSelectedProps = {
  id: number;
  label: string;
};*/

/* For multi selected tag see https://github.com/anubra266/choc-autocomplete#multi-select-with-tags */

export default function SearchBarEncore({
  inputValue,
  setInputValue,
  //inputValueIds,
  //setInputValueIds,
  placeholder,
  //items,
  px, // padding orizonal
  py, //padding vertical
  pb, // padding bottom
  onSearchCallback,
}: SearchBarProps) {
  /*const [keywordsSelected, setKeywordsSelected] = useState<string[]>(
    []
  );*/

  // TODO: check if this is essential
  const [freeText, setFreeText] = useState<string>('');

  useEffect(() => {
    console.log('INPUT VALUE: ' + inputValue);
  }, [inputValue]);

  /*useEffect(() => {
    console.log('SELECTED SKILL IDs: ' + inputValueIds);
  }, [inputValueIds]);*/

  useEffect(() => {
    setInputValue([]);
  }, []);

  return (
    <Flex align="center" px={px} py={py} pb={pb} gap="10px">
      <AutoComplete
        //openOnFocus

        // this logic is crucial, because using only this one without AutoCompleteItem could create empty tag
        // we are using both 'creatable' and 'AutoCompleteItem' because the second one doesn't create tag if there are spaces at the end of the keywords
        creatable={freeText !== '' && /\S/.test(freeText) ? true : false}
        multiple
        //value={inputValue}
        onSelectOption={(e) => {
          const selectedValue = e.item
            ? e.item.value.trim().replace(/\s+/g, ' ')
            : freeText;
          /*const selectedValueId = items?.find(
            (item: OerSkillInfo) => item.label === selectedValue
          )?.id;*/

          if (selectedValue.trim() !== '' && /\S/.test(selectedValue)) {
            // '/\S/.test(selectedValue)' to avoid empty string
            console.log('SELECTED VALUE: ' + selectedValue);

            setInputValue((prev) => [...new Set([...prev, selectedValue])]);
            //setKeywordsSelected((prev) => [...new Set([...prev, selectedValue])]);
            setFreeText('');

            /*setInputValue((prev) => {
              const updatedValues = prev.filter(
                // to avoid duplicate
                (value: string) => value !== selectedValue
              );
              return [...updatedValues, selectedValue];
            });

            setFreeText('');*/

            /*setKeywordsSelected((prev) => {
              const isKeywordSelected = prev?.includes(selectedValue);
              if (!isKeywordSelected) {
                return [...prev, selectedValue];
              }
              return prev;
            });*/

            // This part part with selection of skills
            /*if (selectedValueId) {
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
            }*/
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
              const currentValue = e.currentTarget.value
                .trim()
                .replace(/\s+/g, ' '); // to avoid spaces: trim() remove spaces at the beginning and at the end, replace() remove multiple spaces
              //const currentValueEdit = currentValue.replace(/\s+/g, ' ');

              //setInputValue([currentValue]);
              if (currentValue !== '' && /\S/.test(currentValue)) {
                console.log('CURRENT VALUE: ' + currentValue);
                setFreeText(currentValue); // could be useful for create AutoCompleteItem in AutoCompleteList
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const currentValue = e.currentTarget.value
                  .trim()
                  .replace(/\s+/g, ' ');

                if (currentValue !== '' && /\S/.test(currentValue)) {
                  setInputValue((prev) => [
                    ...new Set([...prev, currentValue]),
                  ]); // to avoid duplicate // Set() is more efficient than filter()
                  //setKeywordsSelected((prev) => [...new Set([...prev, currentValue])]);
                  e.currentTarget.value = '';

                  /*setInputValue((prev) => {
                    const updatedValues = prev.filter(
                      (value: string) => value !== currentValue
                    );  // to avoid duplicate
                    return [...updatedValues, currentValue];
                  });

                  e.currentTarget.value = '';

                  setKeywordsSelected((prev) => {
                    const isKeywordSelected = prev?.includes(currentValue);
                    if (!isKeywordSelected) {
                      return [...prev, currentValue];
                    }
                    return prev;
                  });*/
                }
              }
            }}
          >
            {({ tags }) =>
              tags?.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  onRemove={async () => {
                    /*const tagId = await skillsSelected?.find(
                      // items here is empty
                      (item: SkillsSelectedProps) => item.label === tag.label
                    )?.id;*/

                    setInputValue((prev) => {
                      const updatedValues = prev?.filter(
                        (value: string) => value !== tag.label
                      );
                      return updatedValues;
                    });

                    /*setInputValueIds((prev) => {
                      const updatedValueIds = prev?.filter(
                        (value: number) => value !== tagId
                      );
                      return updatedValueIds;
                    });*/

                    /*setKeywordsSelected((prev) => {
                      const keywordsRemaining = prev?.filter(
                        (item: string) => item !== tag.label
                      );
                      return keywordsRemaining;
                    });*/

                    tag.onRemove();
                  }}
                />
              ))
            }
          </AutoCompleteInput>
        </Flex>
        {freeText.length > 0 && (
          <AutoCompleteList>
            {/*items.map((item) => (
            <AutoCompleteItem
              key={item.id}
              value={item.label}
              textTransform="capitalize"
            >
              {item.label}
            </AutoCompleteItem>
          ))*/}

            {
              // could be possibile comment this part if we don't want text that appear like suggestion under the searchbar
              <AutoCompleteItem value={freeText ? freeText : ''}>
                {freeText}
              </AutoCompleteItem>
            }
          </AutoCompleteList>
        )}
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
