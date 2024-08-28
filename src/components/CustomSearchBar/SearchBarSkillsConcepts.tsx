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
  const { selectedSkillConceptTags, setSelectedSkillConceptTags } =
    useLearningPathDesignContext();
  const hydrated = useHasHydrated();
  const [inputValue, setInputValue] = useState<string>('');
  const [uniqueItems, setUniqueItems] = useState<SkillItemProps[]>([]);
  const [deleteTag, setDeleteTag] = useState<boolean>(false);
  const [filteredTags, setFilteredTags] = useState<SkillItemProps[]>(
    // selectedSkillConceptTags
    []
  );
  const [freeTextTags, setFreeTextTags] = useState<SkillItemProps[]>([]); // Tags from free text

  // Verify that the collectionIndex is valid
  const collection = collections[collectionIndex];
  // const oers = collection?.oers ?? [];
  const oers = useMemo(() => {
    return collection?.oers || [];
  }, [collection]); // useMemo helps in optimizing performance by preventing expensive computations from being executed on every render if their dependencies haven't changed.

  // Handle selection of options
  const handleSelectOption = (selectedValue: string) => {
    // Update selectedSkillConceptTags array
    setSelectedSkillConceptTags((prev: SkillItemProps[]) => {
      // Check if the selectedValue exists from the suggestions
      const selectedItem = uniqueItems.find(
        (item: SkillItemProps) => item.label === selectedValue
      );
      // If the selected item exists in the list, add it to the selected tags
      if (selectedItem) {
        if (
          !prev.some((item: SkillItemProps) => item.label === selectedItem.label)
        ) {
          return [...prev, selectedItem];
        }
      } else {
        // setUniqueItems((prevItems) => [...prevItems, newItem]);
        // Check if the tag is alreay selected
        if (
          !prev.some((item: SkillItemProps) => item.label === selectedValue)
        ) {
          // If the selected item does not exist, create a new tag with the free text
          let newItem: SkillItemProps = { id: 0, label: selectedValue };
          let identicalID = true;

          // Repeat until there is a unique ID
          while (identicalID) {
            newItem = {
              id: Math.floor(Math.random() * 1000000), // Generate a random numeric ID
              label: selectedValue,
            };
            if (!prev.some((item: SkillItemProps) => item.id === newItem.id)) {
              identicalID = false;
            }
          }

          // Add the tag to the freeTextTags array
          setTimeout(() => {
            setFreeTextTags((prevFreeTags) => [...prevFreeTags, newItem]);
          }, 10)
          localStorage.setItem('freeTextTags', JSON.stringify(freeTextTags));
          // Add the new free text tag also to the selectedSkillConceptTags array
          return [...prev, newItem];
        }
      }

      return prev;
    });
    setInputValue(''); // Reset the input value
  };

  // Handle removal of tags
  const handleTagsRemove = (tag: Tag) => {
    const tagLabel = tag.label;
    setSelectedSkillConceptTags((prev: SkillItemProps[]) =>
      prev.filter((value: SkillItemProps) => value.label !== tagLabel)
    );

    // Check if the deleted tag is a freeTextTag
    if (freeTextTags.some((prevTag: SkillItemProps) => prevTag.label === tagLabel)) {
      // console.log('Tag deleted!');
      setFreeTextTags((prevFreeTags: SkillItemProps[]) => {
        const updatedFreeTags = prevFreeTags.filter(
          (value: SkillItemProps) => value.label !== tagLabel
        );
        localStorage.setItem('freeTextTags', JSON.stringify(updatedFreeTags));
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

    // const tempFilteredTags = selectedSkillConceptTags.filter(
    //   (tag: SkillItemProps) => validItems.has(tag.label)
    // );
    const tempFilteredTags = selectedSkillConceptTags.filter( // Filter the tags from validItems and freeTextTags
      (tag: SkillItemProps) => validItems.has(tag.label) || freeTextTags.some((freeTag: SkillItemProps) => freeTag.label === tag.label)
    );

    // Remove tags not covered by the selected resources
    if (tempFilteredTags.length !== selectedSkillConceptTags.length) {
      setFilteredTags(tempFilteredTags);
      setDeleteTag(true);
    }
    // setSelectedSkillConceptsTags((prev: SkillItemProps[]) => prev.filter((tag: SkillItemProps) => validItems.has(tag.label)));
  }, [oers, resourcesIndex, collection]);

  // useEffect(() => {
  //   const validItems = new Set(
  //     uniqueItems.map((item: SkillItemProps) => item.label)
  //   );

  //   // Filtra selectedSkillConceptTags in base agli uniqueItems
  //   const tempFilteredTags = selectedSkillConceptTags.filter(
  //     (tag: SkillItemProps) => validItems.has(tag.label) || 
  //     freeTextTags.some((freeTag: SkillItemProps) => freeTag.label === tag.label)
  //   );

  //   setFilteredTags(tempFilteredTags);
  // }, [uniqueItems, selectedSkillConceptTags, freeTextTags]);

  useEffect(() => {
    const savedTags = localStorage.getItem('freeTextTags');
    if (savedTags) {
      setFreeTextTags(JSON.parse(savedTags));
      // setSelectedSkillConceptTags((prevTags: SkillItemProps[]) => [...prevTags, ...JSON.parse(savedTags)]); // Puoi anche ripopolare i tag selezionati
    }
  }, []);


  useEffect(() => {
    setSelectedSkillConceptTags((prevTags: SkillItemProps[]) => {
      // Filter out the tags from freeTextTags that are not already present in prevTags
      const newTags = freeTextTags.filter((tag: SkillItemProps) =>
        !prevTags.some((prevTag: SkillItemProps) => prevTag.label === tag.label)
      );

      // If there are new tags, append them to prevTags
      if (newTags.length > 0) {
        return [...prevTags, ...newTags];
      }

      // If no new tags, return the previous tags without any changes
      return prevTags;
    });
  }, [freeTextTags]);

  // useEffect(() => {
  //   console.log("SELECTED SKILLS:", selectedSkillConceptTags);
  //   // if (filteredTags.length < selectedSkillConceptTags.length) {
  //   //   setFilteredTags(selectedSkillConceptTags)
  //   // }
  // }, [selectedSkillConceptTags]);

  useEffect(() => {
    if (deleteTag) {
      if (filteredTags.length === 0) {
        setSelectedSkillConceptTags([]);
        setFreeTextTags([]);
      } else if (filteredTags.length < selectedSkillConceptTags.length) {
        // If some tags were removed update the selectedSkillConceptTags array
        setSelectedSkillConceptTags(filteredTags);
      }
      setDeleteTag(false);
    }
  }, [deleteTag, filteredTags]);

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
        creatable={inputValue !== '' && /\S/.test(inputValue) && !uniqueItems.some(item => item.label === inputValue)} // Enable tag creation
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
                      />
                    )
                ))}
          </AutoCompleteInput>
        )}
        {hydrated && (
          <AutoCompleteList>
            {hydrated && uniqueItems.map(
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
            {inputValue.length > 0 &&
              inputValue !== '' &&
              /\S/.test(inputValue) &&
              <AutoCompleteItem
                value={inputValue ? inputValue : ''}
                textTransform="capitalize"
              >
                {inputValue}
              </AutoCompleteItem>}
          </AutoCompleteList>
        )}
      </AutoComplete>
    </Box>
  );
}