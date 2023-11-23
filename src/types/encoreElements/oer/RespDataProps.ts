import { OerProps } from './Oer';

export type RespDataProps = {
  data: OerProps[];
  recordsFiltered: number;
  recordsTotal: number;
  draw: number;
};
