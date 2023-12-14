import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import SegmentedButton from '../Buttons/SegmentedButton';
//import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

type Option = {
  title: string;
  description?: string;
};

type SegmentedButtonProps = {
  onOptionsChange: (areComplete: boolean) => void;
  isNextButtonClicked: boolean;
};
export default function SegmentedButtonGroup({
  onOptionsChange,
  isNextButtonClicked,
}: SegmentedButtonProps) {
  const {
    handleContextChange,
    handleYourExperienceChange,
    handleGroupDimensionChange,
    handleLeanerExperienceChange,
    selectedYourExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLeanerExperience,
  } = useLearningPathDesignContext();

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
    console.log('successo qualcosa');
  }, [highlightedOptions]);

  
  useEffect(() => {
    if (isNextButtonClicked) {
      // Controlla le opzioni e aggiorna lo stato delle opzioni da evidenziare con il colore rosso
      const optionsToHighlight: string[] = [];

      if (!selectedYourExperience) {
        optionsToHighlight.push('YourExperience');
      }

      if (!selectedContext) {
        optionsToHighlight.push('Context');
      }

      if (!selectedGroupDimension) {
        optionsToHighlight.push('GroupDimension');
      }

      if (!selectedLeanerExperience) {
        optionsToHighlight.push('LeanerExperience');
      }

      setHighlightedOptions(optionsToHighlight);
    }
  }, [
    isNextButtonClicked,
    selectedYourExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLeanerExperience,
  ]);

  useEffect(() => {
    // Aggiorna lo stato delle opzioni evidenziate quando cambia isNextButtonClicked
    if (!isNextButtonClicked) {
      setHighlightedOptions([]);
    }
  }, [isNextButtonClicked]);

  useEffect(() => {
    const areComplete: boolean =
      !!selectedYourExperience &&
      !!selectedContext &&
      !!selectedGroupDimension &&
      !!selectedLeanerExperience;

    onOptionsChange(areComplete);
    console.log('areComplete: ' + areComplete);
  }, [
    selectedYourExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLeanerExperience,
    onOptionsChange,
  ]);

  return (
    <>
      <Flex w="100%">
        <Box w="50%" paddingLeft="0.5rem" paddingRight="2rem">
          <Text as="b">Your experience</Text>
          <Box paddingTop="0.5rem">
            <SegmentedButton
              options={YourExperience}
              selected={selectedYourExperience}
              onChange={handleYourExperienceChange}
              preselectedTitle={selectedYourExperience?.title}
              isHighlighted={highlightedOptions.includes('YourExperience')}
            />
          </Box>
        </Box>
        <Box w="50%" paddingLeft="0.5rem" paddingRight="2rem">
          <Text as="b">Educational context</Text>
          <Box paddingTop="0.5rem">
            <SegmentedButton
              options={Context}
              selected={selectedContext}
              onChange={handleContextChange}
              preselectedTitle={selectedContext?.title}
              isHighlighted={highlightedOptions.includes('Context')}
            />
          </Box>
        </Box>
      </Flex>

      <Flex w="100%" paddingTop="1.5rem">
        <Box w="50%" paddingLeft="0.5rem" paddingRight="2rem">
          <Text as="b">Leaner{"'"}s group dimension</Text>
          <Box paddingTop="0.5rem">
            <SegmentedButton
              options={GroupDimension}
              selected={selectedGroupDimension}
              onChange={handleGroupDimensionChange}
              preselectedTitle={selectedGroupDimension?.title}
              isHighlighted={highlightedOptions.includes('GroupDimension')}
            />
          </Box>
        </Box>
        <Box w="50%" paddingLeft="0.5rem" paddingRight="2rem">
          <Text as="b">Leaner{"'"}s experience</Text>
          <Box paddingTop="0.5rem">
            <SegmentedButton
              options={LeanerExperience}
              selected={selectedLeanerExperience}
              onChange={handleLeanerExperienceChange}
              preselectedTitle={selectedLeanerExperience?.title}
              isHighlighted={highlightedOptions.includes('LeanerExperience')}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
}
