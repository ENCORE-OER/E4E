import OverwriteAlertDialog, { OverwriteAlertDialogProps } from "./OverwriteAlertDialog";

export default function ContextOverwriteAlertDialog({
    isOpen,
    onClose,
    onConfirm
}: OverwriteAlertDialogProps) {
    return (
        <OverwriteAlertDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            modalText="The current context will be overwritten, are you sure to continue?"
            modalHeader="Set default context"
        />
    )
}