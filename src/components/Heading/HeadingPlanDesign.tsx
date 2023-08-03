import { Box, Flex, Heading, HStack, Input, Text } from '@chakra-ui/react';
//import { useHasHydrated } from '../../utils/utils';
//import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';
import CollectionMenu from '../DropDownMenu/CollectionMenu';

type HeadingPlanDesignProps = {
  title: string;
};

export default function HeadingPlanDesign({ title }: HeadingPlanDesignProps) {
  //const hydrated = useHasHydrated();
  //const { collections, indexCollectionClicked } = useCollectionsContext();
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
          <CollectionMenu />
        </Box>
        <Box>
          <Text variant="text_field_label" my="6px">
            Title
          </Text>
          {/* <Text
            borderBottom="2px"
            borderBottomColor="grey"
            borderBottomStyle="solid"
            pb="3px"
          >
            {(hydrated &&
              collections[indexCollectionClicked] &&
              `${collections[indexCollectionClicked]?.name} Learning Path`) ||
              ' '}
          </Text>*/}
          <Input
            w="300px"
            borderBottom="2px"
            borderBottomColor="grey"
            borderBottomStyle="solid"
            variant="flushed"
            placeholder="Type a learning path name..."
          ></Input>
        </Box>
      </HStack>
    </Box>
  );
}
