import { useEffect, useState } from 'react';
import { CollectionModalProps } from '../../../types/encoreElements';
import AddCollectionModal from './AddResourceToCollectionModal';
import NewCollectionModal from './NewCollectionModal';

interface IndexCollectionModalProps extends CollectionModalProps {
  isNewCollection: boolean;
  isFromFolderButton: boolean;
  maxLength?: number; // max collection name length
}

export default function CollectionModal({
  onClose,
  oerToSave,
  isNewCollection,
  isFromFolderButton,
}: IndexCollectionModalProps) {
  //const { isOpen, onClose } = useDisclosure();
  const [isCollectionNew, setIsNewCollection] = useState<boolean>(false);
  //console.log(isNewCollection);

  const newOer = {
    idOer: oerToSave?.id,
    title: oerToSave?.title,
    description: oerToSave?.description,
    skills: oerToSave?.skills,
    concepts: oerToSave?.concepts,
  };

  const handleCloseCollectionModal = () => {
    onClose();
  };

  useEffect(() => {
    setIsNewCollection(isNewCollection);
  }, []);

  return (
    <>
      {!isCollectionNew && (
        <AddCollectionModal
          isOpen={true}
          onClose={handleCloseCollectionModal}
          oerToAddCollection={newOer}
          setIsNewCollection={setIsNewCollection}
        />
      )}

      {isCollectionNew && (
        <NewCollectionModal
          isOpen={true}
          onClose={handleCloseCollectionModal}
          oerToAddCollection={newOer}
          isFolderButton={isFromFolderButton}
          maxLength={30}
        />
      )}
    </>
  );
}
