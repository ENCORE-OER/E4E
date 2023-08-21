import { OerConceptInfo } from './OerConcept';
import { OerSkillInfo } from './OerSkill';

// storage only the main info of the oer
export type OerInCollectionProps = {
  idOer: number;
  title: string;
  description: string;
  skills: OerSkillInfo[];
  concepts: OerConceptInfo[];
};
