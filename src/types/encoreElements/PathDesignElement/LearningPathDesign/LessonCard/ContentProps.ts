import { UploadedFilesProps } from '.';
import { OerInCollectionProps } from '../../../oer';

export type ContentProps = {
  oers: OerInCollectionProps[];
  uploadedFiles: UploadedFilesProps[];
  // uploadedFiles: string[];
};
