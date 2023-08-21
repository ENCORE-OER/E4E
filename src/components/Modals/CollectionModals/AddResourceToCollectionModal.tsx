import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CollectionModalProps, OerInCollectionProps } from '../../../types/encoreElements';

import { useHasHydrated } from '../../../utils/utils';
import { useCollectionsContext } from '../../CollectionsContext/CollectionsContext';

interface AddCollectionModalProps extends CollectionModalProps {
  oerToAddCollection: OerInCollectionProps;   // this is the oer with only the info needed to add it to the collection
  setIsNewCollection: Dispatch<SetStateAction<boolean>>;
}

export default function AddResourceToCollectionModal({
  onClose,
  oerToAddCollection,
  isOpen,
  setIsNewCollection
}: AddCollectionModalProps) {
  //const { isOpen, onClose } = useDisclosure();
  const { addResource, collections } = useCollectionsContext();
  const hydrated = useHasHydrated();
  //const [isNewCollection, setIsNewCollection] = useState<boolean>(false);
  //console.log(isNewCollection);
  const [indexCollectionClicked, setIndexCollectionClicked] =
    useState<number>(-1);


  const handleSaveResource = async (idCollectionSelected: number) => {
    setIndexCollectionClicked(collections.map((collection: any) => collection.id).indexOf(idCollectionSelected));
    await addResource(idCollectionSelected, oerToAddCollection);

    onClose();
  };

  const handleCloseCollectionModal = () => {
    onClose();
  };

  useEffect(() => {
    if (hydrated) {
      //alert(`Resource added to "${collections[indexCollectionClicked]?.name}" collection`)
    }
  }, [indexCollectionClicked]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseCollectionModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            border="1px"
            p="2px"
            borderColor="grey"
            rounded="5px"
            maxH="100px"
            overflowY="scroll"
          >
            {collections?.map((collection: any) => (
              <Text
                key={collection.id}
                _hover={{ bg: 'gray.200' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveResource(collection.id);
                }}
              >
                {collection.name}
              </Text>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              mr={3}
              onClick={(e) => {
                e.preventDefault();
                setIsNewCollection(true);
              }}
            >
              + New Collection
            </Button>
            <Button onClick={handleCloseCollectionModal}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
