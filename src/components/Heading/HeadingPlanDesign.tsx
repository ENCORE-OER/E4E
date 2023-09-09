import { Box, Flex, Heading, HStack, Input, Text } from '@chakra-ui/react';
//import { useHasHydrated } from '../../utils/utils';
import { Dispatch, SetStateAction } from 'react';
import { CollectionProps } from '../../types/encoreElements';
//import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';
import CollectionMenu from '../DropDownMenu/CollectionMenu';

type HeadingPlanDesignProps = {
  title: string;
  collectionIndex?: number;
  setCollectionIndex: Dispatch<SetStateAction<number>>;
  collections: CollectionProps[];
};

export default function HeadingPlanDesign({
  title,
  collectionIndex,
  setCollectionIndex,
  collections,
}: HeadingPlanDesignProps) {
  //const hydrated = useHasHydrated();
  //const { indexCollectionClicked } = useCollectionsContext();
  return (
    <Box w="full">
      <Flex
        w="100%"
        justifyContent="left"
        //justify="space-between"
      >
        <Heading>{title}</Heading>
      </Flex>

      <HStack display="flex" gap={10} pt={5}>
        <Box>
          <Text variant="text_field_label" my="6px">
            Collection
          </Text>
          <CollectionMenu
            collections={collections}
            setCollectionIndex={setCollectionIndex}
            collectionIndex={collectionIndex}
          />
        </Box>
        <Box>
          <Text variant="text_field_label" my="6px">
            Title
          </Text>

          <Input
            w="500px"
            borderBottom="2px"
            borderBottomColor="grey"
            borderBottomStyle="solid"
            variant="flushed"
            placeholder="Type a learning path title"
          ></Input>
          <Box>
            <Text variant="text_field_label" my="6px">
              Description
            </Text>
            <Input
              w="500px"
              borderBottom="2px"
              borderBottomColor="grey"
              borderBottomStyle="solid"
              variant="flushed"
              placeholder="Type the learning path description"
            ></Input>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}
