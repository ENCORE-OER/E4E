import { OerProps } from '../oer';
import { OerFreeSearchProps } from '../oer/OerFreeSearch';

export type CollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  oerToSave?: OerProps | OerFreeSearchProps | null;
};
