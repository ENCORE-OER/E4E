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
  modalText: string;
  modalHeader: string;
  confirmButtonColorScheme: string;
  confirmButtonText: string;
  borderModal?: string | number;
  borderColorModal?: string
};

export default function CustomAlertDialog({
  isOpen,
  onClose,
  onConfirm,
  modalText,
  modalHeader,
  confirmButtonColorScheme,
  confirmButtonText,
  borderModal,
  borderColorModal
}: DeleteAlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent border={borderModal} borderColor={borderColorModal}>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalText}</ModalBody>

        <ModalFooter gap="3">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            colorScheme={confirmButtonColorScheme}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          //ml={3}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
