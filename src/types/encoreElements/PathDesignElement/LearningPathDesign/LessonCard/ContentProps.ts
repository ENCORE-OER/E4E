import { OerInCollectionProps } from '../../../oer';

export type ContentProps = {
  oers?: OerInCollectionProps[];
  uploadedFile?: string[]; // TODO: study which type is better
};
