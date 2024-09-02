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
import { useState } from 'react';
import { CollectionProps } from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';

interface RenameCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: CollectionProps;
  renameCollection: (id: number, newName: string) => Promise<void>;
  maxLength: number; // Maximum length for the collection name
}

export default function RenameCollectionModal({
  isOpen,
  onClose,
  collection,
  renameCollection,
  maxLength,
}: RenameCollectionModalProps) {
  const [newName, setNewName] = useState<string>(collection.name);
  const [countClick, setCountClick] = useState<number>(0);

  const { addToast } = CustomToast();

  const handleRename = async () => {
    if (newName.trim()) {
      await renameCollection(collection.id, newName.trim());
      onClose();
    } else {
      addToast({
        message: 'Please enter a new name for the collection!',
        type: 'error',
      });
    }
  };

  const handleCloseCollectionModal = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseCollectionModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rename Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            isInvalid={
              (!newName && countClick > 0) || newName.length === maxLength
            }
          >
            <FormLabel>New name for the collection</FormLabel>
            <Input
              placeholder="Enter new name"
              value={newName}
              onChange={(e) => {
                const newValue = e.target.value.slice(0, maxLength);
                setNewName(newValue);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setCountClick(countClick + 1);
                  handleRename();
                }
              }}
              errorBorderColor={
                newName.length === maxLength ? 'warning_label' : 'error_label'
              }
            />
            {newName.length === maxLength && (
              <FormErrorMessage color="warning_label">
                Maximum length {maxLength} characters!
              </FormErrorMessage>
            )}
            {!newName && countClick > 0 && (
              <FormErrorMessage color="error_label">
                Please enter a name for the collection!
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
                handleRename();
              }}
              background="lightgreen"
              color="white"
            >
              Save
            </Button>
            <Button onClick={handleCloseCollectionModal}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
