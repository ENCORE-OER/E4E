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
  handleText,
  isNextButtonClicked,
  collectionIndex,
  currentBloomOptions,
  step,
  isSmallerScreen,
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
            Select the Bloom level for the learning objective
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
            This level indicates the cognitive complexity or depth of
            understanding associated with a particular learning objective
          </Text>
        </Box>
        {step >= 2 && (
          <Box flex="1" w="100%">
            <Box>
              <Text fontSize="sm" fontWeight="bold" pb={`${SPACING}%`}>
                Select the verbs related to your learning objective
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
          Add here the skill or the concepts to be covered
        </Text>
        <Box pt={1}>
          <SearchBarPathDesign
            collectionIndex={collectionIndex}
            isHighlighted={isNextButtonClicked}
          />
        </Box>
        <Text fontSize="sm" pt={1}>
          The selection of skills and concepts here is informed by the
          collection of Open Educational Resources (OERs).
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
          Add here the context
        </Text>
        <Box
          pt={1}
          // paddingRight={`${SPACING}%`}
          // w={`${DIMENSION}%`}
        >
          <TextBox
            backgroundColor="#EDF2F7"
            placeholder="Add some text..."
            isHighlighted={isNextButtonClicked}
            text={text}
            onTextChange={handleText}
          />
        </Box>
        <Text
          fontSize="sm"
          pt={1}
          //paddingRight={`${SPACING}%`}
          //w={`${DIMENSION}%`}
        >
          Here the contextual information that will assist in delineating the
          specific context of the educational activity
        </Text>
      </Box>
    </Flex>
  );
}
