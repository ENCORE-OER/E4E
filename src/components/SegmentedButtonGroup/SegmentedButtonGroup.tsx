import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SegmentedButton from '../Buttons/ButtonsDesignPage/SegmentedButton';
//import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
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
    SPACING,
    handleEducationalContextChange,
    handleEducatorExperienceChange,
    handleGroupDimensionChange,
    handleLearnerExperienceChange,
    selectedEducatorExperience,
    selectedEducationalContext,
    selectedGroupDimension,
    selectedLearnerExperience,
  } = useLearningPathDesignContext();

  const hydrated = useHasHydrated();

  const YourExperience: Option[] = [
    { title: 'Junior' },
    { title: 'Intermediate' },
    { title: 'Senior' },
  ];

  const EducationalContext: Option[] = [
    { title: 'School' },
    { title: 'Vocational' },
    { title: 'University' },
  ];

  const GroupDimension: Option[] = [
    { title: 'Small', description: '(<10 People)' },
    { title: 'Medium', description: '(11-50 People)' },
    { title: 'Large', description: '(>50 People)' },
  ];

  const LearnerExperience: Option[] = [
    { title: 'Beginner' },
    { title: 'Intermediate' },
    { title: 'Advanced' },
  ];

  const [highlightedOptions, setHighlightedOptions] = useState<string[]>([]);

  useEffect(() => {
    const areComplete: boolean =
      selectedEducatorExperience !== null &&
      selectedEducationalContext !== null &&
      selectedGroupDimension !== null &&
      selectedLearnerExperience !== null;

    onOptionsChange(areComplete);
    console.log('areComplete: ' + areComplete);

    if (isNextButtonClicked) {
      // Check the options and update the state of the options to be highlighted with the red color
      const optionsToHighlight: string[] = [];

      if (
        !selectedEducatorExperience &&
        !optionsToHighlight.includes('YourExperience')
      ) {
        optionsToHighlight.push('YourExperience');
      }

      if (
        !selectedEducationalContext &&
        !optionsToHighlight.includes('Context')
      ) {
        optionsToHighlight.push('Context');
      }

      if (
        !selectedGroupDimension &&
        !optionsToHighlight.includes('GroupDimension')
      ) {
        optionsToHighlight.push('GroupDimension');
      }

      if (
        !selectedLearnerExperience &&
        !optionsToHighlight.includes('LearnerExperience')
      ) {
        optionsToHighlight.push('LearnerExperience');
      }

      setHighlightedOptions(optionsToHighlight);
    }
    if (!isNextButtonClicked) {
      if (highlightedOptions.length > 0) {
        setHighlightedOptions([]);
      }
    }
  }, [
    isNextButtonClicked,
    selectedEducatorExperience,
    selectedEducationalContext,
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

  // useEffect(() => {
  //   console.log('successo qualcosa: ', highlightedOptions);
  // }, [highlightedOptions]);

  // useEffect(() => {
  //   // Update the state of the highlighted options when isNextButtonClicked changes
  //   if (!isNextButtonClicked) {
  //     setHighlightedOptions([]);
  //   }
  // }, [isNextButtonClicked]);

  // useEffect(() => {
  //   const areComplete: boolean =
  //     selectedEducatorExperience !== null &&
  //     selectedContext !== null &&
  //     selectedGroupDimension !== null &&
  //     selectedLearnerExperience !== null;

  //   onOptionsChange(areComplete);
  //   console.log('areComplete: ' + areComplete);
  // }, [
  //   selectedEducatorExperience,
  //   selectedContext,
  //   selectedGroupDimension,
  //   selectedLearnerExperience,
  //   // onOptionsChange,
  // ]);

  return (
    <>
      {hydrated && (
        <>
          <Flex w="100%" gap={`${SPACING}%`}>
            <Box w="50%">
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
                {isNextButtonClicked && selectedEducatorExperience === null && (
                  <Text color="error_label" fontSize="sm">
                    Select an educator experience!
                  </Text>
                )}
              </Box>
            </Box>
            <Box w="50%">
              <Text as="b">Educational context</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={EducationalContext}
                  selected={selectedEducationalContext}
                  onChange={handleEducationalContextChange}
                  preselectedTitle={selectedEducationalContext?.title}
                  isHighlighted={highlightedOptions.includes('Context')}
                  isSmallerScreen={isSmallerScreen}
                />
                {isNextButtonClicked && selectedEducationalContext === null && (
                  <Text color="error_label" fontSize="sm">
                    Select an educational context!
                  </Text>
                )}
              </Box>
            </Box>
          </Flex>

          <Flex w="100%" paddingTop="1.5rem" gap={`${SPACING}%`}>
            <Box w="50%">
              <Text as="b">Learners{"'"} group dimension</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={GroupDimension}
                  selected={selectedGroupDimension}
                  onChange={handleGroupDimensionChange}
                  preselectedTitle={selectedGroupDimension?.title}
                  isHighlighted={highlightedOptions.includes('GroupDimension')}
                  isSmallerScreen={isSmallerScreen}
                />
                {isNextButtonClicked && selectedGroupDimension === null && (
                  <Text color="error_label" fontSize="sm">
                    Select a group dimension!
                  </Text>
                )}
              </Box>
            </Box>
            <Box w="50%">
              <Text as="b">Learners{"'"} experience</Text>
              <Box paddingTop="0.5rem">
                <SegmentedButton
                  options={LearnerExperience}
                  selected={selectedLearnerExperience}
                  onChange={handleLearnerExperienceChange}
                  preselectedTitle={selectedLearnerExperience?.title}
                  isHighlighted={highlightedOptions.includes(
                    'LearnerExperience'
                  )}
                  isSmallerScreen={isSmallerScreen}
                />
                {isNextButtonClicked && selectedLearnerExperience === null && (
                  <Text color="error_label" fontSize="sm">
                    {`Select a learner\'s experience!`}
                  </Text>
                )}
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
