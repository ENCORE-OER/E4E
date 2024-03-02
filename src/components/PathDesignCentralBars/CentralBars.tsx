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
  handleSetText: (newText: string) => void;
}

export default function CentralBars({
  SPACING,
  DIMENSION,
  bloomLevels,
  handleBloomLevelChange,
  handleOptionsChange,
  resetCheckBoxOptions,
  text,
  handleSetText,
  isNextButtonClicked,
  collectionIndex,
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
      <Flex paddingTop="1.5rem" w="100%">
        <Text
          fontSize="sm"
          fontWeight="bold"
          paddingRight={`${SPACING}%`}
          w={`${DIMENSION}%`}
        >
          {bloomLevelTextBox}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          paddingRight={`${SPACING}%`}
          w={`${DIMENSION}%`}
        >
          {skillConceptTextBox}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          paddingRight={`${SPACING}%`}
          w={`${DIMENSION}%`}
        >
          {contextTextBox}
        </Text>
      </Flex>

      <Flex w="100%" pt={1}>
        <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          <CustomDropDownMenu
            data={bloomLevels}
            onSelectionChange={handleBloomLevelChange}
            isHighlighted={isNextButtonClicked}
            isBloomLevel={true}
          />
        </Box>

        <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          <SearchBarPathDesign
            collectionIndex={collectionIndex}
            isHighlighted={isNextButtonClicked}
          />
        </Box>
        <Box paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          <TextBox
            backgroundColor="#EDF2F7"
            placeholder={placeholderContextBox}
            isHighlighted={isNextButtonClicked}
            text={text}
            onTextChange={handleSetText}
          />
        </Box>
      </Flex>

      <Flex w="100%" pt={1}>
        <Text fontSize="sm" paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          {bloomLevelDescriptionTextBox}
        </Text>
        <Text fontSize="sm" paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
          {skillConceptDescriptionTextBox}
        </Text>
        <Text fontSize="sm" paddingRight={`${SPACING}%`} w={`${DIMENSION}%`}>
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
