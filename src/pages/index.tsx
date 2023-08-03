import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import Image from 'next/image';

import { useUser } from '@auth0/nextjs-auth0/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { asSets, VennDiagram } from '@upsetjs/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import AdvancedSearch from '../components/AdvancedSearch/AdvancedSearch';
import Navbar from '../components/NavBars/NavBarEncore';
import SearchBar from '../components/SearchBar/SearchBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { APIV2 } from '../data/api';
import icon_infocircle from '../public/Icons/icon_infocircle.svg';
import themeEncore from '../styles/theme';
import { useHasHydrated } from '../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const baseSets = [
  {
    name: 'DIGITAL',
    elems: [1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18],
    domainId: '25',
    label: 'Digital Set',
  },
  {
    name: 'GREEN',
    elems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 19, 20, 21, 22, 23],
    domainId: '26',
  },
  {
    name: 'ENTERPRENEURSHIP',
    elems: [1, 11, 12, 4, 5, 24, 25, 26, 27, 28, 29, 30],
    domainId: '27',
  },
];

const Home = (props: DiscoverPageProps) => {
  const hydrated = useHasHydrated();
  const [searchValue, setSearchValue] = useState<string[]>([]);
  //let searchValue: string[] = [];
  const [suggestions, setSuggestions] = useState<string[]>([]);
  //const suggestions: string[] = [];
  const [page] = useState(true);
  //  const [dataSkills, setDataSkills] = useState<any[]>([]);
  //const [dataOers, setDataOers] = useState<any[]>([]);
  const [respSearchOers] = useState<any[]>([]);
  const [oerById] = useState<any[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<any[]>([]);

  const [domain, setDomain] = useState<any[]>([]); // to save each type of domain of the resources
  const [subject, setSubject] = useState<string[]>([]);
  const [resourceTypes, setResourceTypes] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<any[]>([]); // to save each type of domain of the resources
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(
    []
  );
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  //const [audienceCard, setAudienceCard] = useState<string[]>([]);
  const [showBox, setShowBox] = useState(false); // used to show the options for the advanced search
  const [buttonName, setButtonName] = useState('Advanced Search');
  const [isClicked, setIsClicked] = useState(false); // used for the button advanced search
  const [dataSearching] = useState<any[]>([]); // save the data found from searching

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();

  const [checkboxAll, setCheckboxAll] = useState(false);
  const [checkboxOr, setCheckboxOr] = useState(false);

  // retrieve all the OERs and create the 3 sets divided for Green, Digital and Ent

  const sets = useMemo(() => {
    const colors = [
      '#03A8B9',
      '#49B61A',
      '#FFCF24',
      'white',
      'white',
      'white',
      'red',
    ];
    return asSets(
      baseSets.map((s, i) => ({ ...s, color: colors[i], fontColor: 'white' }))
    );
  }, []);
  //  const combinations = useMemo(() => ({ mergeColors }), []);

  // const combinations: { sets: string[]; size: number }[] = [
  //   { sets: ['DIGITAL'], size: 163 },
  //   { sets: ['GREEN'], size: 1220 },
  //   { sets: ['ENTREPRENEURSHIP'], size: 280 },
  //   { sets: ['DIGITAL', 'GREEN'], size: 254 },
  //   { sets: ['GREEN', 'ENTREPRENEURSHIP'], size: 452 },
  //   { sets: ['DIGITAL', 'ENTREPRENEURSHIP'], size: 4567 },
  //   { sets: ['DIGITAL', 'GREEN', 'ENTREPRENEURSHIP'], size: 97585 },
  // ];

  const handleDomainFromDropDownMenu = (data: any[]) => {
    setSelectedDomain(data);
  };

  const handleSubjectFromDropDownMenu = (data: any[]) => {
    setSelectedSubject(data);
  };

  const handleResourceTypeFromDropDownMenu = (data: any[]) => {
    setSelectedResourceTypes(data);
  };

  const handleAudienceFromDropDownMenu = (data: any[]) => {
    setSelectedAudience(data);
  };

  const searchCallback1 = async () => {
    if (selectedSkillIds.length == 0) return;
    router.push({
      pathname: '/discover',
      query: {
        skills: selectedSkillIds,
        andOption: checkboxAll,
        orOption: checkboxOr,
      },
    });
  };

  // const searchCallback = async (domainIds: string[], resourceTypeIds?: string[]) => {
  //   const api = new APIV2(props.accessToken);

  //   if (searchValue.length >= 0) {
  //     const oers = await api.searchOers(
  //       selectedSkillIds,
  //       domainIds ?? selectedDomain,
  //       selectedSubject,
  //       resourceTypeIds ?? selectedResourceTypes,
  //       selectedAudience
  //     );

  //     // console.log(oers);
  //     setRespSearchOers(oers);
  //     setPage(false);
  //   } else if (searchValue.length < 0) {

  //     const oers = await api.getOERs();
  //     //console.log(oers);

  //     //setDataOers(oers);

  //     /*const oersSkills = oers.map((oer: any) => oer.skills);
  //     console.log(oersSkills);
  //     // -------------- LABEL --------------
  //     const oersSkillsLabel = oersSkills?.flatMap(
  //       (skills: any, index: number) =>
  //         // use of [] to store more labels for the same id_oer in the same array
  //         skills.length > 0
  //           ? skills.map((skill: any) => ({
  //               id_oer: oers[index].id,
  //               skillLabel: skill.label,
  //             }))
  //           : {
  //               id_oer: oers[index].id,
  //               skillLabel: '',
  //             }
  //     );*/

  //     const oersSkillsLabel = oers?.flatMap((oer: any) => {
  //       if (oer.skills?.length > 0) {
  //         return oer.skills?.map((skill: any) => ({
  //           id_oer: oer.id,
  //           skillLabel: skill.label,
  //         }));
  //       } else {
  //         return {
  //           id_oer: oer.id,
  //           skillLabel: '',
  //         };
  //       }
  //     });

  //     //stampo tutte le etichette delle skill delle oers
  //     const labels = oersSkillsLabel?.map((element: any) => element.skillLabel);
  //     console.log('labels: ' + labels);

  //     // searching alhorithm

  //     /*searchValue.map((item: any) => {
  //       console.log(item);
  //       const res = labels.includes(item);
  //       console.log(res);
  //       if (res) {
  //         oersSkillsLabel.map((element: any) => {
  //           if (element.skillLabel === item) {
  //             setDataSearching((prev: any) => {
  //               const updateData = prev.filter(
  //                 (value: any) => value !== element.id_oer
  //               );
  //               return [...updateData, element.id_oer];
  //             });
  //           }
  //         });
  //       }
  //     });*/

  //     const filteredOers = oersSkillsLabel.filter((oer: any) =>
  //       searchValue.includes(oer.skillLabel)
  //     );
  //     const formattedOers = filteredOers.map((oer: any) => ({
  //       id_oer: oer.id_oer,
  //       skillLabel: oer.skillLabel,
  //     }));

  //     console.log(formattedOers);
  //     //setDataSearching(formattedOers);

  //     // find the oers that respect the search value
  //     /*const oers_list = filteredOers.map((oer) =>
  //       oers.find((item) => item.id === oer.id_oer)
  //     );*/
  //     setDataSearching(
  //       filteredOers.map((oer) => oers.find((item) => item.id === oer.id_oer))
  //     );

  //     console.log(dataSearching);

  //     /*setDataSearching(
  //       oers.map((oer) => oers.find((item) => item.id === oer.id_oer))
  //     )*/
  //   } else console.log('Write Something!');
  // };

  const handleAdvanceSearchClick = (e: any) => {
    e.preventDefault();
    if (showBox === false) {
      setButtonName('Close');
      setShowBox(true);
      setIsClicked(!isClicked);
    } else {
      setButtonName('Advanced Search');
      setShowBox(false);
      setIsClicked(!isClicked);
    }
  };

  useEffect(() => {
    console.log(oerById);
  }, [oerById]);

  useEffect(() => {
    const api = new APIV2(props.accessToken);

    // nella useEffect le funzioni async fanno fatte così, è sbagliato mettere async subito la prima
    (async () => {
      try {
        //api getDomains()
        const resp_dom = await api.getDomains();
        //const domName = resp_dom?.map((item: any) => item.name);
        console.log('Domain -----------> ' + resp_dom);
        setDomain(resp_dom);
        //api getSubjects()
        const resp_sub = await api.getSubjects();
        console.log('Subject -----------> ' + resp_sub);
        setSubject(resp_sub);

        //api getResourceTypes()
        const resp_res = await api.getResourceTypes();
        console.log('Type of reosource -----------> ' + resp_res);
        setResourceTypes(resp_res);
        //api getAudience()
        const resp_aud = await api.getAudience();
        console.log('Audience -----------> ' + resp_aud);
        setAudience(resp_aud);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log('SELECTED DOMAINS: ' + selectedDomain);
  }, [selectedDomain]);

  useEffect(() => {
    console.log('SELECTED SUBJECTS: ' + selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    console.log('SELECTED RESOURCE TYPES: ' + selectedResourceTypes);
  }, [selectedResourceTypes]);

  useEffect(() => {
    console.log('SELECTED AUDIENCE: ' + selectedAudience);
  }, [selectedAudience]);

  useEffect(() => {
    console.log('Total number subjects -----------> ' + subject.length);
  }, [subject]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const api = new APIV2(props.accessToken);
      (async () => {
        try {
          const skills = await api.getSkillsByText(searchValue.toString());
          setSuggestions(skills);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [searchValue]);

  useEffect(() => {
    if (dataSearching.length === 0) console.log('No result!');
    else {
      console.log('DATA SEARCHING: ' + dataSearching);
    }
  }, [dataSearching]);

  useEffect(() => {
    console.log('RESPONSE SEARCH: ' + respSearchOers);
    const data = respSearchOers.flatMap(
      (oer: any) => oer.media_type?.map((item: any) => item.name)
    );
    console.log(data);
    // respSearchOers?.map((oer: any) => {
    //   // const temp_aut = oer.media_type?.name;
    //   // const authorsOer = temp_aut?.length !== 0 ? temp_aut : ['Unknown'];
    //   // console.log('authorsOer: ' + authorsOer);
    //   //const domain = item.domains.map((obj: any) => obj.full_name);
    // });
  }, [respSearchOers, page]);

  const handleCheckboxAllChange = () => {
    setCheckboxAll(true);
    setCheckboxOr(false);
  };

  const handleCheckboxOrChange = () => {
    setCheckboxAll(false);
    setCheckboxOr(true);
  };

  // const RoundCheckboxIcon = () => (
  //   <svg viewBox="0 0 24 24" width="16px" height="16px" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //     <circle cx="12" cy="12" r="9" />
  //     <path d="M9 12l2 2 4-4" />
  //   </svg>
  // );

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Discover" />
      <SideBar pagePath={router.pathname} />
      <>
        {
          <Box w="full" h="full" ml="200px" bg="background" pt="60px">
            <VStack spacing="24px" px="170px" py="50px" w="full" h="full">
              <Flex w="100%" justifyContent="center">
                <Heading fontFamily={themeEncore.fonts.title}>Discover</Heading>
              </Flex>

              <Box w="full">
                <HStack>
                  <Text variant="label" my="6px">
                    Keywords
                  </Text>
                  <Tooltip
                    hasArrow
                    placement="top"
                    label="Keywords. Search resources in Green, Digital and Entrepreneurial skills from ENCORE OERs database."
                    aria-label="Search resources in Green, Digital and Entrepreneurial skills from ENCORE OERs database."
                    ml="1px"
                    bg="white"
                    color="primary"
                    p={2}
                  >
                    <span>
                      {' '}
                      {/*use span element to fix problem of communication between Tooltip element and svg image*/}
                      <Image src={icon_infocircle} alt="infocircle" />
                    </span>
                  </Tooltip>
                </HStack>

                <SearchBar
                  inputValue={searchValue}
                  setInputValue={setSearchValue}
                  inputValueIds={selectedSkillIds}
                  setInputValueIds={setSelectedSkillIds}
                  items={suggestions}
                  onSearchCallback={searchCallback1}
                  placeholder="Search resources"
                />
              </Box>

              <Box w="100%" px="5px">
                <HStack>
                  <Flex w="100%" justifyContent="center">
                    <Text variant="text_searchFor">
                      <span>Search for:</span>
                    </Text>

                    <input
                      type="radio"
                      id="checkboxAll"
                      checked={checkboxAll}
                      onChange={handleCheckboxAllChange}
                    />

                    <Text variant="text_searchFor_secondary">All keywords</Text>
                    <input
                      type="radio"
                      id="checkboxOr"
                      checked={checkboxOr}
                      onChange={handleCheckboxOrChange}
                    />
                    <Text variant="text_searchFor_secondary">Any keyword</Text>
                  </Flex>
                </HStack>
              </Box>

              <div>
                {showBox && (
                  <Box w="100%" px="5px">
                    <AdvancedSearch
                      domain={domain}
                      subject={subject}
                      resourceType={resourceTypes}
                      audience={audience}
                      onDomainFromDropDownMenu={handleDomainFromDropDownMenu}
                      onSubjectFromDropDownMenu={handleSubjectFromDropDownMenu}
                      onResourceTypeFromDropDownMenu={
                        handleResourceTypeFromDropDownMenu
                      }
                      onAudienceFromDropDownMenu={
                        handleAudienceFromDropDownMenu
                      }
                    />
                  </Box>
                )}

                <Flex justifyContent="center" mt={isClicked ? '70px' : '5px'}>
                  <Button
                    variant="link"
                    rightIcon={
                      !isClicked ? <ChevronDownIcon /> : <ChevronUpIcon />
                    }
                    onClick={handleAdvanceSearchClick}
                  >
                    {buttonName}
                  </Button>
                </Flex>
              </div>
              <Text variant="text_before_venn">
                Search among 118.000 resources
              </Text>
              <div>
                {hydrated ? (
                  <VennDiagram
                    sets={sets}
                    width={550}
                    height={450}
                    // selection={selection}
                    // onHover={setSelection}
                    // combinations={combinations}
                    hasSelectionOpacity={0.2}
                    selectionColor=""
                  />
                ) : (
                  'loading...'
                )}
              </div>
            </VStack>
          </Box>
        }
      </>
    </Flex>
  );
};

export default Home;
