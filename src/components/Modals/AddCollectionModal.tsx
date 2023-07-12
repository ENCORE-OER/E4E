import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';

type AddCollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  oerToSave?: any;
};

export default function AddCollectionModal({
  onClose,
  oerToSave,
}: AddCollectionModalProps) {
  //const { isOpen, onClose } = useDisclosure();
  const [nameCollection, setNameCollection] = useState<string>('');
  //const [idCollection, setIdCollection] = useState<any>(0);
  const { addCollection, addResource, collections } = useCollectionsContext();
  const [isNewCollection, setIsNewCollection] = useState<boolean>(false);
  console.log(isNewCollection);

  const newOer = {
    idOer: oerToSave?.id,
    title: oerToSave?.title,
    description: oerToSave?.description,
    skills: oerToSave?.skills,
    concepts: [],
  };

  const handleSaveResource = async (idCollectionSelected?: any) => {
    if (!isNewCollection) {
      await addResource(idCollectionSelected, newOer);
    } else {
      const id_new = Math.random();
      console.log('Id collection' + id_new);
      await addCollection(id_new, nameCollection);
      //await addResource(id_new, newOer);
    }

    onClose();
  };

  const handleCloseCollectionModal = () => {
    onClose();
  };

  return (
    <>
      {!isNewCollection && (
        <Modal isOpen={true} onClose={handleCloseCollectionModal}>
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
      )}

      {isNewCollection && (
        <Modal isOpen={true} onClose={handleCloseCollectionModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Collection</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="New collection..."
                  value={nameCollection}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setNameCollection(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  mr={3}
                  disabled={false}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveResource();
                  }}
                >
                  Done
                </Button>
                <Button onClick={handleCloseCollectionModal}>Cancel</Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
