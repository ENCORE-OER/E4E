import CustomAlertDialog from '..';

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
    <CustomAlertDialog
      isOpen={isOpen}
      item_name={item_name}
      onClose={onClose}
      onConfirm={onConfirm}
      modalText={modalText}
      modalHeader="Deleting confirm"
      confirmButtonColorScheme="red"
      confirmButtonText="Delete"
    />
  );
}
