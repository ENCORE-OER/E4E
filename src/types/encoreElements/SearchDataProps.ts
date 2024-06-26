export type SearchDataProps = {
  page: number;
  keywords: string[];
  domains: string[] | number[];
  types: string[] | number[];
  audience: string[] | number[];
  order_by: string;
  order_asc: string;
  operator: string;
  concepts: string[] | number[];
  isDomainsFilter: boolean;
  isTypesFilter: boolean;
};
