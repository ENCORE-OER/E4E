import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { OerProps } from '../types/encoreElements';
import { OerFreeSearchProps } from '../types/encoreElements/oer/OerFreeSearch';

type DiscoveryContextProps = {
  filtered: (OerProps | undefined | OerFreeSearchProps)[]; //not undefined to semplify the use of this array
  setFiltered: Dispatch<
    SetStateAction<(OerProps | undefined | OerFreeSearchProps)[]>
  >;
  // byResourceType: OerMediaTypeInfo[] | undefined;
  // setByResourceType: React.Dispatch<
  //   React.SetStateAction<OerMediaTypeInfo | undefined>
  // >;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  originalTypesQueryParams: number[];
  setOriginalTypesQueryParams: Dispatch<SetStateAction<number[]>>;
  originalDomainsQueryParams: number[];
  setOriginalDomainsQueryParams: Dispatch<SetStateAction<number[]>>;
  typesSelected: string[];
  setTypesSelected: Dispatch<SetStateAction<string[]>>;
  domainsSelected: number[];
  setDomainsSelected: Dispatch<SetStateAction<number[]>>;
  conceptsSelected: string[];
  setConceptsSelected: Dispatch<SetStateAction<string[]>>;
  // originalSearchData: SearchDataProps | null;
  // setOriginalSearchData: Dispatch<SetStateAction<SearchDataProps | null>>;
};

export const DiscoveryContext = createContext<DiscoveryContextProps>(
  {} as DiscoveryContextProps
);

export const useDiscoveryContext = () => useContext(DiscoveryContext);

export const DiscoveryProvider = ({ children }: any) => {
  const [filtered, setFiltered] = useState<
    (OerProps | OerFreeSearchProps | undefined)[]
  >([]); // used for the list of resourcess to show

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Discover tabs utilities
  const [originalTypesQueryParams, setOriginalTypesQueryParams] =
    useLocalStorage<number[]>('originalTypesQueryParams', []);
  const [originalDomainsQueryParams, setOriginalDomainsQueryParams] =
    useLocalStorage<number[]>('originalDomainsQueryParams', []);
  const [typesSelected, setTypesSelected] = useState<string[]>([]);
  const [domainsSelected, setDomainsSelected] = useState<number[]>([]);
  const [conceptsSelected, setConceptsSelected] = useState<string[]>([]);

  // const [originalSearchData, setOriginalSearchData] =
  //   useLocalStorage<SearchDataProps | null>('originalSearchData', null);

  // const [originalSearchData, setOriginalSearchData] =
  //   useState<SearchDataProps | null>(null);

  // useEffect(() => {
  //   console.log(originalSearchData);
  // }, [originalSearchData]);

  return (
    <DiscoveryContext.Provider
      value={{
        filtered,
        currentPage,
        conceptsSelected,
        domainsSelected,
        typesSelected,
        originalDomainsQueryParams,
        originalTypesQueryParams,
        // originalSearchData,
        setFiltered,
        setCurrentPage,
        setConceptsSelected,
        setDomainsSelected,
        setTypesSelected,
        setOriginalDomainsQueryParams,
        setOriginalTypesQueryParams,
        // setOriginalSearchData,
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};
