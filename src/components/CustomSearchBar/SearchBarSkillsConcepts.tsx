import { Box } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import {
  OerConceptInfo,
  OerInCollectionProps,
  OerSkillInfo,
  SkillItemProps,
} from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

interface Tag {
  label: string;
  onRemove: () => void;
}

type SearchBarV2Props = {
  collectionIndex: number;
  resourcesIndex?: number[];
  selectedTags?: string[];
  setSelectedTags?: Dispatch<SetStateAction<string[]>>;
  isHighlighted: boolean;
};

export default function SearchBarSkillsConcepts({
  collectionIndex,
  resourcesIndex,
  isHighlighted,
}: SearchBarV2Props) {
  const { collections } = useCollectionsContext();
  const { selectedSkillConceptTags, setSelectedSkillConceptTags } =
    useLearningPathDesignContext();
  const hydrated = useHasHydrated();
  const [inputValue, setInputValue] = useState<string>('');
  const [uniqueItems, setUniqueItems] = useState<SkillItemProps[]>([]);
  const [deleteTag, setDeleteTag] = useState<boolean>();
  const [filteredTags, setFilteredTags] = useState<SkillItemProps[]>(
    selectedSkillConceptTags
  );

  // Verify that the collectionIndex is valid
  const collection = collections[collectionIndex];
  // const oers = collection?.oers ?? [];
  const oers = useMemo(() => {
    return collection?.oers || [];
  }, [collection]); // useMemo helps in optimizing performance by preventing expensive computations from being executed on every render if their dependencies haven't changed.

  // Handle removal of tags
  const handleTagsRemove = (tag: Tag) => {
    const tagLabel = tag.label;
    setSelectedSkillConceptTags((prev: SkillItemProps[]) =>
      prev.filter((value: SkillItemProps) => value.label !== tagLabel)
    );
    console.log('Tag deleted!');
    tag.onRemove();
  };

  // Handle selection of options
  const handleSelectOption = (selectedValue: string) => {
    setSelectedSkillConceptTags((prev: SkillItemProps[]) => {
      const selectedItem = uniqueItems.find(
        (item: SkillItemProps) => item.label === selectedValue
      );
      if (
        selectedItem &&
        !prev.some((item: SkillItemProps) => item.label === selectedItem.label)
      ) {
        return [...prev, selectedItem];
      }
      return prev;
    });
    setInputValue(''); // Reset the input value
  };

  useEffect(() => {
    if (!collection) return;

    const itemsMap = new Map<string, SkillItemProps>(); // Use a Map to ensure unique labels

    // Function to add skills and concepts to the Map
    const addSkillsAndConcepts = (
      skills: SkillItemProps[] | OerSkillInfo[],
      concepts: SkillItemProps[] | OerConceptInfo[]
    ) => {
      skills.forEach((skill: SkillItemProps | OerSkillInfo) => {
        if (!itemsMap.has(skill.label)) {
          itemsMap.set(skill.label, skill);
        }
      });
      concepts.forEach((concept: SkillItemProps | OerConceptInfo) => {
        if (!itemsMap.has(concept.label)) {
          itemsMap.set(concept.label, concept);
        }
      });
    };

    // Add skills and concepts from the selected resources or all resources
    if (resourcesIndex !== undefined && resourcesIndex.length > 0) {
      resourcesIndex.forEach((index: number) => {
        const oer = oers[index];
        if (oer) {
          addSkillsAndConcepts(oer.skills || [], oer.concepts || []);
        }
      });
    } else {
      oers.forEach((oer: OerInCollectionProps) => {
        addSkillsAndConcepts(oer.skills || [], oer.concepts || []);
      });
    }

    const newUniqueItems = Array.from(itemsMap.values()); // Update uniqueItems state
    setUniqueItems(newUniqueItems);

    // Remove tags not covered by the selected resources
    const validItems = new Set(
      newUniqueItems.map((item: SkillItemProps) => item.label)
    );
    const tempFilteredTags = selectedSkillConceptTags.filter(
      (tag: SkillItemProps) => validItems.has(tag.label)
    );
    // const tagsToRemove = selectedSkillConceptsTags.filter((tag: SkillItemProps) => !validItems.has(tag.label));

    // Remove tags not covered by the selected resources
    if (tempFilteredTags.length !== selectedSkillConceptTags.length) {
      setFilteredTags(tempFilteredTags);
      setDeleteTag(true);
    }
    // setSelectedSkillConceptsTags((prev: SkillItemProps[]) => prev.filter((tag: SkillItemProps) => validItems.has(tag.label)));
  }, [oers, resourcesIndex, collection]);

  useEffect(() => {
    if (deleteTag) {
      if (filteredTags.length === 0) {
        setSelectedSkillConceptTags([]);
      } else if (filteredTags.length < selectedSkillConceptTags.length) {
        setSelectedSkillConceptTags(filteredTags);
        setDeleteTag(false);
      }
    }
  }, [deleteTag]);

  if (!collection || !collection.oers) {
    return null; // Ensure the collection is valid
  }

  return (
    <Box
      border={
        isHighlighted && selectedSkillConceptTags.length === 0
          ? '2.5px solid #bf5521ff'
          : '1px solid #CED4DA'
      }
      borderRadius={'lg'}
    >
      <AutoComplete
        openOnFocus
        multiple
        defaultValues={
          selectedSkillConceptTags?.map((item: SkillItemProps) => item.label) ??
          []
        }
        onSelectOption={(e) => handleSelectOption(e.item.value)}
      >
        {hydrated && (
          <AutoCompleteInput
            variant="filled"
            placeholder="Search for keywords..."
            bg="white"
            _placeholder={{ color: 'gray.400' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          >
            {hydrated &&
              (({ tags }) =>
                tags.map(
                  (tag, tid) =>
                    selectedSkillConceptTags?.some(
                      (item: SkillItemProps) => item.label === tag.label
                    ) && (
                      <AutoCompleteTag
                        key={tid}
                        label={tag.label}
                        onRemove={() => handleTagsRemove(tag)}
                      />
                    )
                ))}
          </AutoCompleteInput>
        )}
        {hydrated && (
          <AutoCompleteList>
            {uniqueItems.map(
              (uniqueItem: SkillItemProps) =>
                !selectedSkillConceptTags?.some(
                  (item: SkillItemProps) => item.label === uniqueItem.label
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
        )}
      </AutoComplete>
    </Box>
  );
}
