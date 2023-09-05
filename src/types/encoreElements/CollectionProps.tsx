import { OerConceptInfo, OerInCollectionProps } from './oer';

export type CollectionProps = {
  id: number;
  name: string;
  oers: OerInCollectionProps[];
  conceptsSelected: OerConceptInfo[];
  color?: string;
  date?: Date;
};
