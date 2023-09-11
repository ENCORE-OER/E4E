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
import { asSets, mergeColors, VennDiagram } from '@upsetjs/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import AdvancedSearch from '../components/AdvancedSearch/AdvancedSearch';
import Navbar from '../components/NavBars/NavBarEncore';
import SearchBar from '../components/SearchBar/SearchBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { CustomToast } from '../components/Toast/CustomToast';
import { APIV2 } from '../data/api';
import icon_infocircle from '../public/Icons/icon_infocircle.svg';
import themeEncore from '../styles/theme';
import {
  OerAudienceInfo,
  OerDomainInfo,
  OerMediaTypeInfo,
  OerSkillInfo,
} from '../types/encoreElements';
import { useHasHydrated } from '../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();
  const [searchValue, setSearchValue] = useState<string[]>([]);
  //const [page] = useState(true);
  //const [respSearchOers] = useState<OerProps[]>([]);
  //const [oerById] = useState<OerProps | null>(null);

  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]); // list of the skill ids selected in the searchbar
  const [suggestions, setSuggestions] = useState<OerSkillInfo[]>([]); // list of the skill selectable in the searchbar

  const [domain, setDomain] = useState<OerDomainInfo[]>([]); // to save each type of domain of the resources
  const [resourceTypes, setResourceTypes] = useState<OerMediaTypeInfo[]>([]);
  const [audience, setAudience] = useState<OerAudienceInfo[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [totalOers, setTotalOers] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomain] = useState<string[] | number[]>([]); // to save each type of domain of the resources
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<
    string[] | number[]
  >([]);
  const [selectedAudience, setSelectedAudience] = useState<string[] | number[]>(
    []
  );
  //const [audienceCard, setAudienceCard] = useState<string[]>([]);
  const [showBox, setShowBox] = useState(false); // used to show the options for the advanced search
  const [buttonName, setButtonName] = useState('Advanced Search');
  const [isClicked, setIsClicked] = useState(false); // used for the button advanced search

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();

  const [checkboxAll, setCheckboxAll] = useState(true);
  const [checkboxOr, setCheckboxOr] = useState(false);

  const combinations = useMemo(() => ({ mergeColors }), []);

  const handleDomainFromDropDownMenu = (data: string[] | number[]) => {
    setSelectedDomain(data);
  };

  const handleResourceTypeFromDropDownMenu = (data: string[] | number[]) => {
    setSelectedResourceTypes(data);
  };

  const handleAudienceFromDropDownMenu = (data: string[] | number[]) => {
    setSelectedAudience(data);
  };

  const searchCallback1 = async () => {
    let searchData = {};

    if (isClicked) {
      // advanced search selected
      searchData = {
        selectedSkills: selectedSkillIds,
        advanced: true,
        andOption: checkboxAll,
        orOption: checkboxOr,
        domains: selectedDomains,
        types: selectedResourceTypes,
        audience: selectedAudience,
      };
    } else {
      //normal search
      searchData = {
        selectedSkills: selectedSkillIds,
        advanced: false,
        andOption: checkboxAll,
        orOption: checkboxOr,
        domains: selectedDomains,
        types: selectedResourceTypes,
        audience: selectedAudience,
      };
    }
    if (
      selectedSkillIds.length === 0 &&
      selectedDomains.length === 0 &&
      selectedResourceTypes.length === 0 &&
      selectedAudience.length === 0
    ) {
      addToast({
        message: 'Error: you must set at least one skill or parameter!',
        status: 'error',
      })
      return;
    } else {
      router.push({
        pathname: '/discover',
        query: searchData,
      });
    }
    localStorage.setItem('searchData', JSON.stringify(searchData));
    console.log('LOCAL STORAGE - SEARCH DATA: ' + JSON.stringify(localStorage));
  };

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

  const handleCheckboxAllChange = () => {
    setCheckboxAll(true);
    setCheckboxOr(false);
  };

  const handleCheckboxOrChange = () => {
    setCheckboxAll(false);
    setCheckboxOr(true);
  };

  /*useEffect(() => {
    console.log(oerById);
  }, [oerById]);*/

  useEffect(() => {
    const api = new APIV2(props.accessToken);

    // nella useEffect le funzioni async fanno fatte così, è sbagliato mettere async subito la prima
    (async () => {
      try {
        // api get the Encore Metrics (Num of Oers and IDs for each Skill)
        const resp_metrics: any = await api.getMetrics();
        console.log(
          'Metrics -----------> ' + JSON.stringify(resp_metrics?.total_oers)
        );
        setTotalOers(resp_metrics?.total_oers);

        const digitalIds = resp_metrics?.digital_oers?.ids;
        const greenIds = resp_metrics?.green_oers?.ids;
        const entrepreneurialIds = resp_metrics?.entrepreneurial_oers?.ids;

        const baseSets = [
          { name: 'DIGITAL', elems: [], domainId: 'Digital' },
          { name: 'GREEN', elems: [], domainId: 'Green' },
          { name: 'ENTERPRENEURSHIP', elems: [], domainId: 'Entrepreneurship' },
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
          baseSets.map((s, i) => ({
            ...s,
            color: colors[i],
            fontColor: 'white',
          }))
        );

        // Update the elems field for each set dynamically
        newSet[0].elems = digitalIds;
        newSet[1].elems = greenIds;
        newSet[2].elems = entrepreneurialIds;

        setMetrics(newSet);

        const resp_dom = await api.getDomains();
        //console.log('Domain -----------> ' + resp_dom);
        setDomain(resp_dom);
        const resp_res = await api.getResourceTypes();
        //console.log('Type of reosource -----------> ' + resp_res);
        setResourceTypes(resp_res);
        const resp_aud = await api.getAudience();
        //console.log('Audience -----------> ' + resp_aud);
        setAudience(resp_aud);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    console.log('SELECTED DOMAINS: ' + selectedDomains);
  }, [selectedDomains]);

  useEffect(() => {
    console.log('SELECTED RESOURCE TYPES: ' + selectedResourceTypes);
  }, [selectedResourceTypes]);

  useEffect(() => {
    console.log('SELECTED AUDIENCE: ' + selectedAudience);
  }, [selectedAudience]);

  useEffect(() => {
    console.log('SEARCH VALUE: ' + searchValue);

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
    console.log('SELECTED SKILL IDS: ' + selectedSkillIds);
  }, [selectedSkillIds]);

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Discover" />
      <SideBar pagePath={router.pathname} />
      <>
        {
          <Box w="full" minH="100vh" ml="200px" bg="background" pt="60px">
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
                      resourceType={resourceTypes}
                      audience={audience}
                      onDomainFromDropDownMenu={handleDomainFromDropDownMenu}
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
                Search among {totalOers} resources
              </Text>
              <div>
                {hydrated ? (
                  <VennDiagram
                    sets={metrics}
                    width={550}
                    height={450}
                    // selection={selection}
                    // onHover={setSelection}
                    combinations={combinations}
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
