import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import Image from 'next/image';

import { useUser } from '@auth0/nextjs-auth0/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import { VennDiagram } from 'reaviz';
import AdvancedSearch from '../components/AdvancedSearch/AdvancedSearch';
import SingleResourceCard from '../components/Card/SingleResourceCard';
import DrawerCard from '../components/Drawers/DrawerCard';
import Navbar from '../components/NavBars/NavBarEncore';
import SearchBar from '../components/SearchBar/SearchBarEncore';
import SearchBarDiscover from '../components/SearchBar/SearchBarNoButtonEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';
import { APIV2 } from '../data/api';
import icon_infocircle from '../public/Icons/icon_infocircle.svg';
import themeEncore from '../styles/theme';
//import VennDiagramUpset from '../components/VennDiagram/VennDiagramUpsetJS';
//import dynamic from 'next/dynamic';

//const ChartComponent = dynamic(() => import('../components/VennDiagram/VennDiagramAmCharts'), { ssr: false });

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  const [searchValue, setSearchValue] = useState<string[]>([]);
  //let searchValue: string[] = [];
  const [suggestions, setSuggestions] = useState<string[]>([]);
  //const suggestions: string[] = [];
  const [page, setPage] = useState(true);
  //  const [dataSkills, setDataSkills] = useState<any[]>([]);
  //const [dataOers, setDataOers] = useState<any[]>([]);
  const [respSearchOers, setRespSearchOers] = useState<any[]>([]);
  const [oerById, setOerById] = useState<any[]>([]);
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
  const [dataSearching, setDataSearching] = useState<any[]>([]); // save the data found from searching

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // README!
  // The skill should be set based on the oers selected
  // this function should be executed when a selection oer event is triggered
  //setSkill('circular economy');
  const [skill /*, setSkill*/] = useState<string>('circular economy');

  // const drawerRef = useRef<HTMLDivElement>(null);

  /*const d: Types.Data[] = [
    { id: 1, name: 'Digital', size: 500, fillColor: 'ligthnlue' },
    { id: 2, name: 'Entrepreneurship', size: 500, fillColor: 'ligthyellow' },
    { id: 3, name: 'Green', size: 500, fillColor: 'ligthgreen' },
  ];*/

  // data for reaviz venn diagram
  /*const d = [
    { key: ['Digital'], data: 12 },
    { key: ['Entrepreneurship'], data: 12 },
    { key: ['Green'], data: 12 },
    { key: ['Digital', 'Entrepreneurship'], data: 2 },
    { key: ['Entrepreneurship', 'Green'], data: 2 },
    { key: ['Digital', 'Green'], data: 2 },
    { key: ['Digital', 'Entrepreneurship', 'Green'], data: 1 },
  ];*/

  //const dataVennDiagram = [10, 20, 30]; // examples data for vennDiagram
  //const widthVennDiagram = 400;
  //const heightVennDiagram = 400;

  //console.log('query: ' + router.query);

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

  const searchCallback = async (
    skillIds: any[],
    domainIds: any[],
    subjectIds: any[],
    resourceTypeIds: any[],
    audienceIds: any[]
  ) => {
    const api = new APIV2(props.accessToken);
    console.log('CIAOOOO');

    if (searchValue.length >= 0) {
      const oers = await api.searchOers(
        skillIds,
        domainIds,
        subjectIds,
        resourceTypeIds,
        audienceIds
      );

      console.log(oers);
      setRespSearchOers(oers);
      setPage(!page);
    } else if (searchValue.length < 0) {
      const oers = await api.getOERs();
      //console.log(oers);

      //setDataOers(oers);

      /*const oersSkills = oers.map((oer: any) => oer.skills);
      console.log(oersSkills);
      // -------------- LABEL --------------
      const oersSkillsLabel = oersSkills?.flatMap(
        (skills: any, index: number) =>
          // use of [] to store more labels for the same id_oer in the same array
          skills.length > 0
            ? skills.map((skill: any) => ({
                id_oer: oers[index].id,
                skillLabel: skill.label,
              }))
            : {
                id_oer: oers[index].id,
                skillLabel: '',
              }
      );*/

      const oersSkillsLabel = oers?.flatMap((oer: any) => {
        if (oer.skills?.length > 0) {
          return oer.skills?.map((skill: any) => ({
            id_oer: oer.id,
            skillLabel: skill.label,
          }));
        } else {
          return {
            id_oer: oer.id,
            skillLabel: '',
          };
        }
      });

      //stampo tutte le etichette delle skill delle oers
      const labels = oersSkillsLabel?.map((element: any) => element.skillLabel);
      console.log('labels: ' + labels);

      // searching alhorithm

      /*searchValue.map((item: any) => {
        console.log(item);
        const res = labels.includes(item);
        console.log(res);
        if (res) {
          oersSkillsLabel.map((element: any) => {
            if (element.skillLabel === item) {
              setDataSearching((prev: any) => {
                const updateData = prev.filter(
                  (value: any) => value !== element.id_oer
                );
                return [...updateData, element.id_oer];
              });
            }
          });
        }
      });*/

      const filteredOers = oersSkillsLabel.filter((oer: any) =>
        searchValue.includes(oer.skillLabel)
      );
      const formattedOers = filteredOers.map((oer: any) => ({
        id_oer: oer.id_oer,
        skillLabel: oer.skillLabel,
      }));

      console.log(formattedOers);
      //setDataSearching(formattedOers);

      // find the oers that respect the search value
      /*const oers_list = filteredOers.map((oer) =>
        oers.find((item) => item.id === oer.id_oer)
      );*/
      setDataSearching(
        filteredOers.map((oer) => oers.find((item) => item.id === oer.id_oer))
      );

      console.log(dataSearching);

      /*setDataSearching(
        oers.map((oer) => oers.find((item) => item.id === oer.id_oer))
      )*/
    } else console.log('Write Something!');
  };

  /*const searchCallback = async () => {
    const api = new APIV2(props.accessToken);

    const oers = await api.getOERs();
    //const oers = resp.data?.data || [];
    console.log(oers);
    //const labels = skills.map((skill: any) => skill.label); // extract only "label" fields from every object
    //console.log(labels);
    setDataOers(oers);
    console.log(dataOers);

    const oersSkills = oers.map((oer: any) => oer.skills);
    console.log(oersSkills);
    //const oersSkillsLabel = oersSkills.map((skill: any) => skill.label);
    //console.log(oersSkillsLabel);

    // -------------- LABEL --------------
    const oersSkillsLabel = oersSkills.flatMap((skills: any, index: number) => [
      // use of [] to store more labels for the same id_oer in the same array
      skills.length > 0
        ? skills.map((skill: any) => ({
            id_oer: oers[index].id,
            skillLabel: skill.label,
          }))
        : {
            id_oer: oers[index].id,
            skillLabel: '',
          },
    ]);

    console.log(oersSkillsLabel);

    // -------------- DOMAIN --------------

    // taking all domain arrays
    const oersSkillsDomain = oersSkills.flatMap((skills: any) =>
      skills.map((skill: any) =>
        skill.domain?.map((domain: any) => domain.name)
      )
    );

    console.log(oersSkillsDomain);

    // taking possible skill domain without duplicate

    const domainSkill = Array.from(new Set(oersSkillsDomain.flat())).filter(
      (skillDomain: any) => skillDomain !== undefined
    );
    console.log(domainSkill);
    setDomain(domainSkill);

    //api getDomains()
    //const resp_dom = await api.getDomains();

    // -------------- SUBJECT --------------

    const oersSubject = oers.flatMap((oer: any) => [
      oer.subject?.map((subject: any) => subject.name),
    ]);
    console.log(oersSubject);
    // taking all possible type of subjects without duplicate

    const oersSubjects = Array.from(new Set(oersSubject.flat())).filter(
      (subject: any) => subject !== undefined
    );
    console.log(oersSubjects);
    setSubject(oersSubjects);
  };*/

  const getDataOerById = async (id_oer: any) => {
    const api = new APIV2(props.accessToken);

    try {
      const oer = await api.getOerById(id_oer);
      return oer[0];
    } catch (error) {
      throw error;
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

  useEffect(() => {
    console.log(oerById);
  }, [oerById]);

  useEffect(() => {
    console.log('ciao');
    const api = new APIV2(props.accessToken);

    // nella useEffect le funzioni async fanno fatte così, è sbagliato mettere async subito la prima
    (async () => {
      try {
        //const skills = await api.getAllSkills();
        //const skills = respSkills.data?.data || [];
        // const labels = skills.map((skill: any) => skill.label); // extract only "label" fields from every object
        //setDataSkills(skills);

        const labels = await api.getAllSkillsLabel();
        console.log('skill labels: ' + labels);
        setSuggestions(labels);
        //console.log(suggestions);
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
      /*const respOers = await api.getOERs();
      const oers = respOers.data?.data || [];
      console.log(oers);
      setDataOers(oers);*/
    })();
  }, [user]);

  /*useEffect(() => {
    console.log(dataSkills);
  }, [dataSkills]);*/

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
    console.log('SEARCH VALUE: ' + searchValue);
  }, [searchValue]);

  /*useEffect(() => {
    console.log('dataOers: ' + dataOers);
  }, [dataOers]);*/

  useEffect(() => {
    if (dataSearching.length === 0) console.log('No result!');
    else {
      console.log('DATA SEARCHING: ' + dataSearching);
    }
  }, [dataSearching]);

  useEffect(() => {
    console.log('RESPONSE SEARCH: ' + respSearchOers);
    const data = respSearchOers.flatMap((oer: any) =>
      oer.media_type?.map((item: any) => item.name)
    );
    console.log(data);
    respSearchOers?.map((oer: any) => {
      const temp_aut = oer.media_type?.name;
      const authorsOer = temp_aut?.length !== 0 ? temp_aut : ['Unknown'];
      console.log('authorsOer: ' + authorsOer);
      //const domain = item.domains.map((obj: any) => obj.full_name);
    });
  }, [respSearchOers, page]);

  /*if (typeof window !== 'undefined') {
    try {
      router.push({
        pathname: '/',
        query: { respSearchOers },
      });
    } catch (error) {
      throw error;
    }
  }*/

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} />
      <SideBar pagePath={router.pathname} />
      <>
        {page && (
          <Box w="full" h="100vh" ml="200px" bg="background" pt="60px">
            <VStack spacing="24px" px="170px" py="50px" w="full" h="full">
              <Flex
                w="100%"
                justifyContent="center"
                //justify="space-between"
              >
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
                  domainIds={selectedDomain}
                  subjectIds={selectedSubject}
                  resourceTypeIds={selectedResourceTypes}
                  audienceIds={selectedAudience}
                  items={suggestions}
                  onSearchCallback={searchCallback}
                  placeholder="Search resources..."
                />
              </Box>

              <div>
                {showBox && (
                  <Box
                    w="100%"
                    px="5px"
                    //flex="1"
                    //display="none"
                  >
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
                    //color="grey"
                    //textDecoration="underline"
                    rightIcon={
                      !isClicked ? <ChevronDownIcon /> : <ChevronUpIcon />
                    }
                    onClick={handleAdvanceSearchClick}
                  >
                    {buttonName}
                  </Button>
                </Flex>
              </div>

              {/*<VennDiagram
                data={dataVennDiagram}
                height={heightVennDiagram}
                width={widthVennDiagram}
                  />*/}
            </VStack>
          </Box>
        )}

        {!page && (
          <Flex ml="200px" h="100vh" pt="60px" w="full">
            <Box flex="1" py="30px" px="30px" h="full" w="full">
              <Flex
                w="100%"
                justifyContent="left"
                //justify="space-between"
              >
                <Heading fontFamily="title">
                  <Text>Discover</Text>
                </Heading>
              </Flex>
              <Box w="100%" mb="5">
                <Text variant="label" my="6px">
                  Keywords
                </Text>

                <SearchBarDiscover
                  inputValue={searchValue}
                  setInputValue={setSearchValue}
                  placeholder="Search resources..."
                />
              </Box>

              {
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(!page);
                  }}
                >
                  BACK
                </Button>
              }

              <HStack mb="5">
                <Text fontWeight="light" color="grey">
                  {`${respSearchOers.length} resources`}
                </Text>
              </HStack>

              {respSearchOers && (
                <VStack>
                  {respSearchOers?.map((oer: any) => (
                    <Box
                      key={oer.id}
                      onClick={async (e: any) => {
                        e.preventDefault();
                        onOpen();

                        setOerById(await getDataOerById(oer.id));
                      }}
                      as="button"
                    >
                      <SingleResourceCard
                        idOer={oer.id}
                        domain={
                          oer.skills?.flatMap((skill: any) =>
                            skill.domain?.map((domain: any) => domain.name)
                          ) || []
                        }
                        title={oer.title}
                        authors={
                          oer.creator?.map((item: any) => item.full_name) || []
                        }
                        description={oer.description}
                        lastUpdate={oer.retrieval_date}
                        resourceType={
                          oer.media_type?.map((item: any) => item.name) || []
                        }
                      />
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>

            <DrawerCard isOpen={isOpen} onClose={onClose} oer={oerById} />

            <EncoreTab
              skill={skill}
              flex="1" // "flex='1'" fill the rest of the page
              py="30px"
              px="30px"
              w="full"
              h="full"
              backgroundColor="background"
              borderLeft="0.5px"
              borderLeftColor={'secondary'}
              borderLeftStyle={'solid'}
            />
          </Flex>
        )}
      </>
    </Flex>
  );
};

export default Home;
