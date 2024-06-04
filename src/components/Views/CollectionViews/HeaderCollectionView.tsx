import { Flex, Heading, Icon, Spacer } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { CollectionProps } from '../../../types/encoreElements';
import StandardButton from '../../Buttons/ButtonsDesignPage/StandardButton';
import DownloadButton from '../../Buttons/DownloadButton';

type HeaderCollectionViewProps = {
  collectionName: string;
  data: CollectionProps;
  fileName: string;
  isAddContentModal?: boolean;
};

export default function HeaderCollectionView({
  collectionName,
  data,
  fileName,
  isAddContentModal
}: HeaderCollectionViewProps) {
  return (
    <Flex w="100%" pb="3" bg="background">
      <Icon as={FcFolder} w="30px" h="30px" />
      <Heading fontSize="22px" fontWeight="semibold" overflow={'hidden'} pl="3">
        {collectionName}
      </Heading>
      <Spacer />
      {!isAddContentModal && <DownloadButton data={data} fileName={fileName} />}
      {isAddContentModal && <StandardButton buttonText='Attach Selected' handleClick={() => console.log("Attach Selected!")} size={"sm"} isDisabled={true} />}
    </Flex>
  );
}
