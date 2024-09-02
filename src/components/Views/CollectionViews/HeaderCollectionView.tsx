import { Flex, Heading, Icon, Spacer, useDisclosure } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { useCollectionsContext } from '../../../Contexts/CollectionsContext/CollectionsContext';
import { CollectionProps } from '../../../types/encoreElements';
import AttachButton from '../../Buttons/ButtonsDesignPage/AttachButton';
import DownloadButton from '../../Buttons/DownloadButton';
import RenameButton from '../../Buttons/RenameButton';
import RenameCollectionModal from '../../Modals/CollectionModals/RenameCollectionModal';

type HeaderCollectionViewProps = {
  collectionName: string;
  data: CollectionProps;
  fileName: string;
  isAddContentModal?: boolean;
  handleAttachClick: () => void;
  isDisabled: boolean;
  maxLength: number;
};

export default function HeaderCollectionView({
  collectionName,
  data,
  fileName,
  isAddContentModal,
  handleAttachClick,
  isDisabled,
  maxLength,
}: HeaderCollectionViewProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { renameCollection } = useCollectionsContext();

  return (
    <Flex w="100%" pb="3" bg="background">
      <Flex direction="row" align="center" gap={3}>
        <Icon as={FcFolder} w="30px" h="30px" />
        <Heading
          fontSize="22px"
          fontWeight="semibold"
          overflow={'hidden'}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {collectionName}
        </Heading>
        {!isAddContentModal && <RenameButton onClick={onOpen} />}
      </Flex>
      <Spacer />
      {!isAddContentModal && <DownloadButton data={data} fileName={fileName} />}
      {isAddContentModal && (
        <AttachButton
          handleAttachClick={handleAttachClick}
          isDisabled={isDisabled}
        />
      )}

      <RenameCollectionModal
        isOpen={isOpen}
        onClose={onClose}
        collection={data}
        renameCollection={renameCollection}
        maxLength={maxLength}
      />
    </Flex>
  );
}
