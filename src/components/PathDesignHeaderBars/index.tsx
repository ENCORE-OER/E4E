import { Box, Flex, Text } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CustomDropDownMenu from '../../components/CustomDropDownMenu/CustomDropDownMenu';
import {
  CollectionProps,
  OerInCollectionProps,
} from '../../types/encoreElements';

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
  // DIMENSION,
  // isSmallerScreen,
  collections,
  handleCollectionSelection,
  handleCollectionChange,
  resources,
  handleResourceSelection,
  handleResourceChange,
  isNextButtonClicked,
}: PathDesignHeaderBarsProps) {
  const { collectionIndex, resourceIndex, step } =
    useLearningPathDesignContext();

  return (
    <Flex direction="column" w="100%">
      {/* Text boxes */}
      <Flex paddingTop="1.5rem" gap={`${SPACING}%`}>
        <Text
          fontSize="sm"
          fontWeight="bold"
          // paddingRight={`${SPACING}%`}
          //w={`${DIMENSION - SPACING}%`}
          // flex='1'
          w="50%"
        >
          Select the collection with relevant resources*
        </Text>
        {step >= 1 && (
          <Text
            fontSize="sm"
            fontWeight="bold"
            // paddingRight={`${SPACING}%`}
            // w={`${DIMENSION - SPACING}%`}
            // flex='1'
            w="50%"
          >
            Select the resources within the collection
          </Text>
        )}
      </Flex>

      {/* Dropdown menu  */}
      <Flex direction="row" gap={`${SPACING}%`} pt={1}>
        {/* Collections */}
        <Box
          // w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}
          // flex='1'
          w="50%"
        >
          {/* <Text
            fontSize="sm"
            fontWeight="bold"
            // paddingRight={`${SPACING}%`}
            //w={`${DIMENSION - SPACING}%`}
          >
            Select the collection with relevant resources*
          </Text> */}
          <CustomDropDownMenu
            data={collections}
            onData={handleCollectionSelection}
            onSelectionChange={handleCollectionChange}
            isHighlighted={isNextButtonClicked}
            isBloomLevel={false}
            itemIndex={collectionIndex}
            defaultMenuTitle="Choose a collection"
          />
        </Box>

        {/* Resources */}
        {step >= 1 && (
          <Box
            // w={isSmallerScreen ? '50%' : `${DIMENSION - SPACING}%`}
            // flex='1'
            w="50%"
          >
            {/* <Text
            fontSize="sm"
            fontWeight="bold"
            // paddingRight={`${SPACING}%`}
            // w={`${DIMENSION - SPACING}%`}
          >
            Select the resources within the collection*
          </Text> */}
            <CustomDropDownMenu
              data={resources} // When a collection is selected, the resources array is updated with the resources of the selected collection???
              onData={handleResourceSelection}
              onSelectionChange={handleResourceChange}
              isHighlighted={isNextButtonClicked}
              isBloomLevel={false}
              itemIndex={resourceIndex}
              defaultMenuTitle="Select the resources"
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
