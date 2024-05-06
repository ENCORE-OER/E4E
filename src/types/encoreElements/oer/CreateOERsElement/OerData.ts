import { QuizQuestion } from './QuizQuestion';

export type OerData = {
  title: string;
  description: string;
  publication_date: string;
  source: string;
  language: string;
  assessment_oer: boolean;
  added_externally: boolean;
  assessment_oer_type: string;
  generated_by_ai: boolean;
  level: string;
  number_of_distractors: number;
  number_of_words: number; //at the moment isnt used
  temperature: number;
  type_of_exercise: string;
  number_of_correct_answer: number;
  number_of_easy_distractors: number;
  quiz_questions: QuizQuestion[];
  fill_template: string;
  fill_template_with_gaps: string;
};
