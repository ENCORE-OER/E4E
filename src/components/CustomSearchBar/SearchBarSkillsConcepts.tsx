import { Box, Flex, Text } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import debounce from 'lodash.debounce';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
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
  const { selectedSkillConceptTags, setSelectedSkillConceptTags, freeTextTags, setFreeTextTags } =
    useLearningPathDesignContext();
  const hydrated = useHasHydrated();
  const [inputValue, setInputValue] = useState<string>('');
  const [uniqueItems, setUniqueItems] = useState<SkillItemProps[]>([]);
  const [deleteTag, setDeleteTag] = useState<boolean>(false);
  const [filteredTags, setFilteredTags] = useState<SkillItemProps[]>(
    // selectedSkillConceptTags
    []
  );

  // Verify that the collectionIndex is valid
  const collection = collections[collectionIndex];
  // const oers = collection?.oers ?? [];
  const oers = useMemo(() => {
    return collection?.oers || [];
  }, [collection]); // useMemo helps in optimizing performance by preventing expensive computations from being executed on every render if their dependencies haven't changed.



  const handleInputChange = debounce((value: string) => {
    setInputValue(value);
  }, 100); // Only update the input every 300ms after the user stops typing

  // Handle selection of options
  const handleSelectOption = (selectedValue: string) => {
    // Normalize the selected value
    const normalizedValue = selectedValue.toLowerCase();

    // Check if the selectedValue exists from the suggestions
    const selectedItem = uniqueItems.find(
      (item: SkillItemProps) => item.label.toLowerCase() === normalizedValue
    );

    // Check if the selectedValue is already in the selectedSkillConceptTags
    const alreadySelected = selectedSkillConceptTags.some(
      (item: SkillItemProps) => item.label.toLowerCase() === normalizedValue
    );

    // If it's already selected, do nothing
    if (!alreadySelected) {
      if (selectedItem) {
        // If the selected item exists in the list, add it to the selected tags
        setSelectedSkillConceptTags((prev: SkillItemProps[]) => prev.concat(selectedItem));
      } else {
        // Create a new tag with the free text
        let newItem: SkillItemProps = { id: 0, label: selectedValue };
        let identicalID = true;

        while (identicalID) {
          newItem = {
            id: Math.floor(Math.random() * 1000000), // Generate a random numeric ID
            label: selectedValue, // Preserve the original case for the label
          };
          if (
            !selectedSkillConceptTags.some(
              (item: SkillItemProps) => item.id === newItem.id
            )
          ) {
            identicalID = false;
          }
        }

        // Add the tag to the freeTextTags array
        setFreeTextTags((prevFreeTags) => prevFreeTags.concat(newItem));
      }
    }
    setInputValue(''); // Reset the input value
  };

  // Handle removal of tags
  const handleTagsRemove = (tag: Tag) => {
    // Normalize the selected tag
    const normalizedTagLabel = tag.label.toLowerCase();

    // Update selected tags
    setSelectedSkillConceptTags((prev: SkillItemProps[]) =>
      prev.filter(
        (value: SkillItemProps) => value.label.toLowerCase() !== normalizedTagLabel
      )
    );

    // Check if the deleted tag is a freeTextTag
    if (freeTextTags.some(
      (prevTag: SkillItemProps) => prevTag.label.toLowerCase() === normalizedTagLabel
    )
    ) {
      setFreeTextTags((prevFreeTags: SkillItemProps[]) => {
        const updatedFreeTags = prevFreeTags.filter(
          (value: SkillItemProps) => value.label.toLowerCase() !== normalizedTagLabel
        );
        return updatedFreeTags;
      });
    }
    tag.onRemove();
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
          itemsMap.set(skill.label, skill); // Populate the map with the skills
        }
      });
      concepts.forEach((concept: SkillItemProps | OerConceptInfo) => {
        if (!itemsMap.has(concept.label)) {
          itemsMap.set(concept.label, concept); // Populate the map with the concepts
        }
      });
    };

    // Add skills and concepts from the selected resources or all resources
    if (resourcesIndex !== undefined && resourcesIndex.length > 0) {
      // Take skills and concepts only from the selected resources
      resourcesIndex.forEach((index: number) => {
        const oer = oers[index];
        if (oer) {
          addSkillsAndConcepts(oer.skills || [], oer.concepts || []);
        }
      });
    } else {
      // Take skill and concepts from all the resources
      oers.forEach((oer: OerInCollectionProps) => {
        addSkillsAndConcepts(oer.skills || [], oer.concepts || []);
      });
    }

    const newUniqueItems = Array.from(itemsMap.values()); // Update uniqueItems state
    setUniqueItems(newUniqueItems);

    // Remove tags not covered by the selected resources
    const validItems = new Set( // Create a map from the uniqueItems array
      newUniqueItems.map((item: SkillItemProps) => item.label)
    );

    const tempFilteredTags = selectedSkillConceptTags.filter(
      // Filter the tags from validItems and freeTextTags
      (tag: SkillItemProps) =>
        validItems.has(tag.label) ||
        freeTextTags.some(
          (freeTag: SkillItemProps) => freeTag.label === tag.label
        )
    );

    // Remove tags not covered by the selected resources
    if (tempFilteredTags.length !== selectedSkillConceptTags.length) {
      setFilteredTags(tempFilteredTags);
      setDeleteTag(true);
    }
  }, [oers, resourcesIndex, collection]);

  // Update the selectedSkillConceptTags array when a freeText concept is added
  useEffect(() => {
    if (freeTextTags.length > 0) {
      // Merge new tags without unnecessary checks
      const newTags = freeTextTags.filter(
        (freeTag) =>
          !selectedSkillConceptTags.some(
            (prevTag) => prevTag.label.toLowerCase() === freeTag.label.toLowerCase()
          )
      );

      if (newTags.length > 0) {
        setSelectedSkillConceptTags((prevTags) => prevTags.concat(newTags));
      }
    }
  }, [freeTextTags]); // Remove unnecessary `prevTags` in the `setSelectedSkillConceptTags`

  useEffect(() => {
    if (filteredTags.length < selectedSkillConceptTags.length) {
      setFilteredTags(selectedSkillConceptTags)
    }
  }, [selectedSkillConceptTags]);

  // Update the selected tag array when a Tag is deleted, or when the collection or the resources change
  useEffect(() => {
    if (deleteTag) {
      if (filteredTags.length === 0) {
        if (selectedSkillConceptTags.length > 0) {
          setSelectedSkillConceptTags([]);
        }
        if (freeTextTags.length > 0) {
          setFreeTextTags([]);
        }
      } else if (filteredTags.length < selectedSkillConceptTags.length) {
        // If some tags were removed update the selectedSkillConceptTags array
        setTimeout(() => {
          setSelectedSkillConceptTags(filteredTags);
        }, 10)
      }
      setDeleteTag(false);
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
        onChange={(e) => handleInputChange(e.item?.value)}
        creatable={
          inputValue !== '' &&
          /\S/.test(inputValue) &&
          !uniqueItems.some((item) => item.label.toLowerCase() === inputValue?.toLowerCase())
        }
        emptyState={
          <Flex align="center" justify="center" direction="column">
            <Text fontWeight="bold" fontSize={14}>
              No options found!
            </Text>
            <Text fontWeight="bold" fontSize={14}>
              Add at least one skill or concept by free text.
            </Text>
          </Flex>
        }
      >
        {hydrated && (
          <AutoCompleteInput
            variant="filled"
            placeholder="Search for keywords..."
            bg="white"
            _placeholder={{ color: 'gray.400' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            textTransform="capitalize"
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
                        textTransform="capitalize"
                      />
                    )
                ))}
          </AutoCompleteInput>
        )}
        {hydrated && (
          <AutoCompleteList
            textTransform="capitalize"
          >
            {hydrated &&
              uniqueItems.map(
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
            {inputValue?.length > 0 &&
              inputValue !== '' &&
              /\S/.test(inputValue) && (
                <AutoCompleteItem
                  value={inputValue ? inputValue : ''}
                  textTransform="capitalize"
                >
                  {inputValue}
                </AutoCompleteItem>
              )}
          </AutoCompleteList>
        )}
      </AutoComplete>
    </Box>
  );
}
