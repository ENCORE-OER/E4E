import { ExerciseValues } from './ExerciseValues';

export type OerData = {
  title: string;
  description: string;
  publication_date: string;
  source: string;
  language: string;
  learning_objective: string;
  topic: string;
  assessment_oer: boolean;
  added_externally: boolean;
  generated_by_ai: boolean;
  exercise_values: ExerciseValues;
};
