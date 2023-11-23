import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';
import { useHasHydrated } from '../../utils/utils';
import { OerInCollectionProps } from '../../types/encoreElements';
import { Box } from '@chakra-ui/react';

interface Tag {
  label: string;
  onRemove: () => void;
}

type SearchBarV2Props = {
  collectionIndex: number;
  selectedTags?: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};
export default function SearchBarPathDesign({
  collectionIndex,
  setSelectedTags,
}: SearchBarV2Props) {
  const { collections } = useCollectionsContext();
  const hydrated = useHasHydrated();
  const [inputValue, setInputValue] = useState<string[]>([]);

  // verify that the collectionIndex is valid
  const collection = collections[collectionIndex];

  if (!collection || !collection.oers) {
    return null; // control that the collection is valid
  }

  const oers = collection.oers ?? [];
  //console.log(oers);

  const handleTagsRemove = async (tag: Tag) => {
    const tagLabel = tag.label;

    setSelectedTags((prev: string[]) => {
      return prev.filter((value: string) => value !== tagLabel);
    });
    tag.onRemove();
  };

  const renderSkillAndConceptItems = () => {
    const uniqueItems = new Set(); // Utilizza un Set per evitare duplicati

    hydrated &&
      oers?.forEach((oer: OerInCollectionProps) => {
        oer?.skills?.forEach((skill) => {
          const skillLabel = skill.label;
          uniqueItems.add(skillLabel);
        });

        oer?.concepts?.forEach((concept) => {
          const conceptLabel = concept.label;
          uniqueItems.add(conceptLabel);
        });
      });

    return (
      <AutoCompleteList>
        {[...uniqueItems].map((item) => (
          <AutoCompleteItem
            key={`item-${item}`}
            value={item}
            textTransform="capitalize"
          >
            {item}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    );
  };

  return (
    <Box
      border="1px" 
      borderColor={'#CED4DA'} 
      borderRadius={'7px'}
    >
      <AutoComplete
        openOnFocus
        multiple
        onSelectOption={(e) => {
          const selectedValue = e.item.value;

          setSelectedTags((prev: string[]) => {
            const updatedValues = prev.filter(
              // to avoid duplicate
              (value: string) => value !== selectedValue
            );
            return [...updatedValues, selectedValue];
          });
          setInputValue([]); // Reset the input value
        }}
      >
        <AutoCompleteInput
          variant="filled"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => {
            e.preventDefault();
            const currentValue = e.currentTarget.value;
            setInputValue([currentValue]); // Imposta il valore di inputValue con il nuovo valore
          }}
        >
          {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.label}
                onRemove={() => handleTagsRemove(tag)}
              />
            ))
          }
        </AutoCompleteInput>
        {renderSkillAndConceptItems()}
      </AutoComplete>
    </Box>
  );
}
