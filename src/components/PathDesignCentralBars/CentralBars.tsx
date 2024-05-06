import { Box, Flex, Text } from '@chakra-ui/react';
import { PathDesignCentralBarsProps } from '.';
import { ArrayProps } from '../../types/encoreElements';
import CheckboxMenu from '../CheckboxMenu/CheckboxMenu';
import CustomDropDownMenu from '../CustomDropDownMenu/CustomDropDownMenu';
import SearchBarPathDesign from '../CustomSearchBar/SearchBarSkillsConcepts';
import IconInfoCircleTooltip from '../Icons/IconInfoCircle/IconInfoCircleTooltip';
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
  // DIMENSION,
  bloomLevels,
  handleBloomLevelChange,
  handleOptionsChange,
  resetCheckBoxOptions,
  text,
  handleText,
  isNextButtonClicked,
  collectionIndex,
  resourcesIndex,
  bloomLevelIndex,
  currentBloomOptions,
  step,
  bloomLevelTitleTextBox: bloomLevelTextBox,
  skillConceptTitleTextBox: skillConceptTextBox,
  contextTitleTextBox: contextTextBox,
  placeholderContextBox,
  verbsTitleTextBox,
}: CentralBarsProps) {
  return (
    <Flex paddingTop="1.5rem" w="100%" direction="column">
      <Flex w="100%" direction="column">
        {/* Skill and concepts */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          w="100%"
        >
          {skillConceptTextBox}
        </Text>
        <Box w="100%" pt={1}>
          <SearchBarPathDesign
            collectionIndex={collectionIndex}
            resourcesIndex={resourcesIndex}
            isHighlighted={isNextButtonClicked}
          />
        </Box>
      </Flex>

      <Text paddingTop="1.5rem" display="flex" w="100%">
        To define a learning path effectively, it is crucial to choose the
        desired level within the Bloom taxonomy and provide indications of the
        skills, concepts, and contextual information that need to be achieved.
      </Text>

      {/* Text boxes */}
      <Flex paddingTop="1.5rem" w="100%" gap={`${SPACING}%`}>
        {/* Bloom Level */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          //w={`${DIMENSION - SPACING}%`}
          // flex='1'
          w="50%"
          pt={1}
        >
          {bloomLevelTextBox}
        </Text>
        {/* Verbs Bloom Level Text Box */}
        {step >= 2 &&
          currentBloomOptions.length > 0 &&
          collectionIndex > -1 && (
            <Text
              fontSize="sm"
              fontWeight="bold"
              //paddingRight={`${SPACING}%`}
              //pb={1}
              // flex='1'
              w="50%"
              pt={1}
            >
              {verbsTitleTextBox}
            </Text>
          )}
      </Flex>

      <Flex w="100%" pt={1} gap={`${SPACING}%`} direction="row">
        {/* Bloom Level Selection */}
        <Box
          // w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}
          // flex='1'
          w="50%"
        >
          <Flex direction={'row'} align={'center'} gap={1}>
            <CustomDropDownMenu
              data={bloomLevels}
              onSelectionChange={handleBloomLevelChange}
              isHighlighted={isNextButtonClicked}
              isBloomLevel={true}
              itemIndex={bloomLevelIndex}
              defaultMenuTitle="Select Bloom Level"
            />
            <IconInfoCircleTooltip
              label_tooltip={`Bloom's Taxonomy is a framework that categorizes educational objectives into six levels of cognitive complexity, ranging from simple recall to higher-order thinking skills like evaluation and creation.`}
            />
          </Flex>
        </Box>

        {step >= 2 &&
          currentBloomOptions.length > 0 &&
          collectionIndex > -1 && (
            <Box
              // w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}
              // flex='1'
              w="50%"
            >
              <CheckboxMenu
                onOptionsChange={handleOptionsChange}
                options={currentBloomOptions}
                reset={resetCheckBoxOptions}
                isHighlighted={isNextButtonClicked}
              />
            </Box>
          )}
      </Flex>

      <Flex paddingTop="1.5rem" w="100%" direction="column">
        {/* Learning Context */}
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          //w={`${DIMENSION - SPACING}%`}
          w="100%"
        >
          {contextTextBox}
        </Text>
        <Box
          //w={`${DIMENSION - SPACING}%`}
          w="100%"
          pt={1}
        >
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
    </Flex>
  );
}
