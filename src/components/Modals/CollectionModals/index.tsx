import { useEffect, useState } from 'react';
import { useCollectionsContext } from '../../../Contexts/CollectionsContext/CollectionsContext';
import {
  CollectionModalProps,
  OerInCollectionProps,
} from '../../../types/encoreElements';
import AddResourceToCollectionModal from './AddResourceToCollectionModal';
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
  const { addCollection, addResource, collections } = useCollectionsContext();

  //const { isOpen, onClose } = useDisclosure();
  const [isCollectionNew, setIsNewCollection] = useState<boolean>(false);
  //console.log(isNewCollection);

  const newOer: OerInCollectionProps = {
    id: oerToSave?.id,
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
        <AddResourceToCollectionModal
          isOpen={true}
          onClose={handleCloseCollectionModal}
          oerToAddCollection={newOer}
          setIsNewCollection={setIsNewCollection}
          collections={collections}
          addResource={addResource}
        />
      )}

      {isCollectionNew && (
        <NewCollectionModal
          isOpen={true}
          onClose={handleCloseCollectionModal}
          oerToAddCollection={newOer}
          isFolderButton={isFromFolderButton}
          maxLength={30}
          collections={collections}
          addResource={addResource}
          addCollection={addCollection}
        />
      )}
    </>
  );
}
