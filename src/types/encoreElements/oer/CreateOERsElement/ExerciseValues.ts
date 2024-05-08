import { OptionsData } from './OptionsData';

export type ExerciseValues = {
  assessment_oer_type: string;
  temperature: number;
  type_of_assignment: string;
  target_level: number;
  question: string;
  solution: string;
  number_of_correct_answer: number;
  number_of_distractors: number;
  number_of_easy_distractors: number;
  coding_starter_code: string;
  coding_test_cases: string[];
  fill_template: string;
  fill_template_with_gaps: string;
  options: OptionsData[];
};
