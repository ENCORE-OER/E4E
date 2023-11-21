import {
  Box,
  Flex,
  Heading,
  HStack,
  Text
} from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import DrawerCard from '../components/Drawers/DrawerCard';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';
import { APIV2 } from '../data/api';

import OerCardsSorting from '../components/Sorting/OerCardsSorting';
import { DiscoveryContext } from '../Contexts/discoveryContext';

import ResourceCardsList from '../components/Card/OerCard/ResourceCardsList';
import {
  OerProps
} from '../types/encoreElements';
import { CustomToast } from '../utils/Toast/CustomToast';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Discover = (props: DiscoverPageProps) => {
  const { addToast } = CustomToast();
  // const [respSearchOers, setRespSearchOers] = useState<any[]>([]);
  //const [oerById, setOerById] = useState<OerProps | null>(null); // used for CardInfoModal
  const [endSearch, setEndSearch] = useState<boolean>(false);
  const [domain] = useState<string[]>([]); // to save each type of domain of the resources

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const [filtered, setFiltered] = useState<OerProps[]>([]); // used for the list of resourcess to show
  const [byResourceType, setByResourceType] = useState<any>(null);

  // items for Sorting DropDown menu
  /*const menuItemsSorting: Array<SortingDropDownMenuItemProps> = [
    { icon: IconCalendarCheck, name: 'Last Update' },
    { icon: IconThumbsUp, name: 'Likes' },
    { icon: IconMedal, name: 'Quality Score' },
    { icon: IconBezierCurve, name: 'Time Used' },
    { icon: IconBezierCurve, name: 'A-Z' },
  ];

  const [selectedSorting, SetSelectedSorting] = useState<string>('Last Update');
  const [isAscending, setAscending] = useState<boolean>(true); */

  /*const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };*/

  //const [isCardInfoModalOpen, setCardInfoModalOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*const searchOERs = async (
    skills: string[],
    andOption: boolean,
    orOption: boolean,
    domains: string[],
    types: string[],
    audience: string[]
  ) => {
    setIsLoading(true);

    const ID_ALL = '0';

    //here we search the OERS using the query parameters

    //const isArraySkills = Array.isArray(skills);
    const isArrayDomains = Array.isArray(domains);
    const isArrayTypes = Array.isArray(types);
    const isArrayAudience = Array.isArray(audience);

    const api = new APIV2(props.accessToken);

    try {
      let oers;

      if (skills.length > 0) {
        if (andOption) {
          oers = await api.getOersInAND(skills);
        } else if (orOption) {
          oers = await api.getOersInOR(skills);
        } else {
          //console.log('I am here');
          oers = await api.searchOERbySkillNoPages(skills);
        }

        console.log('oers: ', oers);

        if (domains.length > 0 || types.length > 0 || audience.length > 0) {
          // Filter based on domains, types, and audience
          const filteredOers = oers?.filter((oer: OerProps) => {
            const domain_Ids = Array.from(
              new Set(
                oer.skills?.flatMap((skill: OerSkillInfo) =>
                  skill.domain.map(
                    (dom: OerDomainInfo) => dom.id as unknown as string
                  )
                )
              )
            ); // list of domains in a single oer
            console.log('domain_Ids: ', domain_Ids);
            const type_Ids = oer.media_type?.map(
              (mediaType: OerMediaTypeInfo) => mediaType.id as unknown as string
            ); // list of type in a single oer
            console.log('type_Ids: ', type_Ids);
            const audience_Ids = oer.coverage?.map(
              (aud: OerAudienceInfo) => aud.id as unknown as string
            ); // list of audience in a single oer
            console.log('audience_Ids: ', audience_Ids);

            let domainMatch = false;
            let typeMatch = false;
            let audienceMatch = false;

            // if 'All' is selected we don't filter by that parameter
            if (isArrayDomains && !domain_Ids?.includes(ID_ALL)) {
              domainMatch = andOption
                ? domains.every((dom: string) => domain_Ids.includes(dom))
                : domains.some((dom: string) => domain_Ids.includes(dom));
            }

            if (isArrayTypes && !domain_Ids?.includes(ID_ALL)) {
              typeMatch = andOption
                ? types.every((type: string) => type_Ids.includes(type))
                : types.some((type: string) => type_Ids.includes(type));
            }

            if (isArrayAudience && !domain_Ids?.includes(ID_ALL)) {
              audienceMatch = andOption
                ? audience.every((aud: string) => audience_Ids.includes(aud))
                : audience.some((aud: string) => audience_Ids.includes(aud));
            }

            if (andOption) {
              return domainMatch && typeMatch && audienceMatch;
            } else {
              return domainMatch || typeMatch || audienceMatch;
            }
          });

          console.log('filteredOers: ', filteredOers);

          setFiltered(filteredOers);
        } else {
          setFiltered(oers);
        }

        //
      } else if (
        domains.length > 0 ||
        audience.length > 0 ||
        types.length > 0
      ) {
        // It's not an efficient solution, but it's the best for now
        // TODO: return only the first 10 OERs. Recall the API on click on the next page button
        oers = await api.searchOERbySkillNoPages(
          skills,
          domains,
          types,
          audience
        );
        setFiltered(oers);
      }
    } catch (error) {
      throw error;
    }

    setEndSearch(true);
    setIsLoading(false);
  };*/

  const freeSearchOERs = async (keywords: string[]) => {
    setIsLoading(true);

    const api = new APIV2(props.accessToken);

    try {
      let oers: OerProps[] = [];

      if (keywords.length > 0) {
        oers = await api.freeSearchOers(keywords);  // doesn't return all the oers data information (e.g. it doesn't return the media_type)

        if (oers?.length > 0) {
          // get all the oers data
          const oerData = await Promise.all(
            oers?.map(
              async (oer: OerProps) => {
                //console.log(oer);
                const oerFound = await getDataOerById(
                  oer?.id,
                );
                return oerFound;
              }
            )
          );

          //console.log('oers: ', oers);
          setFiltered(oerData);
        }

        setEndSearch(true);
        setIsLoading(false);

      } else {
        throw new Error('No keywords provided');
      }

    } catch (error) {
      setEndSearch(true);
      setIsLoading(false);
      addToast({
        message: `${error}`,
        type: 'error',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchCallbackEncoreTab = async (domainIds?: number[]) => {
    alert('qui call back');
  };

  const getDataOerById = async (id_oer: number) => {
    const api = new APIV2(props.accessToken);

    try {
      const oer = await api.getOerById(id_oer);
      return oer[0];
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const searchData = localStorage.getItem('searchData');

    if (!searchData) {
      // TODO: handle redirect
      router.push({
        pathname: '/',
      });
      return;
    }

    const convertedData = JSON.parse(searchData);

    // TODO: add check if null
    /*const skills = convertedData['selectedSkills'];
    const andOption = convertedData['andOption'];
    const orOption = convertedData['orOption'];
    const domains = convertedData['domains'];
    const types = convertedData['types'];
    const audience = convertedData['audience'];

    searchOERs(skills, andOption, orOption, domains, types, audience);*/

    const keywords = convertedData['keywords'];
    freeSearchOERs(keywords);

  }, [router.query.searchData]);


  // redirect to home page if no resources are found
  useEffect(() => {
    //setIsLoading(false);
    if (endSearch && filtered.length === 0) {
      addToast({
        message: 'No resources found! You will be redirected to the home page.',
        type: 'error',
      });
      setTimeout(() => {
        router.push({
          pathname: '/',
        });
      }, 1000);
    } else if (endSearch) {
      addToast({
        message: 'Search completed!',
        type: 'success',
      });
    }
  }, [endSearch]);

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} />
      <SideBar pagePath={router.pathname} />
      <Flex ml="200px" minH="100vh" pt="60px" w="full">
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

          <HStack mb="5">
            <Text flex="1" fontWeight="light" color="grey">
              {`${filtered?.length} resources`}
            </Text>
            <Flex flex="1" w="full" justifyContent="flex-end">
              <OerCardsSorting
                filtered={filtered}
                setFiltered={setFiltered}
                setIsLoading={setIsLoading}
              />
            </Flex>
          </HStack>

          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          )}

          {filtered && !isLoading && (
            <ResourceCardsList
              oers={filtered}
              isNormalSizeCard={true}
              itemsPerPage={5}
              isResourcePage={false}
            />
          )}
        </Box>

        {/*<DrawerCard isOpen={isOpen} onClose={onClose} oer={oerById} />*/}

        <DiscoveryContext.Provider
          value={{
            filtered,
            setFiltered,
            byResourceType,
            setByResourceType,
          }}
        >
          <EncoreTab
            oers={filtered}
            setOers={setFiltered}
            domains={domain}
            searchCallBack={searchCallbackEncoreTab}
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
        </DiscoveryContext.Provider>
      </Flex>
    </Flex>
  );
};

export default Discover;
