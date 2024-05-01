import { Box, Flex, Text } from '@chakra-ui/react';
import { PathDesignCentralBarsProps } from '.';
import { ArrayProps } from '../../types/encoreElements';
import CheckboxMenu from '../CheckboxMenu/CheckboxMenu';
import CustomDropDownMenu from '../CustomDropDownMenu/CustomDropDownMenu';
import SearchBarPathDesign from '../CustomSearchBar/SearchBarSkillsConcepts';
import TextBox from '../TextBox/TextBox';

export interface CentralBarsProps extends PathDesignCentralBarsProps {
  SPACING: number;
  DIMENSION: number;
  bloomLevels: ArrayProps[];
  handleBloomLevelChange: (index: number) => void;
  currentBloomOptions: string[];
  handleOptionsChange: (newSelectedOptions: string[]) => void;
  step: number;
  resetCheckBoxOptions: boolean;
  text: string;
  handleText: (newText: string) => void;
}

export default function CentralBars({
  SPACING,
  DIMENSION,
  bloomLevels,
  handleBloomLevelChange,
  handleOptionsChange,
  resetCheckBoxOptions,
  text,
  handleText,
  isNextButtonClicked,
  collectionIndex,
  bloomLevelIndex,
  currentBloomOptions,
  step,
  bloomLevelTitleTextBox: bloomLevelTextBox,
  skillConceptTitleTextBox: skillConceptTextBox,
  contextTitleTextBox: contextTextBox,
  placeholderContextBox,
  bloomLevelDescriptionTextBox,
  skillConceptDescriptionTextBox,
  contextDescriptionTextBox,
  verbsTitleTextBox,
}: CentralBarsProps) {
  return (
    <>
      {/* Text boxes */}
      <Flex paddingTop="1.5rem" w="100%" gap={`${SPACING}%`}>
        {/* Bloom Level */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          w={`${DIMENSION - SPACING}%`}
        >
          {bloomLevelTextBox}
        </Text>
        {/* Skill and concepts */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          w={`${DIMENSION - SPACING}%`}
        >
          {skillConceptTextBox}
        </Text>
        {/* Learning Context */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          w={`${DIMENSION - SPACING}%`}
        >
          {contextTextBox}
        </Text>
      </Flex>

      <Flex w="100%" pt={1} gap={`${SPACING}%`}>
        <Box w={`${DIMENSION - SPACING}%`}>
          <CustomDropDownMenu
            data={bloomLevels}
            onSelectionChange={handleBloomLevelChange}
            isHighlighted={isNextButtonClicked}
            isBloomLevel={true}
            itemIndex={bloomLevelIndex}
            defaultMenuTitle="Select Bloom Level"
          />
        </Box>

        <Box w={`${DIMENSION - SPACING}%`}>
          <SearchBarPathDesign
            collectionIndex={collectionIndex}
            isHighlighted={isNextButtonClicked}
          />
        </Box>
        <Box w={`${DIMENSION - SPACING}%`}>
          <TextBox
            // backgroundColor="#EDF2F7"
            backgroundColor="white"
            placeholder={placeholderContextBox}
            placeholderColor={'gray.400'}
            isHighlighted={isNextButtonClicked}
            text={text}
            onTextChange={handleText}
          />
        </Box>
      </Flex>

      <Flex w="100%" pt={1} gap={`${SPACING}%`}>
        <Text fontSize="sm" w={`${DIMENSION - SPACING}%`}>
          {bloomLevelDescriptionTextBox}
        </Text>
        <Text fontSize="sm" w={`${DIMENSION - SPACING}%`}>
          {skillConceptDescriptionTextBox}
        </Text>
        <Text fontSize="sm" w={`${DIMENSION - SPACING}%`}>
          {contextDescriptionTextBox}
        </Text>
      </Flex>

      {step >= 2 && currentBloomOptions.length > 0 && collectionIndex > -1 && (
        <Flex paddingTop="1.5rem" w="100%">
          <Box w={`${DIMENSION}%`} flexDirection="column">
            <Text
              fontSize="sm"
              fontWeight="bold"
              paddingRight={`${SPACING}%`}
              pb={1}
            >
              {verbsTitleTextBox}
            </Text>
            <CheckboxMenu
              onOptionsChange={handleOptionsChange}
              options={currentBloomOptions}
              reset={resetCheckBoxOptions}
              isHighlighted={isNextButtonClicked}
            />
          </Box>
        </Flex>
      )}
    </>
  );
}
