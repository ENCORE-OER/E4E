import CustomAlertDialog from '..';

type DeleteAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalText: string;
};

export default function DeleteAlertDialog({
  isOpen,
  onClose,
  onConfirm,
  modalText,
}: DeleteAlertDialogProps) {
  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      modalText={modalText}
      modalHeader="Deleting confirm"
      confirmButtonColorScheme="red"
      confirmButtonText="Delete"
    />
  );
}
