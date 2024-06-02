import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';

type EditDescriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentDescription: string;
  handleCurrentDescription: (newDescription: string) => void;
  saveDescription: () => void;
};

export default function EditDescriptionModal({
  isOpen,
  onClose,
  currentDescription,
  handleCurrentDescription,
  saveDescription,
}: EditDescriptionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold">Edit Description</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={currentDescription}
            onChange={(e) => handleCurrentDescription(e.target.value)}
            placeholder="Short summary of the activity"
            // fontSize="small"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={saveDescription}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
