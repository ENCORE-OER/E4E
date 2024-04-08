import { ColorCollectionProps } from './collectionModal';

export type ExerciseInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  authors: (string | null)[];
  coverage: string[];
  fill_template?: string | null;
  fill_template_with_gaps?: string | null;
  n_o_w?: number | null;
  n_o_d?: number | null;
  n_o_ed?: number | null;
  n_o_ca?: number | null;
  options?: string[];
  question?: string | null;
  question_response?: string | null;
  source?: string;
  language?: string;
  type_of_exercise?: string | null; // This is used only for the multiple choice exercises
  type_of_question?: string | null; // This is used only for the open question exercises
  category?: string | null;
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  isGeneratedByAI: boolean;
  collectionsColor?: (ColorCollectionProps | undefined)[];
  assessment_oer_type?: string | null;
};
