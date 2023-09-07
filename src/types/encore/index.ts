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
} from '../encoreElements';

export type EncoreConceptMapNode = {
  node_id: number;
  name: string;
};

export type EncoreConceptMapEdge = {
  from: number;
  to: number;
};

export type EncoreConceptMap = {
  nodes: any[];
  edges: any[];
};

// this type is equal to "OerCard" in /encoreElement/oer/OerCard.ts. OerCard could be more updated.s
export type EncoreOer = {
  /* id: any;
  skills: any;
  title: string;
  domain: string;
  media_type: string;*/

  id: number;
  plain_text_summary: string;
  creator: OerAuthorsInfo[];
  publisher: any[] | null;
  contributor: any[] | null;
  coverage: OerAudienceInfo[];
  skills: OerSkillInfo[];
  concepts: OerConceptInfo[];
  media_type: OerMediaTypeInfo[];
  resource_format: OerResourceFormatInfo[];
  subject: OerSubjectInfo[];
  oer_url: OerUrlInfo;
  source_roer: OerSourceRoerInfo[];
  title: string;
  description: string;
  publisher_source: string;
  publication_date: string;
  retrieval_date: string;
  source: string;
  language: string;
  related_to: string;
  rights: string;
  green_domain: boolean;
  digital_domain: boolean;
  entrepreneurship_domain: boolean;
  table_of_contents: string;
  detailed_subject: string;
  completeness_score: number;
  authority_score: number;
  readability_score: number;
  overall_score: number;
  detailed_media_type: number[];
  detailed_coverage: number[];
};

export type ConceptNode = {
  data: { numOfResources?: number };
};
