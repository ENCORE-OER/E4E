import { OerInCollectionProps } from '../oer';

export type AddResourceFunction = (
  collectionId: number,
  resource: OerInCollectionProps
) => Promise<void>;
