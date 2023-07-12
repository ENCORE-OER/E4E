import { Stack, Text } from '@chakra-ui/react';
import { ISetLike, VennDiagram, asSets, mergeColors } from '@upsetjs/react';
import { useContext, useMemo, useState } from 'react';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { useHasHydrated } from '../../../utils/utils';
export type TabDomainsProps = {
};




const baseSets = [
  { name: 'DIGITAL', elems: [], domainId: "Digital" },
  { name: 'GREEN', elems: [], domainId: "Green" },
  { name: 'ENTERPRENEURSHIP', elems: [], domainId: "Entrepreneurship" },
];



export const TabDomains = ({ }: TabDomainsProps) => {
  const hydrated = useHasHydrated();
  // const { oers, domains, searchCallBack } = props;
  //const { oers } = props;
  //  const API = useMemo(() => new APIV2(undefined), []);
  const { filtered } = useContext(DiscoveryContext);

  //console.log(oers?.length);

  // here I filter the Oers and I should add these as new elments in the static

  //const digitalIdsoers = oers?.filter((oer) => oer.skills?.some((skill: { domain: any[]; }) => skill.domain.some((domain) => domain.name === "Digital"))).map((oer) => oer);

  const filteredOers: any = {}

  // oers?.filter((oer) => oer.skills?.some((skill: { domain: any[]; }) => skill.domain.forEach((domain) => filteredOers[domain.name] = )).map((oer) => oer);

  // here i sorted the oers per domain

  /**
   * Like this {"GREEN" :[oer1,oer2,..], "DIGITAL": []}
   */
  filtered?.forEach((oer: { skills: { domain: any[]; }[]; id: string; }) => oer.skills.forEach((skill: { domain: any[]; }) => {
    skill.domain.forEach((domain) => {
      if (!filteredOers[domain.name]) filteredOers[domain.name] = { name: domain.name?.toUpperCase(), elems: [], domainId: domain.name };
      filteredOers[domain.name].elems.push(oer.id + "");
    })
  }));


  const dynamicSet = Object.keys(filteredOers)?.map((index: string) => {
    const revised = filteredOers[index];
    revised.elems = [...new Set(revised.elems)];
    return revised;
  });


  const [selection, setSelection] = useState<ISetLike<unknown> | unknown[] | null>(null);
  // const [value, setValue] = useState(3);
  // const changeValue = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue(e.target.valueAsNumber);
  //   },
  //   [setValue]
  // );
  // const select = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSelection(
  //       Array.from(e.target.closest('div')?.querySelectorAll<HTMLInputElement>('input:checked') ?? []).map(
  //         (d) => d.valueAsNumber
  //       )
  //     );
  //   },
  //   [setSelection]
  // );

  // Probably this is the problem
  const sets = useMemo(() => {
    const colors = ['#03A8B9', '#49B61A', '#FFCF24', 'white', 'white', 'white', 'red'];
    return asSets((dynamicSet ?? baseSets).map((s, i) => ({ ...s, color: colors[i], fontColor: 'white' })));
  }, [dynamicSet]);




  const combinations = useMemo(() => ({ mergeColors }), []);


  const onClickDiagram = async (selection: any) => {
    if (!selection) return;
    // const Oers: any[] = [];
    // const domainIds = [...selection.sets].map((set) => set.domainId);


    /*?? check here
    filtered?.forEach((oer: { skills: { domain: any[]; }[]; id: string; }) => oer.skills.forEach((skill: { domain: any[]; }) => {
      skill.domain.forEach((domain) => {
        if (!filteredOers[domain.name]) filteredOers[domain.name] = { name: domain.name?.toUpperCase(), elems: [], domainId: domain.name };
        Oers.push(oer);
      })
    }));
*/


  }




  return (

    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Domains diagram shows how resources are distributed across the three domains of Digital, Green and Entrepreneurial.
          Click on a sector to filter the resources accordingly.
        </Text>
      </Stack>

      <br />
      <div>
        {hydrated ? (
          <VennDiagram
            sets={sets}
            width={550}
            height={450}
            selection={selection}
            onHover={setSelection}
            combinations={combinations}
            hasSelectionOpacity={0.2}
            selectionColor=""
            onClick={onClickDiagram}
          />
        ) : "loading..."}

      </div >

    </>
  );
};
