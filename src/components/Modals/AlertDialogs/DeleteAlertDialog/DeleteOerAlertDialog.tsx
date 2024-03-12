import { Dispatch, SetStateAction } from 'react';
import { OerItemToDeleteProps } from '../../../../pages/resources';
import DeleteAlertDialog from './DeleteAlertDialog';

type DeleteOerAlertDialogProps = {
  handleDeleteResource: (
    collectionIndex: number,
    idOer: number
  ) => Promise<void>;
  isDeleteAlertDialogOpen: boolean;
  onCloseDeleteAlertDialog: () => void;
  OerItemToDelete: OerItemToDeleteProps | null;
  setOerItemToDelete: Dispatch<SetStateAction<OerItemToDeleteProps | null>>;
};

export default function DeleteOerAlertDialog({
  handleDeleteResource,
  isDeleteAlertDialogOpen,
  onCloseDeleteAlertDialog,
  OerItemToDelete,
  setOerItemToDelete,
}: DeleteOerAlertDialogProps) {
  return (
    <DeleteAlertDialog
      isOpen={isDeleteAlertDialogOpen}
      onClose={onCloseDeleteAlertDialog}
      onConfirm={() => {
        if (OerItemToDelete) {
          handleDeleteResource(
            OerItemToDelete.collectionIndex,
            OerItemToDelete.oer_id
          );
          setOerItemToDelete(null);
        }
        onCloseDeleteAlertDialog();
      }}
      item_name={OerItemToDelete ? OerItemToDelete.oer_title : ''}
      modalText={`You have selected one or more concepts referred to this Oer.
      If you delete it, the concepts could be removed.\n
      Are you sure you want to delete`}
    />
  );
}
