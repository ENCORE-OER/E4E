import { OptionsData } from './OptionsData';

export type ExerciseValue = {
  question: string | null;
  fill_template: string | null;
  fill_template_with_gaps: string | null;
  category: string | null;
  type: string | null;
  number_of_correct_answer: number | null;
  number_of_easy_distractors: number | null;
  number_of_distractors: number | null;
  number_of_words: number | null;
  options: OptionsData | null;
  solution: string | null;
};
