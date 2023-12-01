import { Flex, Heading, Icon, Spacer } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { CollectionProps } from '../../../types/encoreElements';
import DownloadButton from '../../Buttons/DownloadButton';

type HeaderCollectionViewProps = {
  collectionName: string;
  data: CollectionProps;
  fileName: string;
};

export default function HeaderCollectionView({
  collectionName,
  data,
  fileName,
}: HeaderCollectionViewProps) {
  return (
    <Flex w="100%" mb="3">
      <Icon as={FcFolder} w="30px" h="30px" mr="3" />
      <Heading fontSize="22px" fontWeight="semibold" overflow={'hidden'}>
        {collectionName}
      </Heading>
      <Spacer />
      <DownloadButton data={data} fileName={fileName} />
    </Flex>
  );
}
