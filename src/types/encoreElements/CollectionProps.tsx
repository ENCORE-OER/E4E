import { OerInCollectionProps } from './oer';

export type CollectionProps = {
  id: number;
  name: string;
  oers: OerInCollectionProps[];
  color?: string;
  date?: Date;
};
