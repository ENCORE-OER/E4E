import React from 'react';
import { OerMediaTypeInfo, OerProps } from '../types/encoreElements';
import { OerFreeSearchProps } from '../types/encoreElements/oer/OerFreeSearch';

interface DiscoveryContextProps {
  filtered: (OerProps | undefined | OerFreeSearchProps)[]; //not undefined to semplify the use of this array
  setFiltered: React.Dispatch<
    React.SetStateAction<(OerProps | undefined | OerFreeSearchProps)[]>
  >;
  byResourceType: OerMediaTypeInfo[] | undefined;
  setByResourceType: React.Dispatch<
    React.SetStateAction<OerMediaTypeInfo | undefined>
  >;
}

export const DiscoveryContext = React.createContext<DiscoveryContextProps>({
  filtered: [],
  setFiltered: () => void 0, // Set an empty function for 'setFiltered'
  byResourceType: undefined,
  setByResourceType: () => void 0,
});
