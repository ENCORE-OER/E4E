import React, { useEffect } from 'react';
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
};
export default function SegmentedButtonGroup ({onOptionsChange}:SegmentedButtonProps) {
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

    useEffect(() => {
      const areComplete:boolean =
      !!selectedYourExperience &&
      !!selectedContext &&
      !!selectedGroupDimension &&
      !!selectedLeanerExperience;

      onOptionsChange(areComplete);
      console.log('areComplete: ' + areComplete);
    }, [  selectedYourExperience, 
          selectedContext, 
          selectedGroupDimension, 
          selectedLeanerExperience, 
          onOptionsChange
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
              />
            </Box>
          </Box>
        </Flex>
      </>
    );
}
