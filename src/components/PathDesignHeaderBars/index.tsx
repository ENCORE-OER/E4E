import { Box, Flex, Text } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import { CollectionProps, OerInCollectionProps } from '../../types/encoreElements';

type PathDesignHeaderBarsProps = {
    SPACING: number;
    DIMENSION: number;
    isSmallerScreen: boolean | undefined;
    collections: CollectionProps[];
    handleCollectionSelection: () => void;
    handleCollectionChange: (collectionIndex: number) => void;
    resources: OerInCollectionProps[];
    handleResourceSelection: () => void;
    handleResourceChange: (resourceIndex: number) => void;
    isNextButtonClicked: boolean;
};

export default function PathDesignHeaderBars({
    SPACING,
    DIMENSION,
    isSmallerScreen,
    collections,
    handleCollectionSelection,
    handleCollectionChange,
    resources,
    handleResourceSelection,
    handleResourceChange,
    isNextButtonClicked,
}: PathDesignHeaderBarsProps) {

    const { collectionIndex, resourceIndex } = useLearningPathDesignContext();

    return (
        <>
            {/* Text boxes */}
            <Flex w="100%" paddingTop="1.5rem" gap={`${SPACING}%`}>
                <Text
                    fontSize="sm"
                    fontWeight="bold"
                    // paddingRight={`${SPACING}%`}
                    w={`${DIMENSION - SPACING}%`}
                >
                    Select the collection with relevant resources
                </Text>
                <Text
                    fontSize="sm"
                    fontWeight="bold"
                    // paddingRight={`${SPACING}%`}
                    w={`${DIMENSION - SPACING}%`}
                >
                    Select the resource within the collection
                </Text>
            </Flex>

            {/* Dropdown menu  */}
            <Flex direction='row' gap={`${SPACING}%`}>
                {/* Collections */}
                <Box w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}>
                    <CustomDropDownMenu
                        data={collections}
                        onData={handleCollectionSelection}
                        onSelectionChange={handleCollectionChange}
                        isHighlighted={isNextButtonClicked}
                        isBloomLevel={false}
                        itemIndex={collectionIndex}
                        defaultMenuTitle='Select Collection'
                    />
                </Box>

                {/* Resources */}
                <Box w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}>
                    <CustomDropDownMenu
                        data={resources}    // When a collection is selected, the resources array is updated with the resources of the selected collection???
                        onData={handleResourceSelection}
                        onSelectionChange={handleResourceChange}
                        isHighlighted={isNextButtonClicked}
                        isBloomLevel={false}
                        itemIndex={resourceIndex}
                        defaultMenuTitle='Select Resource'
                    />
                </Box>
            </Flex>
        </>
    );
}