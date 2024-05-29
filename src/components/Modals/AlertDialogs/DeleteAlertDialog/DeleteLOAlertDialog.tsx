import DeleteAlertDialog from './DeleteAlertDialog';

type DeleteLOAlertDialogProps = {
  handleDeleteLO: (index: number) => void;
  index: number;
  isDeleteAlertDialogOpen: boolean;
  onCloseDeleteAlertDialog: () => void;
};

export default function DeleteLOAlertDialog({
  handleDeleteLO,
  index,
  isDeleteAlertDialogOpen,
  onCloseDeleteAlertDialog,
}: DeleteLOAlertDialogProps) {
  return (
    <DeleteAlertDialog
      isOpen={isDeleteAlertDialogOpen}
      onClose={onCloseDeleteAlertDialog}
      onConfirm={() => {
        handleDeleteLO(index);
        onCloseDeleteAlertDialog();
      }}
      modalText={`This is the last LO. \n
             To continue with the creation of the lesson plan you will have at least 1 learning objective.\n
            Are you sure to delete this learning objective?`}
    />
  );
}
