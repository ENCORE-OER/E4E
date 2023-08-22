import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SingleResourceCard from '../components/Card/OerCard/SingleResourceCard';
//import DrawerCard from '../components/Drawers/DrawerCard';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';
import { APIV2 } from '../data/api';
import { IconBezierCurve } from '../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../public/Icons/svgToIcons/iconThumbsUp';

import SortingDropDownMenu from '../components/DropDownMenu/SortingDropDownMenu';
import CardInfoModal from '../components/Modals/CardInfoModal';
import Pagination from '../components/Pagination/pagination';
import { DiscoveryContext } from '../Contexts/discoveryContext';
import { OerProps } from '../types/encoreElements';
import { SortingDropDownMenuItemProps } from '../types/encoreElements/SortingDropDownMenu';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Discover = (props: DiscoverPageProps) => {
  // const [respSearchOers, setRespSearchOers] = useState<any[]>([]);
  const [oerById, setOerById] = useState<OerProps | null>(null);

  const [domain] = useState<string[]>([]); // to save each type of domain of the resources

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const [filtered, setFiltered] = useState<OerProps[]>([]);
  const [byResourceType, setByResourceType] = useState<any>(null);

  // items for Sorting DropDown menu
  const menuItemsSorting: Array<SortingDropDownMenuItemProps> = [
    { icon: IconCalendarCheck, name: 'Last Update' },
    { icon: IconThumbsUp, name: 'Likes' },
    { icon: IconMedal, name: 'Quality Score' },
    { icon: IconBezierCurve, name: 'Time Used' },
    { icon: IconBezierCurve, name: 'A-Z' },
  ];

  const [selectedSorting, SetSelectedSorting] = useState<string>('Last Update');
  const [isAscending, setAscending] = useState<boolean>(true);

  const allOERs = async () => {
    console.log('here to check when we enter with an empty query');
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  //const [isCardInfoModalOpen, setCardInfoModalOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchOERs = async (
    skills: string | string[],
    andOption: string,
    orOption: string,
    domainIds?: string[],
    resourceTypeIds?: string[],
    audienceIds?: string[]
  ) => {
    //here we search the OERS using the query parameters

    console.log(`${domainIds}, ${resourceTypeIds}, ${audienceIds}`);

    const isArray = Array.isArray(skills);

    const api = new APIV2(props.accessToken);

    //case 1 - only one skill
    if (!isArray) {
      const oers = await api.searhOERbySkillNoPages([skills]);
      setFiltered(oers);
    }

    //case 2 - more than one skill we check if all skills must be used or at least one
    else if (andOption === 'true') {
      const oers = await api.getOersInAND(skills);
      setFiltered(oers);
    } else if (orOption === 'true') {
      const oers = await api.getOersInOR(skills);
      //setRespSearchOers(oers);
      setFiltered(oers);
    } else if (orOption === 'false' && andOption === 'false') {
      const oers = await api.getOersInOR(skills);

      setFiltered(oers);
    } else {
      console.log('case not managed');
    }

    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchCallback = async (domainIds: any[]) => {
    alert('qui call back');
  };

  const getDataOerById = async (id_oer: any) => {
    const api = new APIV2(props.accessToken);

    try {
      const oer = await api.getOerById(id_oer);
      return oer[0];
    } catch (error) {
      throw error;
    }
  };

  // handle CardInfoModal opening

  /*const handleOpenCardInfoModal = () => {
        setCardInfoModalOpen(true);
        console.log(isCardInfoModalOpen);
    };*/

  const handleCloseCardInfoModal = () => {
    //setCardInfoModalOpen(false);
    onClose();
  };

  const handleItemSortingClick = (sortingName: string) => {
    if (sortingName === selectedSorting) {
      setAscending(!isAscending);
    } else {
      SetSelectedSorting(sortingName);
      setAscending(true);
    }
  };

  useEffect(() => {
    if (router.query.skills != undefined) {
      const skills = router.query.skills as string[];
      const andOption = router.query.andOption as string;
      const orOption = router.query.orOption as string;
      const domains = router.query.domain as string[];
      const types = router.query.types as string[];
      const audiences = router.query.audiences as string[];
      setIsLoading(true);

      searchOERs(skills, andOption, orOption, domains, types, audiences);
    } else {
      //query con zero parametri...posso ritornare tutte le OERs?;
      setIsLoading(true);
      allOERs();
    }
  }, [router.query]);

  // sorting of the OERs
  useEffect(() => {
    setIsLoading(true);
    const sortedData = [...filtered];
    sortedData.sort((a: any, b: any) => {
      if (selectedSorting === 'Last Update') {
        return isAscending
          ? a.retrieval_date.localeCompare(b.retrieval_date)
          : b.retrieval_date.localeCompare(a.retrieval_date);
      } else if (selectedSorting === 'A-Z') {
        return isAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (selectedSorting === 'Quality Score') {
        return isAscending
          ? a.overall_score - b.overall_score
          : b.overall_score - a.overall_score;
      }
    });

    console.log(filtered);
    console.log(sortedData);

    setFiltered(sortedData);

    setIsLoading(false);
  }, [selectedSorting, isAscending]);

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} />
      <SideBar pagePath={router.pathname} />
      <>
        {
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

              <HStack mb="5">
                <Text flex="1" fontWeight="light" color="grey">
                  {`${filtered?.length} resources`}
                </Text>
                <Flex flex="1" w="full" justifyContent="flex-end">
                  <SortingDropDownMenu
                    menuItemsSorting={menuItemsSorting}
                    handleItemSortingClick={handleItemSortingClick}
                    isAscending={isAscending}
                    wMenu="250px"
                  />
                </Flex>
              </HStack>

              {isLoading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              )}

              {filtered && (
                <VStack spacing="4" className="scrollable-content">
                  {filtered
                    ?.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((oer: any) => (
                      <Box
                        key={oer.id}
                        onClick={async (e: any) => {
                          e.preventDefault();
                          onOpen();
                          // handleOpenCardInfoModal();

                          setOerById(await getDataOerById(oer.id));
                        }}
                        as="button"
                      >
                        <SingleResourceCard oer={oer} />
                      </Box>
                    ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </VStack>
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
                searchCallBack={searchCallback}
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
        }
      </>
      <CardInfoModal
        isOpen={isOpen}
        onClose={handleCloseCardInfoModal}
        oer={oerById}
      />
    </Flex>
  );
};

export default Discover;
