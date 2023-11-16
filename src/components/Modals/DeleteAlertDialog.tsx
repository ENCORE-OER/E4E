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
  item_name: string;
  modalText: string;
};

export default function DeleteAlertDialog({
  isOpen,
  item_name,
  onClose,
  onConfirm,
  modalText,
}: DeleteAlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deleting confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalText}{' '}
          <strong>{item_name}</strong>?
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
