import React from 'react';
import { OerProps } from '../types/encoreElements';

interface DiscoveryContextProps {
  filtered: OerProps[]; //not undefined to semplify the use of this array
  setFiltered: React.Dispatch<React.SetStateAction<OerProps[]>>;
  byResourceType: any;
  setByResourceType: React.Dispatch<React.SetStateAction<any>>;
}

export const DiscoveryContext = React.createContext<DiscoveryContextProps>({
  filtered: [],
  setFiltered: () => void 0, // Set an empty function for 'setFiltered'
  byResourceType: undefined,
  setByResourceType: () => void 0,
});
