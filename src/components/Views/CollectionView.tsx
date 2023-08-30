import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { CollectionProps, OerProps } from '../../types/encoreElements';
import AddResourcesButton from '../Buttons/AddResourcesButton';
import DownloadButton from '../Buttons/DownloadButton';
import ResourceCardsList from '../Card/OerCard/ResourceCardsList';

interface CollectionViewProps extends BoxProps {
  collections: CollectionProps[];
  collectionIndex: number;
  oersById: OerProps[];
}

export default function CollectionView({
  collections,
  collectionIndex,
  oersById,
  ...rest
}: CollectionViewProps) {
  return (
    <Box {...rest}>
      <Flex w="100%" mb="3">
        <Icon as={FcFolder} w="30px" h="30px" mr="3" />
        <Heading fontSize="22px" fontWeight="semibold" overflow={'hidden'}>
          {collections[collectionIndex]?.name}
        </Heading>
        <Spacer />
        <DownloadButton
          data={collections[collectionIndex]}
          fileName={collections[collectionIndex].name}
        />
      </Flex>
      <Text
        fontWeight="light"
        fontSize="small"
        color="grey"
        mb="3"
      >{`${collections[collectionIndex]?.oers.length} resources`}</Text>
      <ResourceCardsList
        oers={oersById}
        isNormalSizeCard={true}
        itemsPerPage={5}
        collectionColor={collections[collectionIndex]?.color}
      />
      <Flex justifyContent="center" padding="5">
        <AddResourcesButton
          text="Add Resources ..."
          pathname="/"
          variant="primary"
        />
      </Flex>
    </Box>
  );
}
