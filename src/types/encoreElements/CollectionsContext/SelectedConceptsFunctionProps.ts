import { OerConceptInfo } from '../oer';

export type SelectedConceptsFunction = (
  collectionId: number,
  concepts: OerConceptInfo[]
) => Promise<void>;
