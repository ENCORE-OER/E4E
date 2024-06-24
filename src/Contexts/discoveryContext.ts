import React from 'react';
import { OerProps } from '../types/encoreElements';
import { OerFreeSearchProps } from '../types/encoreElements/oer/OerFreeSearch';

interface DiscoveryContextProps {
  filtered: (OerProps | undefined | OerFreeSearchProps)[]; //not undefined to semplify the use of this array
  setFiltered: React.Dispatch<
    React.SetStateAction<(OerProps | undefined | OerFreeSearchProps)[]>
  >;
  // byResourceType: OerMediaTypeInfo[] | undefined;
  // setByResourceType: React.Dispatch<
  //   React.SetStateAction<OerMediaTypeInfo | undefined>
  // >;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  originalTypesQueryParams: number[];
  // setOriginalTypesQueryParams: React.Dispatch<
  //   React.SetStateAction<string[] | number[]>
  // >;
  originalDomainsQueryParams: number[];
  // setOriginalDomainsQueryParams: React.Dispatch<
  //   React.SetStateAction<string[] | number[]>
  // >;
  typesSelected: string[];
  setTypesSelected: React.Dispatch<React.SetStateAction<string[]>>;
  domainsSelected: number[];
  setDomainsSelected: React.Dispatch<React.SetStateAction<number[]>>;
  conceptsSelected: string[];
  setConceptsSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DiscoveryContext = React.createContext<DiscoveryContextProps>({
  filtered: [],
  setFiltered: () => void 0, // Set an empty function for 'setFiltered'
  // byResourceType: undefined,
  // setByResourceType: () => void 0,
  setCurrentPage: () => void 0,
  originalTypesQueryParams: [],
  // setOriginalTypesQueryParams: () => void 0,
  originalDomainsQueryParams: [],
  // setOriginalDomainsQueryParams: () => void 0,
  typesSelected: [],
  setTypesSelected: () => void 0,
  domainsSelected: [],
  setDomainsSelected: () => void 0,
  conceptsSelected: [],
  setConceptsSelected: () => void 0,
});
