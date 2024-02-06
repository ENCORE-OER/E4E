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
    step
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
                        placeholder="Add some text..."
                        isHighlighted={isNextButtonClicked}
                        text={text}
                        onTextChange={handleSetText}
                    />
                </Box>
            </Flex>

            <Flex w="100%" pt={1}>
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
                        <Text fontSize="sm" fontWeight="bold" paddingRight={`${SPACING}%`} pb={1}>
                            Select the verbs related to your learning objective
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
    )
}