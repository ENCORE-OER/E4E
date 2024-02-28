import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SegmentedButton from '../Buttons/ButtonsDesignPage/SegmentedButton';
//import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import { useHasHydrated } from '../../utils/utils';

type Option = {
  title: string;
  description?: string;
};

type SegmentedButtonProps = {
  onOptionsChange: (areComplete: boolean) => void;
  isNextButtonClicked: boolean;
  isSmallerScreen?: boolean;
  resetAll?: boolean;
  handleResetAll?: (value: boolean) => void;
};
export default function SegmentedButtonGroup({
  onOptionsChange,
  isNextButtonClicked,
  isSmallerScreen,
  resetAll,
  handleResetAll,
}: SegmentedButtonProps) {
  const {
    handleContextChange,
    handleEducatorExperienceChange,
    handleGroupDimensionChange,
    handleLearnerExperienceChange,
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience,
  } = useLearningPathDesignContext();

  const hydrated = useHasHydrated();

  const YourExperience: Option[] = [
    { title: 'Junior' },
    { title: 'Advanced' },
    { title: 'Senior' },
  ];

  const Context: Option[] = [
    { title: 'School' },
    { title: 'VET' },
    { title: 'University' },
  ];

  const GroupDimension: Option[] = [
    { title: 'Small', description: '(~150 People)' },
    { title: 'Medium', description: '(~250 People)' },
    { title: 'Large', description: '(~350 People)' },
  ];

  const LeanerExperience: Option[] = [
    { title: 'Initial' },
    { title: 'Advanced' },
    { title: 'Experienced' },
  ];

  const [highlightedOptions, setHighlightedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (isNextButtonClicked) {
      // Check the options and update the state of the options to be highlighted with the red color
      const optionsToHighlight: string[] = [];

      if (
        !selectedEducatorExperience ||
        optionsToHighlight.includes('YourExperience')
      ) {
        optionsToHighlight.push('YourExperience');
      }

      if (!selectedContext || optionsToHighlight.includes('Context')) {
        optionsToHighlight.push('Context');
      }

      if (
        !selectedGroupDimension ||
        optionsToHighlight.includes('GroupDimension')
      ) {
        optionsToHighlight.push('GroupDimension');
      }

      if (
        !selectedLearnerExperience ||
        optionsToHighlight.includes('LeanerExperience')
      ) {
        optionsToHighlight.push('LeanerExperience');
      }

      setHighlightedOptions(optionsToHighlight);
    }
  }, [
    isNextButtonClicked,
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience,
  ]);

  useEffect(() => {
    console.log('Triggering resetAll in SegmentedButtonGroup: ', resetAll);
    if (resetAll && handleResetAll) {
      setHighlightedOptions([]);
      handleResetAll(false);
    }
  }, [resetAll]);

  useEffect(() => {
    console.log('successo qualcosa: ', highlightedOptions);
  }, [highlightedOptions]);

  useEffect(() => {
    // Update the state of the highlighted options when isNextButtonClicked changes
    if (!isNextButtonClicked) {
      setHighlightedOptions([]);
    }
  }, [isNextButtonClicked]);

  useEffect(() => {
    const areComplete: boolean =
      !!selectedEducatorExperience &&
      !!selectedContext &&
      !!selectedGroupDimension &&
      !!selectedLearnerExperience;

    onOptionsChange(areComplete);
    console.log('areComplete: ' + areComplete);
  }, [
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience,
    onOptionsChange,
  ]);

  return (
    <>
      {hydrated && (
        <>
          <Flex w="100%">
            <Box w="50%" px="1.5rem">
              <Text as="b">Your experience</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={YourExperience}
                  selected={selectedEducatorExperience}
                  onChange={handleEducatorExperienceChange}
                  preselectedTitle={selectedEducatorExperience?.title}
                  isHighlighted={highlightedOptions.includes('YourExperience')}
                  isSmallerScreen={isSmallerScreen}
                />
              </Box>
            </Box>
            <Box w="50%" px="1.5rem">
              <Text as="b">Educational context</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={Context}
                  selected={selectedContext}
                  onChange={handleContextChange}
                  preselectedTitle={selectedContext?.title}
                  isHighlighted={highlightedOptions.includes('Context')}
                  isSmallerScreen={isSmallerScreen}
                />
              </Box>
            </Box>
          </Flex>

          <Flex w="100%" paddingTop="1.5rem">
            <Box w="50%" px="1.5rem">
              <Text as="b">Leaner{"'"}s group dimension</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={GroupDimension}
                  selected={selectedGroupDimension}
                  onChange={handleGroupDimensionChange}
                  preselectedTitle={selectedGroupDimension?.title}
                  isHighlighted={highlightedOptions.includes('GroupDimension')}
                  isSmallerScreen={isSmallerScreen}
                />
              </Box>
            </Box>
            <Box w="50%" px="1.5rem">
              <Text as="b">Leaner{"'"}s experience</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={LeanerExperience}
                  selected={selectedLearnerExperience}
                  onChange={handleLearnerExperienceChange}
                  preselectedTitle={selectedLearnerExperience?.title}
                  isHighlighted={highlightedOptions.includes(
                    'LeanerExperience'
                  )}
                  isSmallerScreen={isSmallerScreen}
                />
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
