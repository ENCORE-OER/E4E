import { OptionsData } from './OptionsData';

export type ExerciseValue = {
  question: string;
  fill_template: string;
  fill_template_with_gaps: string;
  category: string;
  type: string;
  number_of_correct_answer: number;
  number_of_easy_distractors: number;
  number_of_distractors: number;
  number_of_words: number;
  options: OptionsData[];
  solution: string;
};
