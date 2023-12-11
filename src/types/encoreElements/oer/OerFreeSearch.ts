import {
  OerAudienceInfo,
  OerAuthorsInfo,
  OerConceptInfo,
  OerMediaTypeInfo,
  OerResourceFormatInfo,
  OerSkillInfo,
  OerSourceRoerInfo,
  OerSubjectInfo,
  OerUrlInfo,
} from '.';

export type OerFreeSearchProps = {
  id: number;
  title: string;
  description: string;
  publication_date: string;
  retrieval_date: string;
  total_likes: number;
  times_used: number;
  overall_score: number;
  language: string;
  rights: string;
  green_domain: boolean;
  digital_domain: boolean;
  entrepreneurship_domain: boolean;
  skills: OerSkillInfo[];
  creator: OerAuthorsInfo[];
  publisher: OerAuthorsInfo[];
  contributor: OerAuthorsInfo[];
  subject: OerSubjectInfo[];
  concepts: OerConceptInfo[];
  coverage: OerAudienceInfo[];
  resource_format: OerResourceFormatInfo[];
  media_type: OerMediaTypeInfo[];
  oer_url: OerUrlInfo[];
  source_roer: OerSourceRoerInfo[];
  search_rank: number;
};
