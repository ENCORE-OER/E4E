import { OerProps } from './Oer';
import { OerFreeSearchProps } from './OerFreeSearch';

export type RespDataProps = {
  data: (OerProps | OerFreeSearchProps | undefined)[];
  recordsFiltered: number;
  recordsTotal: number;
  draw: number;
};
