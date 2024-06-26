import { Flex, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import {
  ISet,
  ISetLike,
  VennDiagram,
  asSets,
  mergeColors,
} from '@upsetjs/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDiscoveryContext } from '../../../Contexts/discoveryContext';
import { APIV2 } from '../../../data/api';
import { MetricsOers, OerProps } from '../../../types/encoreElements';
import { OerFreeSearchProps } from '../../../types/encoreElements/oer/OerFreeSearch';
import {
  extractSetIds,
  useHasHydrated,
  useIsSmallerScreen,
} from '../../../utils/utils';
import InfoTabDomainsTextBox from '../../TextBox/InfoTextBox/InfoTabDomainsTextBox';
export type TabDomainsProps = {};

// const baseSets = [
//   { name: 'DIGITAL', elems: [], domainId: 'Digital' },
//   { name: 'GREEN', elems: [], domainId: 'Green' },
//   { name: 'ENTERPRENEURSHIP', elems: [], domainId: 'Entrepreneurship' },
// ];

type baseSetsProps = {
  id: number;
  name: string;
  elems: any[];
  domainLabel: string;
  domainId: number;
};

export const TabDomains = ({ }: TabDomainsProps) => {
  const API = useMemo(() => new APIV2(undefined), []);
  const router = useRouter();
  const hydrated = useHasHydrated();
  const isSmallerScreen = useIsSmallerScreen();

  const {
    filtered,
    setCurrentPage,
    originalDomainsQueryParams,
    domainsSelected,
    setDomainsSelected,
    // setFiltered
  } = useDiscoveryContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<ISet[]>([]);
  // const [totalOers, setTotalOers] = useState<string[]>([]);

  const filteredOers: any = {};

  // const [previousContent, setPreviousContent] = useState<
  //   (OerProps | undefined | OerFreeSearchProps)[]
  // >([]);

  // ============================ VENN DIAGRAM ============================
  // To make the venn diagram responsive
  const vennDiagramWidth = useBreakpointValue({
    base: 450, // width for smaller screens
    sm: 450, // width for small screens
    md: 550, // width for medium screens
    //lg: 600, // width for large screens
    //xl: 650, // width for extra large screens
  });

  const vennDiagramHeight = useBreakpointValue({
    base: 350, // height for smaller screens
    sm: 350, // height for small screens
    md: 450, // height for medium screens
    //lg: 500, // height for large screens
    //xl: 550, // height for extra large screens
  });
  // =======================================================================

  // here i sorted the oers per domain

  /**
   * Like this {"GREEN" :[oer1,oer2,..], "DIGITAL": []}
   */
  // filtered?.forEach(
  //   (oer: { skills: { domain: OerDomainInfo[] }[]; id: number }) =>
  //     oer.skills?.forEach((skill: { domain: OerDomainInfo[] }) => {
  //       skill.domain?.forEach((domain) => {
  //         if (!filteredOers[domain.name])
  //           filteredOers[domain.name] = {
  //             name: domain.name?.toUpperCase(),
  //             elems: [],
  //             domainId: domain.name,
  //           };
  //         filteredOers[domain.name].elems.push(oer.id + '');
  //       });
  //     })
  // );

  filtered?.forEach(
    (
      oer:
        | {
          green_domain: boolean;
          digital_domain: boolean;
          entrepreneurship_domain: boolean;
          id: number;
        }
        | OerProps
        | undefined
        | OerFreeSearchProps
    ) => {
      if (oer !== undefined) {
        if (
          oer.green_domain ||
          oer.digital_domain ||
          oer.entrepreneurship_domain
        ) {
          if (oer.green_domain) {
            addToFilteredOers('Green', oer.id);
          }
          if (oer.digital_domain) {
            addToFilteredOers('Digital', oer.id);
          }
          if (oer.entrepreneurship_domain) {
            addToFilteredOers('Entrepreneurship', oer.id);
          }
        }
      }
    }
  );

  function addToFilteredOers(domainName: string, oerId: number) {
    if (!filteredOers[domainName]) {
      filteredOers[domainName] = {
        name: domainName.toUpperCase(),
        elems: [],
        domainId: domainName,
      };
    }
    filteredOers[domainName].elems.push(oerId + '');
  }

  // const dynamicSet = Object.keys(filteredOers)?.map((index: string) => {
  //   const revised = filteredOers[index];
  //   revised.elems = [...new Set(revised.elems)];
  //   return revised;
  // });

  const [selection, setSelection] = useState<
    ISetLike<unknown> | unknown[] | null
  >(null);

  // const sets = useMemo(() => {
  //   const colors = [
  //     '#49B61A',
  //     '#03A8B9',
  //     '#FFCF24',
  //     'white',
  //     'white',
  //     'white',
  //     'red',
  //   ];
  //   return asSets(
  //     (dynamicSet ?? baseSets).map((s, i) => ({
  //       ...s,
  //       color: colors[i],
  //       fontColor: 'white',
  //     }))
  //   );
  // }, [dynamicSet]);

  const combinations = useMemo(() => ({ mergeColors }), []);

  const updateQuery = async (newDomainIds: number[], isFilter: boolean) => {
    // Get search data from the localStorage
    const searchData = localStorage.getItem('searchData');

    if (!searchData) {
      console.error('searchData not found in localStorage');
      // TODO: handle redirect
      router.replace({
        pathname: '/',
      });
      return;
    }

    // Convert the data in a JSON format
    const convertedData = JSON.parse(searchData);
    // const domains = convertedData['domains'] || [''];
    const updatedDomains = [...newDomainIds];

    // Update the concepts array in the searchData object
    convertedData['domains'] = updatedDomains;

    // console.log('convertedData - domains', convertedData['domains']);

    convertedData['isDomainsFilter'] = isFilter;

    // Update the searchData in the localStorage
    localStorage.setItem('searchData', JSON.stringify(convertedData));

    // Update the query with the selected domains
    const updatedQuery = { ...router.query, domains: updatedDomains };
    await router.replace({
      pathname: '/discover',
      query: updatedQuery,
    });
  };

  const onClickDiagram = async (selection: any) => {
    // This to disabilitate section that has zero elems
    if (!selection || selection.elems.length === 0) return;

    // TODO: For each selection I have to set a specific API call, for example if the selection is the part with green and digital, I have to call the API with and_skill_domains=ID&and_skill_domains=ID

    // Convert the selected OER IDs to an array
    // const temp = selection.elems;
    // const selectedDomains = temp?.map((elem: IBaseSet) => elem.toString());
    // const selectedDomains = temp?.map((domain: any, index: number) => domain.get(index));
    // console.log("Filtered OER IDs", selectedDomains);
    // console.log(selection);
    // console.log('SET NAME:', selection?.name);
    const nameSelection = selection?.name;
    const domainIds = extractSetIds(nameSelection);
    // console.log(domainIds);
    // const involvedDomainIds = selection.sets.map((setId: number) => {
    //   const set = metrics.find((s: IExtendedSet) => s.id === setId);
    //   return set ? set.domainId : null;
    // }).filter((domainId: number | null) => domainId !== null);

    // console.log("INVOLVED DOMAINS: ", involvedDomainIds);

    // Check whether the selected portion shouldn't be execute
    if (domainIds.length === 0) {
      return;
      // Check if the selected IDs are equal to the currently selected IDs
    } else if (arraysEqual(domainIds, domainsSelected)) {
      // Second click on the same slice, reset to initial state
      // Reset the query

      setCurrentPage(1);
      setDomainsSelected([]);
      await updateQuery(originalDomainsQueryParams, false);

      // setSelectedOERIds([]);
      // setFiltered(previousContent);

      // TODO: initial API call
    } else {
      // First click on a slice, update the query
      setDomainsSelected(domainIds);
      setCurrentPage(1);
      await updateQuery(domainIds, true);

      // setPreviousContent(filtered);

      // Filter the displayed OERs based on the selected IDs
      // const filteredObjects = filtered.filter(
      //   (oer: OerProps | undefined | OerFreeSearchProps) => {
      //     if (oer) {
      //       selectedIds.includes(oer?.id.toString())
      //     }
      //   }
      // );
      // setFiltered(filteredObjects);
    }
  };

  // Function to check if two arrays are equal
  const arraysEqual = (
    arr1: string[] | number[],
    arr2: string[] | number[]
  ) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // update metrics
  useEffect(() => {
    // inside useEffect is not allowed to use async directly. You have to create a function inside useEffect and call it immediately.
    const fetchData = async () => {
      try {
        const searchData = localStorage.getItem('searchData');
        if (!searchData) {
          // TODO: handle redirect
          router.replace({
            pathname: '/',
          });
          return;
        }
        const convertedData = JSON.parse(searchData);
        const keywords = convertedData['keywords'];
        const domains = convertedData['domains'];
        const types = convertedData['types'];
        const audience = convertedData['audience'];
        const operator = convertedData['operator'];
        const concepts = convertedData['concepts'];
        const isDomainsFilter = convertedData['isDomainsFilter'];
        const isTypesFilter = convertedData['isTypesFilter'];

        // api get the Encore Metrics (Num of Oers and IDs for each Skill)
        const resp_metrics: MetricsOers = await API.getMetricsTabDomains(
          keywords,
          domains,
          types,
          audience,
          operator,
          concepts,
          isDomainsFilter,
          isTypesFilter
        );
        console.log(
          'Metrics -----------> ' + JSON.stringify(resp_metrics?.total_oers)
        );
        // setTotalOers(resp_metrics?.total_oers);

        const digitalIds = resp_metrics?.digital_oers?.ids;
        const greenIds = resp_metrics?.green_oers?.ids;
        const entrepreneurialIds = resp_metrics?.entrepreneurial_oers?.ids;

        const baseSets: baseSetsProps[] = [
          {
            id: 0,
            name: 'DIGITAL',
            elems: [],
            domainLabel: 'Digital',
            domainId: 37,
          },
          {
            id: 1,
            name: 'GREEN',
            elems: [],
            domainLabel: 'Green',
            domainId: 38,
          },
          {
            id: 2,
            name: 'ENTREPRENEURSHIP',
            elems: [],
            domainLabel: 'Entrepreneurship',
            domainId: 39,
          },
        ];

        const colors = [
          '#03A8B9',
          '#49B61A',
          '#FFCF24',
          'white',
          'white',
          'white',
          'red',
        ];

        const newSet = asSets(
          baseSets.map((s: baseSetsProps, i: number) => ({
            ...s,
            id: i,
            color: colors[i],
            fontColor: 'white',
          }))
        );

        // Update the elems field for each set dynamically
        newSet[0].elems = digitalIds;
        newSet[1].elems = greenIds;
        newSet[2].elems = entrepreneurialIds;

        // Set metrics for the Venn Diagram
        setMetrics(newSet);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, [
    // API,
    JSON.stringify({
      // With these hack the useEffect should be trigger only one time if the parameters change in the same moment
      concepts: router.query.concepts,
      keywords: router.query.keywords,
      domains: router.query.domains,
      types: router.query.types,
      audience: router.query.audience,
      isDomainsFilter: router.query.isDomainsFilter,
    }),
    // router.query.isTypesFilter,
  ]);

  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Domains diagram shows how resources are distributed across the
          three domains of Digital, Green and Entrepreneurial. Click on a sector
          to filter the resources accordingly.
        </Text>
      </Stack>

      <br />
      <Flex justify="center">
        <br />
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        {!isLoading && filtered.length > 0 && hydrated && (
          <Flex direction={'column'} p={0} m={0}>
            <InfoTabDomainsTextBox />
            <VennDiagram
              className="venn-diagram"
              sets={metrics}
              //style={{ maxWidth: 600 }}
              width={Number(vennDiagramWidth)}
              height={Number(vennDiagramHeight)}
              selection={selection}
              onHover={setSelection}
              combinations={combinations}
              hasSelectionOpacity={0.2}
              selectionColor=""
              onClick={onClickDiagram}
              fontSizes={
                isSmallerScreen
                  ? {
                    setLabel: '12px',
                  }
                  : {
                    setLabel: '15px',
                  }
              }
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};
