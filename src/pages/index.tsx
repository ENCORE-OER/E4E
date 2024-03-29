import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { asSets, mergeColors, VennDiagram } from '@upsetjs/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import AdvancedSearch from '../components/AdvancedSearch/AdvancedSearch';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import SearchView from '../components/Views/SearchView';
import { APIV2 } from '../data/api';
import {
  OerAudienceInfo,
  OerDomainInfo,
  OerMediaTypeInfo,
} from '../types/encoreElements';
import { CustomToast } from '../utils/Toast/CustomToast';
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

  //const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]); // list of the skill ids selected in the searchbar
  const [suggestions, setSuggestions] = useState<string[]>([]); // list of the skill selectable in the searchbar

  const [domain, setDomain] = useState<OerDomainInfo[]>([]); // to save each type of domain of the resources
  const [resourceTypes, setResourceTypes] = useState<OerMediaTypeInfo[]>([]);
  const [audience, setAudience] = useState<OerAudienceInfo[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [totalOers, setTotalOers] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[] | number[]>(
    []
  ); // to save each type of domain of the resources
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

  //const [checkboxAnd, setCheckboxAnd] = useState(true);
  //const [checkboxOr, setCheckboxOr] = useState(false);
  const [operator, setOperator] = useState('and'); // operator used for the search

  const combinations = useMemo(() => ({ mergeColors }), []);

  // ============================ VENN DIAGRAM ============================
  // To make the venn diagram responsive
  const vennDiagramWidth = useBreakpointValue({
    base: 420, // Larghezza a schermo intero per le dimensioni più piccole
    md: 570, // Larghezza fissa per schermi di dimensioni medie
    lg: 620, // Larghezza fissa per schermi più grandi
  });

  const vennDiagramHeight = useBreakpointValue({
    base: 370, // Altezza più piccola per le dimensioni più piccole
    md: 470, // Altezza fissa per schermi di dimensioni medie
    lg: 520, // Altezza fissa per schermi più grandi
  });
  // =======================================================================

  // Use this for the responsive design of the page
  const isSmallerScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // =======================================================================

  const handleDomainFromDropDownMenu = (data: string[] | number[]) => {
    setSelectedDomains(data);
  };

  const handleResourceTypeFromDropDownMenu = (data: string[] | number[]) => {
    setSelectedResourceTypes(data);
  };

  const handleAudienceFromDropDownMenu = (data: string[] | number[]) => {
    setSelectedAudience(data);
  };

  const searchCallback1 = async () => {
    let searchData = {};

    try {
      if (
        isClicked &&
        (selectedAudience.length > 0 ||
          selectedAudience.length > 0 ||
          selectedResourceTypes.length > 0) &&
        searchValue.length === 0
      ) {
        // advanced search without keywords
        searchData = {
          page: 1,
          keywords: searchValue,
          //selectedSkills: selectedSkillIds,
          domains: selectedDomains,
          types: selectedResourceTypes,
          audience: selectedAudience,
          order_by: 'title',
          order_asc: 'true',
          operator: operator,
          concepts: [],
        };

        /*throw new Error(
          'Advanced search is not available yet! \n Close the advanced search and try again.'
        );*/
      } else {
        //normal search
        searchData = {
          page: 1,
          keywords: searchValue,
          //selectedSkills: selectedSkillIds,
          domains: selectedDomains,
          types: selectedResourceTypes,
          audience: selectedAudience,
          order_by: 'title',
          order_asc: 'true',
          operator: operator,
          concepts: [],
        };
      }
      if (
        searchValue.length === 0 &&
        selectedDomains.length === 0 &&
        selectedResourceTypes.length === 0 &&
        selectedAudience.length === 0
      ) {
        addToast({
          message:
            'Note: if you are selecting the “All” parameter it will have no effect on the search.',
          type: 'warning',
        });
        throw new Error('Error: you must set at least one skill or parameter!');
      } else {
        router.push({
          pathname: '/discover',
          query: searchData,
        });
      }
      localStorage.setItem('searchData', JSON.stringify(searchData));
      console.log(
        'LOCAL STORAGE - SEARCH DATA: ' + JSON.stringify(localStorage)
      );
    } catch (error) {
      addToast({
        message: `${error}`,
        type: 'error',
      });
    }
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

  const handleCheckboxAndChange = () => {
    //setCheckboxAnd(true);
    //setCheckboxOr(false);
    setOperator('and');
  };

  const handleCheckboxOrChange = () => {
    //setCheckboxAnd(false);
    //setCheckboxOr(true);
    setOperator('or');
  };

  const getAllKeywords = async () => {
    const api = new APIV2(props.accessToken);
    try {
      const keywords = await api.getAllKeywords(); // get all keywords from the database
      setSuggestions(keywords);
    } catch (error) {
      console.error(error);
    }
  };

  // update metrics
  useEffect(() => {
    const api = new APIV2(props.accessToken);

    // inside useEffect is not allowed to use async directly. You have to create a function inside useEffect and call it immediately.
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
  }, []);

  useEffect(() => {
    console.log('SELECTED DOMAINS: ' + selectedDomains);
  }, [selectedDomains]);

  useEffect(() => {
    console.log('SELECTED RESOURCE TYPES: ' + selectedResourceTypes);
  }, [selectedResourceTypes]);

  useEffect(() => {
    console.log('SELECTED AUDIENCE: ' + selectedAudience);
  }, [selectedAudience]);

  // update suggestions while texting
  /*useEffect(() => {
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
  }, [searchValue]);*/

  useEffect(() => {
    getAllKeywords();
  }, []);

  return (
    <Flex w="100%" h="100%">
      <SideBar pagePath={router.pathname} />
      <Navbar user={user} pageName="Discover" />
      <Box
        w="full"
        minH="100vh"
        pl={isSmallerScreen ? '50px' : '200px'}
        bg="background"
        pt="60px"
      >
        <VStack
          spacing="24px"
          px={isSmallerScreen ? '90px' : '160px'}
          py="50px"
          w="full"
          h="full"
          bg="background"
        >
          <Flex w="100%" justifyContent="center">
            <Heading>Discover</Heading>
          </Flex>

          <SearchView
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            suggestions={suggestions}
            searchCallback1={searchCallback1}
          />

          <Box w="100%">
            <Flex
              w="100%"
              justifyContent="center"
              direction={isSmallerScreen ? 'column' : 'row'}
              align="center"
              gap={isSmallerScreen ? '3' : '0'}
            >
              <Text variant="text_searchFor" textAlign="center">
                <span>Search for:</span>
              </Text>
              <Flex direction="row" align="center">
                <input
                  type="radio"
                  id="checkboxAll"
                  checked={operator === 'and'}
                  onChange={handleCheckboxAndChange}
                />
                <Text variant="text_searchFor_secondary" textAlign="center">
                  All keywords
                </Text>
              </Flex>

              <Flex direction="row" align="center">
                <input
                  type="radio"
                  id="checkboxOr"
                  checked={operator === 'or'}
                  onChange={handleCheckboxOrChange}
                />
                <Text variant="text_searchFor_secondary" textAlign="center">
                  Any keyword
                </Text>
              </Flex>
            </Flex>
          </Box>

          <div>
            {showBox && (
              <Box w="100%">
                <AdvancedSearch
                  domain={domain}
                  resourceType={resourceTypes}
                  audience={audience}
                  onDomainFromDropDownMenu={handleDomainFromDropDownMenu}
                  onResourceTypeFromDropDownMenu={
                    handleResourceTypeFromDropDownMenu
                  }
                  onAudienceFromDropDownMenu={handleAudienceFromDropDownMenu}
                  isSmallerScreen={isSmallerScreen}
                />
              </Box>
            )}

            <Flex
              justifyContent="center"
              pt={isClicked ? '60px' : '5px'}
              pb="10px"
            >
              <Button
                variant="link"
                rightIcon={!isClicked ? <ChevronDownIcon /> : <ChevronUpIcon />}
                onClick={handleAdvanceSearchClick}
              >
                {buttonName}
              </Button>
            </Flex>
          </div>
          <Text variant="text_before_venn" textAlign="center">
            Search among {totalOers} resources
          </Text>
          <div style={{ minWidth: vennDiagramWidth }}>
            {hydrated ? (
              <VennDiagram
                className="venn-diagram"
                sets={metrics}
                width={Number(vennDiagramWidth)}
                height={Number(vennDiagramHeight)}
                // selection={selection}
                // onHover={setSelection}
                combinations={combinations}
                hasSelectionOpacity={0.2}
                selectionColor=""
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
            ) : (
              'loading...'
            )}
          </div>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
