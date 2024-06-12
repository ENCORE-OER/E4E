import { Flex, Heading, Icon, Spacer } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { CollectionProps } from '../../../types/encoreElements';
import AttachButton from '../../Buttons/ButtonsDesignPage/AttachButton';
import DownloadButton from '../../Buttons/DownloadButton';

type HeaderCollectionViewProps = {
  collectionName: string;
  data: CollectionProps;
  fileName: string;
  isAddContentModal?: boolean;
  handleAttachClick: () => void;
  isDisabled: boolean;
};

export default function HeaderCollectionView({
  collectionName,
  data,
  fileName,
  isAddContentModal,
  handleAttachClick,
  isDisabled,
}: HeaderCollectionViewProps) {
  return (
    <Flex w="100%" pb="3" bg="background">
      <Icon as={FcFolder} w="30px" h="30px" />
      <Heading fontSize="22px" fontWeight="semibold" overflow={'hidden'} pl="3">
        {collectionName}
      </Heading>
      <Spacer />
      {!isAddContentModal && <DownloadButton data={data} fileName={fileName} />}
      {isAddContentModal && (
        <AttachButton
          handleAttachClick={handleAttachClick}
          isDisabled={isDisabled}
        />
      )}
    </Flex>
  );
}
