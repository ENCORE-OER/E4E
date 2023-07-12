import React from 'react';

interface DiscoveryContextProps {
  filtered: any;
  setFiltered: React.Dispatch<React.SetStateAction<any>>;
  byResourceType: any;
  setByResourceType: React.Dispatch<React.SetStateAction<any>>;
}

export const DiscoveryContext = React.createContext<DiscoveryContextProps>({
  filtered: undefined,
  setFiltered: () => void 0, // Set an empty function for 'setFiltered'
  byResourceType: undefined,
  setByResourceType: () => void 0,
});
