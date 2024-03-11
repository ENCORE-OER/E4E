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
    modalHeader: string;
    confirmButtonColorScheme: string;
    confirmButtonText: string;
};

export default function CustomAlertDialog({
    isOpen,
    item_name,
    onClose,
    onConfirm,
    modalText,
    modalHeader,
    confirmButtonColorScheme,
    confirmButtonText,
}: DeleteAlertDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalHeader}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {modalText} <strong>{item_name}</strong>?
                </ModalBody>

                <ModalFooter gap='3'>
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
