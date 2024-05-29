import OverwriteAlertDialog, {
  OverwriteAlertDialogProps,
} from './OverwriteAlertDialog';

export default function OverwriteLOAlertDialog({
  isOpen,
  onClose,
  onConfirm,
}: OverwriteAlertDialogProps) {
  return (
    <OverwriteAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      modalText="The previous generated learning objectives will be overwritten, are you sure to continue?"
      modalHeader="Re-Generate learning objective(s)"
    />
  );
}
