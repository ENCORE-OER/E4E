import { OerConceptInfo } from './OerConcept';
import { OerSkillInfo } from './OerSkill';

// storage only the main info of the oer
export type OerInCollectionProps = {
  id: number;
  title: string;
  description: string;
  skills?: OerSkillInfo[];
  concepts: OerConceptInfo[];
  urlSource: string[] | string;
  generated_by_ai: boolean;
  //likes: boolean;
};
