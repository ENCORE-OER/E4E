import CustomAlertDialog from '.';

type OverwriteAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalText: string;
};

export default function OverwriteAlertDialog({
  isOpen,
  onClose,
  onConfirm,
  modalText,
}: OverwriteAlertDialogProps) {
  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onConfirm();
        onClose();
      }}
      modalText={modalText}
      modalHeader="Re-Generate learning objective(s)"
      confirmButtonColorScheme="green"
      confirmButtonText="Confirm"
    />
  );
}
