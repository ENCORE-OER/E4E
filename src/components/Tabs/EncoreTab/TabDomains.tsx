import { Flex, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { ISetLike, VennDiagram, asSets, mergeColors } from '@upsetjs/react';
import { useContext, useMemo, useState } from 'react';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { OerProps } from '../../../types/encoreElements';
import { OerFreeSearchProps } from '../../../types/encoreElements/oer/OerFreeSearch';
import { useHasHydrated } from '../../../utils/utils';
export type TabDomainsProps = {};

const baseSets = [
  { name: 'DIGITAL', elems: [], domainId: 'Digital' },
  { name: 'GREEN', elems: [], domainId: 'Green' },
  { name: 'ENTERPRENEURSHIP', elems: [], domainId: 'Entrepreneurship' },
];

export const TabDomains = ({}: TabDomainsProps) => {
  const hydrated = useHasHydrated();

  const { filtered, setFiltered } = useContext(DiscoveryContext);

  const filteredOers: any = {};

  const [previousContent, setPreviousContent] = useState<
    (OerProps | undefined | OerFreeSearchProps)[]
  >([]);

  const [selectedOERIds, setSelectedOERIds] = useState([]);

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

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
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

  const dynamicSet = Object.keys(filteredOers)?.map((index: string) => {
    const revised = filteredOers[index];
    revised.elems = [...new Set(revised.elems)];
    return revised;
  });

  const [selection, setSelection] = useState<
    ISetLike<unknown> | unknown[] | null
  >(null);

  const sets = useMemo(() => {
    const colors = [
      '#49B61A',
      '#03A8B9',
      '#FFCF24',
      'white',
      'white',
      'white',
      'red',
    ];
    return asSets(
      (dynamicSet ?? baseSets).map((s, i) => ({
        ...s,
        color: colors[i],
        fontColor: 'white',
      }))
    );
  }, [dynamicSet]);

  const combinations = useMemo(() => ({ mergeColors }), []);

  /* const onClickDiagram = async (selection: any) => {
 
     if (!selection) return;
     const oerIds = selection.elems;
     updateOers(oerIds);
 
   };
 
 
   const updateOers = (ids: string[]) => {
     // 'filtered' is an array of OER objects
     // Filter the 'filtered' array to include only OERs with matching IDs
     const filteredOERs = filtered?.filter((oer: any) => ids.includes(oer.id.toString()));
     setFiltered(filteredOERs);
   };*/

  const onClickDiagram = async (selection: any) => {
    if (!selection) return;

    // Convert the selected OER IDs to an array
    const selectedIds = selection.elems;
    // Check if the selected IDs are equal to the currently selected IDs
    if (selectedIds.length == 0) {
      return;
    } else if (arraysEqual(selectedIds, selectedOERIds)) {
      // Second click on the same slice, reset to initial state
      setSelectedOERIds([]);
      setFiltered(previousContent);
    } else {
      // First click on a slice, update the selected OER IDs
      setSelectedOERIds(selectedIds);
      setPreviousContent(filtered);

      // Filter the displayed OERs based on the selected IDs
      const filteredObjects = filtered.filter(
        (oer: OerProps | undefined | OerFreeSearchProps) =>
          selectedIds.includes(oer?.id.toString())
      );
      setFiltered(filteredObjects);
    }
  };

  // Function to check if two arrays are equal
  const arraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

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
      <Flex>
        {filtered.length > 0 && hydrated && (
          <VennDiagram
            className="venn-diagram"
            sets={sets}
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
        )}
      </Flex>
    </>
  );
};
