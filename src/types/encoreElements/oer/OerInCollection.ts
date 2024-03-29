import { OerConceptInfo } from './OerConcept';
import { OerSkillInfo } from './OerSkill';

// storage only the main info of the oer
export type OerInCollectionProps = {
  id: number;
  title: string;
  description: string;
  skills?: OerSkillInfo[];
  concepts: OerConceptInfo[];
  //likes: boolean;
};
