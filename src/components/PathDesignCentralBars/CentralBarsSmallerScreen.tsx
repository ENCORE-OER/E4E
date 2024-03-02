import { Box, Flex, Text } from '@chakra-ui/react';
import CheckboxMenu from '../CheckboxMenu/CheckboxMenu';
import CustomDropDownMenu from '../CustomDropDownMenu/CustomDropDownMenu';
import SearchBarPathDesign from '../CustomSearchBar/SearchBarSkillsConcepts';
import TextBox from '../TextBox/TextBox';
import { CentralBarsProps } from './CentralBars';

export default function CentralBarsSmallerScreen({
  SPACING,
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
  isSmallerScreen,
  contextTitleTextBox: contextTitleTextBox,
  skillConceptTitleTextBox: skillConceptTitleTextBox,
  bloomLevelTitleTextBox: bloomLevelTitleTextBox,
  placeholderContextBox,
  bloomLevelDescriptionTextBox,
  verbsTitleTextBox,
  contextDescriptionTextBox,
  skillConceptDescriptionTextBox,
}: CentralBarsProps) {
  return (
    <Flex
      paddingTop="1.5rem"
      w="100%"
      direction={isSmallerScreen ? 'column' : 'row'}
    >
      <Flex
        flexDirection={isSmallerScreen ? 'row' : 'column'}
        flex="1"
        w="100%"
        pr={`${SPACING}%`}
        gap={`${SPACING}%`}
      >
        <Box w="100%" flexDirection={'column'} flex="1">
          <Text fontSize="sm" fontWeight="bold">
            {bloomLevelTitleTextBox}
          </Text>
          <Box pt={1}>
            <CustomDropDownMenu
              data={bloomLevels}
              onSelectionChange={handleBloomLevelChange}
              isHighlighted={isNextButtonClicked}
              isBloomLevel={true}
            />
          </Box>

          <Text fontSize="sm" pt={1}>
            {bloomLevelDescriptionTextBox}
          </Text>
        </Box>
        {step >= 2 &&
          currentBloomOptions.length > 0 &&
          collectionIndex > -1 && (
            <Box flex="1" w="100%" flexDirection="column">
              <Box>
                <Text fontSize="sm" fontWeight="bold" pb={`${SPACING}%`}>
                  {verbsTitleTextBox}
                </Text>
                <CheckboxMenu
                  onOptionsChange={handleOptionsChange}
                  options={currentBloomOptions}
                  reset={resetCheckBoxOptions}
                  isHighlighted={isNextButtonClicked}
                />
              </Box>
            </Box>
          )}
      </Flex>
      <Box
        flex="1"
        flexDirection="column"
        w="100%"
        pr={`${SPACING}%`}
        pt={`${SPACING}%`}
      >
        <Text fontSize="sm" fontWeight="bold">
          {skillConceptTitleTextBox}
        </Text>
        <Box pt={1}>
          <SearchBarPathDesign
            collectionIndex={collectionIndex}
            isHighlighted={isNextButtonClicked}
          />
        </Box>
        <Text fontSize="sm" pt={1}>
          {skillConceptDescriptionTextBox}
        </Text>
      </Box>
      <Box
        flex="1"
        flexDirection="column"
        w="100%"
        pr={`${SPACING}%`}
        pt={`${SPACING}%`}
      >
        <Text
          fontSize="sm"
          fontWeight="bold"
          //paddingRight={`${SPACING}%`}
          //w={`${DIMENSION}%`}
        >
          {contextTitleTextBox}
        </Text>
        <Box
          pt={1}
          // paddingRight={`${SPACING}%`}
          // w={`${DIMENSION}%`}
        >
          <TextBox
            backgroundColor="#EDF2F7"
            placeholder={placeholderContextBox}
            isHighlighted={isNextButtonClicked}
            text={text}
            onTextChange={handleSetText}
          />
        </Box>
        <Text
          fontSize="sm"
          pt={1}
          //paddingRight={`${SPACING}%`}
          //w={`${DIMENSION}%`}
        >
          {contextDescriptionTextBox}
        </Text>
      </Box>
    </Flex>
  );
}
