import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import TextBox from '../../components/TextBox/TextBox';
import SearchBarPathDesign from '../../components/CustomSearchBar/SearchBarSkillsConcepts';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CheckboxMenu from '../../components/CheckboxMenu/CheckboxMenu';

interface PathDesignCentralBarsProps {
  collectionIndex: number;
}

export default function PathDesignCentralBars({
  collectionIndex,
}: PathDesignCentralBarsProps) {
  const {
    DIMENSION,
    SPACING,
    bloomLevels,
    selectedSkillConceptsTags,
    handleSkillsChange,
    handleBloomLevelChange,
    currentBloomOptions,
    handleOptionsChange,
    step,
    resetCheckBoxOptions,
  } = useLearningPathDesignContext();

  return (
    <>
      <Flex paddingTop="1.5rem" w="100%">
        <Text
          fontSize="sm"
          fontWeight="bold"
          paddingRight={`${SPACING}%`}
          w={`${DIMENSION}%`}
        >
          Select the Bloom level for the learning objective
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          paddingRight={`${SPACING}%`}
          w={`${DIMENSION}%`}
        >
          Add here the skill or the concepts to be covered
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          paddingRight={`${SPACING}%`}
          w={`${DIMENSION}%`}
        >
          Add here the context
        </Text>
      </Flex>

      <Flex w="100%">
        <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          <CustomDropDownMenu
            initialTitle="Bloom Level"
            data={bloomLevels}
            onSelectionChange={handleBloomLevelChange}
          />
        </Box>

        <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          <SearchBarPathDesign
            collectionIndex={collectionIndex}
            selectedTags={selectedSkillConceptsTags}
            setSelectedTags={handleSkillsChange}
          />
        </Box>
        <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          <TextBox backgroundColor="#EDF2F7" placeholder="Add some text..." />
        </Box>
      </Flex>

      <Flex w="100%">
        <Text fontSize="sm" paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          This level indicates the cognitive complexity or depth of
          understanding associated with a particular learning objective
        </Text>
        <Text fontSize="sm" paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          The selection of skills and concepts here is informed by the
          collection of Open Educational Resources (OERs).
        </Text>
        <Text fontSize="sm" paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          Here the contextual information that will assist in delineating the
          specific context of the educational activity
        </Text>
      </Flex>

      {step >= 2 && (
        <Flex paddingTop="1.5rem" w="100%">
          <Box w={`${DIMENSION}%`}>
            <Text fontSize="sm" fontWeight="bold" paddingRight={`${SPACING}%`}>
              Select the verbs related to your learning objective
            </Text>
            <CheckboxMenu
              onOptionsChange={handleOptionsChange}
              options={currentBloomOptions}
              reset={resetCheckBoxOptions}
            />
          </Box>
        </Flex>
      )}
    </>
  );
}
