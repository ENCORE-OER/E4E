import {
  Button,
  FormControl,
  FormErrorMessage,
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  AddCollectionFunction,
  AddResourceFunction,
  CollectionModalProps,
  CollectionProps,
  OerInCollectionProps,
} from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../../utils/utils';

interface NewCollectionModalProps extends CollectionModalProps {
  oerToAddCollection: OerInCollectionProps; // this is the oer with only the info needed to add it to the collection
  isFolderButton: boolean; // to understood if this page is call by folder button in resource page
  maxLength: number; // max length of the collection name
  collections: CollectionProps[];
  addResource: AddResourceFunction;
  addCollection: AddCollectionFunction;
}

export default function NewCollectionModal({
  onClose,
  oerToAddCollection,
  isOpen,
  isFolderButton,
  maxLength,
  collections,
  addResource,
  addCollection,
}: NewCollectionModalProps) {
  const [nameCollection, setNameCollection] = useState<string>('');
  const [countClick, setCountClick] = useState<number>(0); // to count click on "done" button

  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();

  const handleSaveResource = async () => {
    if (nameCollection) {

      // Create the new collection
      await addCollection(nameCollection);
      // const id_new = await addCollection(nameCollection);
      // console.log("id_new", id_new);

      onClose();
    } else {
      addToast({
        message: 'Write a name for the collection!',
        type: 'error',
      });
    }
  };

  const handleCloseCollectionModal = () => {
    onClose();
  };

  // Add the resource after the new collection is created
  useEffect(() => {
    // this to know if the collection is create
    if (!isFolderButton) {
      const fetchData = async () => {
        // console.log("adding resource////")
        // Add resource to the new collection
        await addResource(collections[collections.length - 1].id, oerToAddCollection);  // The new collection is the last of the array
      };

      // Call the function when the collection is really created
      if (hydrated)
        fetchData();
    }
  }, [collections.length]); // Trigger when the collections change


  return (
    <Modal isOpen={isOpen} onClose={handleCloseCollectionModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            isInvalid={
              (!nameCollection && countClick > 0) ||
              nameCollection.length === maxLength
            }
          >
            <FormLabel>Enter a name for the collection</FormLabel>
            <Input
              placeholder="New collection..."
              value={nameCollection}
              onChange={(e) => {
                //console.log(e.target.value);
                const newValue = e.target.value.slice(0, maxLength);
                setNameCollection(newValue);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setCountClick(countClick + 1);
                  handleSaveResource();
                }
              }}
              errorBorderColor={
                nameCollection.length === maxLength
                  ? 'warning_label'
                  : 'error_label'
              }
            />
            {nameCollection.length === maxLength && (
              <FormErrorMessage color="warning_label">
                Length max 30!
              </FormErrorMessage>
            )}
            {!nameCollection && countClick > 0 && (
              <FormErrorMessage color="error_label">
                Write a name for the collection!
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              mr={3}
              disabled={false}
              onClick={(e) => {
                e.preventDefault();
                setCountClick(countClick + 1);
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
  );
}
