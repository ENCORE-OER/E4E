import { useEffect, useState } from 'react';
import {
  AddCollectionFunction,
  AddResourceFunction,
  CollectionModalProps,
  CollectionProps,
  OerInCollectionProps,
} from '../../../types/encoreElements';
import AddResourceToCollectionModal from './AddResourceToCollectionModal';
import NewCollectionModal from './NewCollectionModal';

interface IndexCollectionModalProps extends CollectionModalProps {
  isNewCollection: boolean;
  isFromFolderButton: boolean;
  maxLength?: number; // max collection name length
  collections: CollectionProps[];
  addResource: AddResourceFunction;
  addCollection: AddCollectionFunction;
}

export default function CollectionModal({
  onClose,
  oerToSave,
  isNewCollection,
  isFromFolderButton,
  addResource,
  addCollection,
  collections,
}: IndexCollectionModalProps) {
  //const { isOpen, onClose } = useDisclosure();
  const [isCollectionNew, setIsNewCollection] = useState<boolean>(false);
  //console.log(isNewCollection);

  const newOer: OerInCollectionProps = {
    id: oerToSave?.id ?? 0,
    title: oerToSave?.title ?? '',
    description: oerToSave?.description ?? '',
    //skills: oerToSave?.skills,
    concepts: oerToSave?.concepts ?? [],
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
