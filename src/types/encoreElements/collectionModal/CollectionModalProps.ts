import { OerProps } from '../oer';

export type CollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  oerToSave?: OerProps | null;
};
