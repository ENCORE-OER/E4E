import { Box } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import {
  OerInCollectionProps,
  SkillItemProps,
} from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

interface Tag {
  label: string;
  onRemove: () => void;
}

type SearchBarV2Props = {
  collectionIndex: number;
  selectedTags?: string[];
  setSelectedTags?: Dispatch<SetStateAction<string[]>>;
  isHighlighted: boolean;
};
export default function SearchBarPathDesign({
  collectionIndex,
  isHighlighted,
}: SearchBarV2Props) {
  const { collections } = useCollectionsContext();
  const { selectedSkillConceptsTags, handleSkillsChange } =
    useLearningPathDesignContext();
  const hydrated = useHasHydrated();
  const [inputValue, setInputValue] = useState<string[]>([]);
  const uniqueItems = new Set<SkillItemProps>(); // Utilizza un Set per evitare duplicati

  // verify that the collectionIndex is valid
  const collection = collections[collectionIndex];

  const oers = collection.oers ?? [];
  //console.log(oers);

  const handleTagsRemove = async (tag: Tag) => {
    const tagLabel = tag.label;

    handleSkillsChange((prev: SkillItemProps[]) => {
      return prev.filter((value: SkillItemProps) => value.label !== tagLabel);
    });
    tag.onRemove();
  };

  const renderSkillAndConceptItems = () => {
    hydrated &&
      oers?.forEach((oer: OerInCollectionProps) => {
        oer?.skills?.forEach((skill) => {
          const skillId = skill.id;
          const skillLabel = skill.label;
          uniqueItems.add({ id: skillId, label: skillLabel });
        });

        oer?.concepts?.forEach((concept) => {
          const conceptId = concept.id;
          const conceptLabel = concept.label;
          uniqueItems.add({ id: conceptId, label: conceptLabel });
        });
      });

    return (
      <AutoCompleteList>
        {[...uniqueItems].map(
          (uniqueItem: SkillItemProps) =>
            !selectedSkillConceptsTags?.some(
              (item: SkillItemProps) => item.id === uniqueItem.id
            ) && (
              <AutoCompleteItem
                key={`item-${uniqueItem.id}`}
                value={uniqueItem.label}
                textTransform="capitalize"
              >
                {uniqueItem.label}
              </AutoCompleteItem>
            )
        )}
      </AutoCompleteList>
    );
  };

  useEffect(() => {
    // Remove the selected tags when the collectionIndex changes and the selectedSkillConceptTags is empty
    setInputValue([]);
  }, [collectionIndex]);

  useEffect(() => {
    if (selectedSkillConceptsTags && uniqueItems) {
      renderSkillAndConceptItems();
    }
  }, [selectedSkillConceptsTags, uniqueItems]);

  if (!collection || !collection.oers) {
    return null; // control that the collection is valid
  }

  return (
    <Box
      border={
        isHighlighted && selectedSkillConceptsTags.length === 0
          ? '1.5px solid #bf5521ff'
          : '1px solid #CED4DA'
      }
      borderRadius={'lg'}
    >
      <AutoComplete
        openOnFocus
        multiple
        // defaultValues={selectedSkillConceptsTags}
        defaultValues={
          selectedSkillConceptsTags?.map(
            (item: SkillItemProps) => item.label
          ) ?? []
        }
        onSelectOption={(e) => {
          const selectedValue = e.item.value;
          //console.log(selectedValue);

          handleSkillsChange((prev: SkillItemProps[]) => {
            // const updatedValues = prev.filter(
            //   // to avoid duplicate
            //   (value: SkillItemProps) => value.label !== selectedValue
            // );
            // return [...updatedValues, selectedValue];
            const selectedItem = [...uniqueItems].find(
              (item) => item.label === selectedValue
            );
            const isAlreadySelected = prev.some(
              (item) => item === selectedItem
            );

            if (selectedItem && !isAlreadySelected) {
              return [...prev, selectedItem];
            }

            return prev;
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
            console.log(currentValue);
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
