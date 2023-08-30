import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type DeleteAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  collection_name: string;
  //isConfirmDialogOpen: boolean;
  //setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteAlertDialog({
  isOpen,
  collection_name,
  onClose,
  onConfirm,
}: DeleteAlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deleting confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This collection is not empty. Are you sure to delete{' '}
          <strong>{collection_name}</strong> collection?
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            ml={3}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
