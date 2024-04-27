import { ExerciseValues } from './ExerciseValues';

export type OerData = {
  title: string;
  description: string;
  publication_date: string;
  language: string;
  generated_by_ai: boolean;
  assessment_oer: boolean;
  assessment_oer_type: string;
  source: string;
  level: string;
  temperature: number;
  exercise_values: ExerciseValues | null;
};
