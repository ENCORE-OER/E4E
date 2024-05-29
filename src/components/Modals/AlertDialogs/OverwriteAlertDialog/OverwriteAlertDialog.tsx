import CustomAlertDialog from '..';

export type OverwriteAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalText?: string;
  modalHeader?: string;
};

export default function OverwriteAlertDialog({
  isOpen,
  onClose,
  onConfirm,
  modalText,
  modalHeader
}: OverwriteAlertDialogProps) {
  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onConfirm();
        onClose();
      }}
      modalText={modalText || ''}
      modalHeader={modalHeader || ''}
      confirmButtonColorScheme="green"
      confirmButtonText="Confirm"
    />
  );
}
