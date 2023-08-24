import { OerDomainInfo } from './OerDomain';

export type OerSkillInfo = {
  id: number;
  domain: OerDomainInfo[];
  label: string;
  description: string;
  alt_label?: string;
  relevance?: number | null;
};
