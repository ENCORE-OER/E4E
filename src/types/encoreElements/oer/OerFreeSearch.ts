import {
  OerAudienceInfo,
  OerAuthorsInfo,
  OerConceptInfo,
  OerMediaTypeInfo,
  OerQuizQuestionInfo,
  OerResourceFormatInfo,
  OerSkillInfo,
  OerSourceRoerInfo,
  OerSubjectInfo,
  OerUrlInfo,
} from '.';

// TODO: check if is necessary anymore and remove if not

export type OerFreeSearchProps = {
  // id: number;
  // title: string;
  // description: string;
  // publication_date: string | null;
  // retrieval_date: string;
  // total_likes: number;
  // times_used: number;
  // overall_score: number;
  // language: string;
  // rights: string;
  // green_domain: boolean;
  // digital_domain: boolean;
  // entrepreneurship_domain: boolean;
  // //skills: OerSkillInfo[];
  // creator: OerAuthorsInfo[];
  // publisher: OerAuthorsInfo[];
  // contributor: OerAuthorsInfo[];
  // subject: OerSubjectInfo[];
  // concepts: OerConceptInfo[];
  // coverage: OerAudienceInfo[];
  // resource_format: OerResourceFormatInfo[];
  // media_type: OerMediaTypeInfo[];
  // oer_url: OerUrlInfo[];
  // source_roer: OerSourceRoerInfo[];
  // search_rank: number;

  id: number;
  plain_text_summary: string | null;
  creator: OerAuthorsInfo[];
  publisher: OerAuthorsInfo[];
  contributor: OerAuthorsInfo[];
  coverage: OerAudienceInfo[];
  skills: OerSkillInfo[];
  concepts: OerConceptInfo[];
  media_type: OerMediaTypeInfo[];
  detailed_media_type: OerMediaTypeInfo[];
  detailed_coverage: OerAudienceInfo[];
  feedback: any[];
  flags: any[];
  resource_format: OerResourceFormatInfo[];
  subject: OerSubjectInfo[];
  oer_url: OerUrlInfo[];
  source_roer: OerSourceRoerInfo[];
  aggregated_info: string;
  title: string;
  description: string;
  publisher_source: string | null;
  publication_date: string;
  retrieval_date: string | null;
  source: string;
  language: string | null;
  related_to: string | null;
  rights: string | null;
  green_domain: boolean;
  digital_domain: boolean;
  entrepreneurship_domain: boolean;
  table_of_contents: string | null;
  detailed_subject: string | null;
  completeness_score: number | null;
  authority_score: number | null;
  readability_score: number | null;
  overall_score: number | null;
  added_externally: boolean | null;
  external_likes: number;
  total_likes: number;
  times_used: number;
  instructional_oer: boolean;
  assessment_oer: boolean;
  assessment_oer_type: string | null;
  generated_by_ai: boolean;
  level: string | null; // Level should be merge with "coverage" and "detailed_coverage
  number_of_distractors: number | null;
  number_of_words: number | null;
  temperature: number | null;
  type_of_exercise: string | null;
  number_of_correct_answer: number | null;
  number_of_easy_distractors: number | null;
  quiz_questions: OerQuizQuestionInfo[];
  type_of_question: string | null;
  category: string | null;
  question: string | null;
  question_response: string | null;
  coding_starter_code: any | null;
  coding_test_cases: any[];
  fill_template: string | null;
  fill_template_with_gaps: string | null;
  options: string[];
  search_rank?: number | null;
};
