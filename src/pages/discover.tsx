import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';

// import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import DrawerCard from '../components/Drawers/DrawerCard';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';
import { APIV2 } from '../data/api';

import OerCardsSorting from '../components/Sorting/OerCardsSorting';
import { useCollectionsContext } from '../Contexts/CollectionsContext/CollectionsContext';
import { useDiscoveryContext } from '../Contexts/discoveryContext';

import ResourceCardsList from '../components/Card/OerCard/ResourceCardsList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import {
  CollectionProps,
  OerInCollectionProps,
  OerProps,
} from '../types/encoreElements';
import { OerFreeSearchProps } from '../types/encoreElements/oer/OerFreeSearch';
import { CustomToast } from '../utils/Toast/CustomToast';
import { useHasHydrated, useIsSmallerScreen } from '../utils/utils';

// type DiscoverPageProps = {
//   accessToken: string | undefined;
// };

const Discover = (/*props: DiscoverPageProps*/) => {
  const hydrated = useHasHydrated();
  const isSmallerScreen = useIsSmallerScreen(); // Use this for the responsive design of the page
  const { addToast } = CustomToast();
  const { collections } = useCollectionsContext();
  const {
    filtered,
    setFiltered,
    conceptsSelected,
    currentPage,
    setCurrentPage,
    // originalSearchData,
    setTypesSelected,
    setDomainsSelected,
    setConceptsSelected,
  } = useDiscoveryContext();
  //const abortController = new AbortController();
  // const [respSearchOers, setRespSearchOers] = useState<any[]>([]);
  //const [oerById, setOerById] = useState<OerProps | null>(null); // used for CardInfoModal
  const [endSearch, setEndSearch] = useState<boolean>(false);
  const [domain] = useState<string[]>([]); // to save each type of domain of the resources

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  // const { user } = useUser();
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  // const [byResourceType, setByResourceType] = useState<any>(null);
  const [IconBookmarkColor, setIconBookmarkColor] = useState<string[]>([]);

  const [isAscending, setAscending] = useState<boolean>(true);
  const [selectedSorting, setSelectedSorting] = useState<string>('title'); // used for the sorting of the resources
  const [OersLengthTotal, setOersLengthTotal] = useState<number | undefined>(0);
  // ============================ VENN DIAGRAM ============================

  // To make the venn diagram responsive
  // const vennDiagramWidth = useBreakpointValue({
  //   base: 420,
  //   md: 550,
  //   lg: 600,
  // });

  // const vennDiagramHeight = useBreakpointValue({
  //   base: 350,
  //   md: 450,
  //   lg: 500,
  // });
  //const isSmallerThan600px = useBreakpointValue({ 1200: true, 2000: false });
  //const isSmallerThan600px = useMediaQuery('(max-width: 600px)');

  // =======================================================================

  // Method to run the search request
  const freeSearchOERs = async (
    page: number,
    keywords: string[],
    domains: string[] | number[],
    types: string[],
    audience: string[],
    order_by: string,
    order_asc: string,
    operator: string,
    concepts?: string[],
    isDomainsFilter?: boolean,
    isTypesFilter?: boolean
  ) => {
    setIsLoading(true);
    setEndSearch(false);
    //setFiltered([]);

    //here we search the OERS using the query parameters

    const api = new APIV2(undefined); // APIV2(access_token: string | undefined)

    try {
      // Check if there are keywords used for the search
      if (
        keywords?.length > 0 ||
        domains.length > 0 ||
        types.length > 0 ||
        audience.length > 0
      ) {
        // Search request
        const resp = await api.searchBooleanOERs(
          page,
          keywords,
          domains,
          types,
          audience,
          order_by,
          order_asc,
          operator,
          concepts ?? [],
          isDomainsFilter,
          isTypesFilter
        );
        // Set number of OERs found with the search
        setOersLengthTotal(resp?.recordsFiltered);

        // Saving the keywords used for the search in the database if there are results
        // TODO: check if each keywords used for the search returns something.
        //(Could be that using 3 keywords only 2 of them are useful, while the third could be useless, that means it not return any oer if used alone).
        if (resp?.recordsFiltered > 0) {
          //const api = new APIV2(undefined);
          keywords.forEach(async (keyword: string) => {
            await api.saveKeyword(keyword);
          });
        }

        // Get the oers from the response
        const oers = resp?.data;

        // Set the new oers found
        setFiltered(oers);
      } else {
        throw new Error('No keywords or filters provided');
      }
    } catch (error) {
      console.error(error);
      addToast({
        message: `${error}`,
        type: 'error',
      });
    } finally {
      setEndSearch(true);
      setIsLoading(false);
    }
  };

  const setOriginalQuery = async () => {
    // Get search data from the localStorage
    const originalSearchData = localStorage.getItem('originalSearchData');

    if (!originalSearchData) {
      console.error('originalSearchData not found in localStorage.');
      // TODO: handle redirect
      router.replace({
        pathname: '/',
      });
      return;
    }

    // Update the searchData in the localStorage
    localStorage.setItem('searchData', originalSearchData);

    await router.replace({
      pathname: '/discover',
      query: originalSearchData,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const searchCallbackEncoreTab = async (domainIds?: number[]) => {
  //   alert('qui call back');
  // };

  // ==================================================================
  // --------------------------- API WITH PAGINATION ---------------------------

  // This code is used to manage the pagination of the resources
  const handlePageChange = (newPage: number) => {
    // Update query parameter 'page'
    setCurrentPage(newPage);

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, page: newPage || 1 },
    });
  };

  const handleSortingChange = (newSorting: string, isAscending?: boolean) => {
    // Update query parameters 'order_by' and 'order_asc', and reset 'page' to 1

    setSelectedSorting(newSorting);
    setCurrentPage(1);

    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 1,
        order_by: newSorting,
        order_asc: isAscending?.toString() || 'true',
      },
    });
  };

  const handleItemSortingClick = (sortingName: string) => {
    let order_item = '';
    switch (sortingName) {
      case 'Relevance':
        order_item = 'title';
        break;
      case 'Last Update':
        order_item = 'retrieval_date';
        break;
      case 'Title':
        order_item = 'title';
        break;
      case 'Quality Score':
        order_item = 'overall_score';
        break;
      case 'Times Used':
        order_item = 'times_used';
        break;
      case 'Likes':
        order_item = 'total_likes';
        break;
      default:
        order_item = 'title';
        break;
    }
    if (order_item === selectedSorting) {
      setAscending(!isAscending);
      handleSortingChange(order_item, !isAscending);
    } else {
      //setSelectedSorting(sortingName);
      setAscending(true);
      handleSortingChange(order_item, true);
    }
  };

  // ==================================================================

  // Run the original discovery if the page is reloaded
  useEffect(() => {
    const searchData = localStorage.getItem('searchData');

    if (!searchData) {
      // TODO: handle redirect
      router.replace({
        pathname: '/',
      });
      return;
    }

    // convert the string to JSON
    const convertedData = JSON.parse(searchData);
    const concepts = convertedData['concepts'];
    const isDomainsFilter = convertedData['isDomainsFilter'];
    const isTypesFilter = convertedData['isTypesFilter'];

    // Check if some filter parameters are setted. If YES reset all.
    if (
      isDomainsFilter ||
      isTypesFilter ||
      concepts.length > 0
      // && originalSearchData !== null
    ) {
      if (isDomainsFilter) {
        setDomainsSelected([]);
      }
      if (isTypesFilter) {
        setTypesSelected([]);
      }
      if (concepts.length > 0) {
        setConceptsSelected([]);
      }

      setOriginalQuery();
    }
  }, []);

  // Do the search request when the query is setted or updated
  useEffect(() => {
    const fetchOers = async () => {
      setIsLoading(true);

      const searchData = localStorage.getItem('searchData');

      if (!searchData) {
        // TODO: handle redirect
        router.replace({
          pathname: '/',
        });
        return;
      }

      // convert the string to JSON
      const convertedData = JSON.parse(searchData);

      // TODO: add check if null

      const keywords = convertedData['keywords'];
      //const andOption = convertedData['andOption'];
      //const orOption = convertedData['orOption'];
      const domains = convertedData['domains'];
      const types = convertedData['types'];
      const audience = convertedData['audience'];
      //const order_by = convertedData['order_by'];
      //const order_asc = convertedData['order_asc'];
      const operator = convertedData['operator'];
      const concepts = convertedData['concepts'];
      const isDomainsFilter = convertedData['isDomainsFilter'];
      const isTypesFilter = convertedData['isTypesFilter'];

      await freeSearchOERs(
        currentPage,
        keywords,
        domains,
        types,
        audience,
        selectedSorting,
        isAscending?.toString(),
        operator,
        concepts,
        isDomainsFilter,
        isTypesFilter
      );
      // .then((oers: OerFreeSearchProps | OerProps | undefined) => {
      //   console.log('New value oers: ', oers);
      //   if (oers !== undefined) {
      //     setFiltered(oers);
      //   }

      // })
      // .catch((error) => {
      //   addToast({
      //     message: `${error}`,
      //     type: 'error',
      //   });
      // })
      // .finally(() => {
      //   setEndSearch(true);
      //   setIsLoading(false);
      // });
    };
    try {
      fetchOers();
    } catch (error) {
      console.error(error);
    }
  }, [router.query]);

  // useEffect(() => {
  //   console.log(originalDomainsQueryParams);
  // }, [originalDomainsQueryParams]);
  // useEffect(() => {
  //   console.log(originalTypesQueryParams);
  // }, [originalTypesQueryParams]);

  // redirect to home page if no resources are found
  useEffect(() => {
    //setIsLoading(false);
    // TODO: handle if it is endSearch but after a concept filter: I could check if there are concepts in the query.

    console.log("ENDSEARCH")

    if (endSearch && OersLengthTotal === 0) {
      if (conceptsSelected.length !== 0) {
        addToast({
          message: 'No resources found with these concepts.',
          type: 'error',
        });
        setTimeout(() => {
          router.replace({
            pathname: '/discover',
          });
        }, 1000);
      } else {
        addToast({
          message:
            'No resources found! You will be redirected to the home page.',
          type: 'error',
        });
        setTimeout(() => {
          router.replace({
            pathname: '/',
          });
        }, 1000);
      }
    } else if (endSearch) {
      addToast({
        message: 'Search successfully completed!',
        type: 'success',
      });
    }
  }, [endSearch]);

  // List of colors for the bookmark icon of each resource
  useEffect(() => {
    if (filtered !== undefined || collections !== undefined) {
      // Return the color of the collection if the oer is in the collection
      // if the oer is in more than one collection, return the color of the first collection
      const colors = filtered?.map(
        (filteredOer: OerProps | OerFreeSearchProps | undefined) => {
          const collectionColor =
            collections.find(
              (collection: CollectionProps) =>
                collection.oers?.some(
                  (oer: OerInCollectionProps) => oer.id === filteredOer?.id
                )
            )?.color || '';

          return collectionColor;
        }
      );
      setIconBookmarkColor(colors ?? []);
    }
  }, [filtered, collections]);

  return (
    <Flex w="100%" h="100%">
      <SideBar pagePath={router.pathname} />
      <Navbar
        //  user={user}
        pageName="Discover"
      />
      <Flex
        direction="row"
        pl={isSmallerScreen ? '50px' : '200px'}
        minH="100vh"
        pt="60px"
        w="full"
      >
        <Box
          flex="1"
          py={isSmallerScreen ? '15px' : '30px'}
          px={isSmallerScreen ? '15px' : '30px'}
          h="full"
          w="full"
        >
          <Flex
            w="100%"
            justifyContent="left"
          //justify="space-between"
          >
            <Heading fontFamily="title">
              <Text>Discover</Text>
            </Heading>
          </Flex>

          <HStack pb="5">
            <Text flex="1" fontWeight="light" color="grey">
              {`${OersLengthTotal} resources`}
            </Text>
            <Flex flex="1" w="full" justifyContent="flex-end">
              <OerCardsSorting
                //filtered={filtered}
                //setFiltered={setFiltered}
                // // setIsLoading={setIsLoading}
                // selectedSorting={selectedSorting}
                // setSelectedSorting={setSelectedSorting}
                // handleSortingChange={handleSortingChange}
                isAscending={isAscending}
                setAscending={setAscending}
                handleItemSortingClick={handleItemSortingClick}
              />
            </Flex>
          </HStack>

          {isLoading && <LoadingSpinner textLoading="Loading..." />}

          {!isLoading && endSearch && hydrated && (
            <ResourceCardsList
              oers={filtered}
              //isNormalSizeCard={isSmallerThan600px ? false : true}
              isNormalSizeCard={true}
              itemsPerPage={10}
              oersLength={OersLengthTotal}
              isResourcePage={false}
              collectionsColor={IconBookmarkColor}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handlePageChange={handlePageChange}
              isSmallerScreen={isSmallerScreen}
            //isSmallerThan600px={isSmallerThan600px}
            />
          )}
        </Box>

        {/*<DrawerCard isOpen={isOpen} onClose={onClose} oer={oerById} />*/}
        <EncoreTab
          oers={filtered}
          // setOers={setFiltered}
          domains={domain}
          // searchCallBack={searchCallbackEncoreTab}
          flex="1" // "flex='1'" fill the rest of the page
          py={isSmallerScreen ? '15px' : '30px'}
          px={isSmallerScreen ? '15px' : '30px'}
          w="full"
          h="full"
          bg="background"
          borderLeft="0.5px"
          borderLeftColor={'secondary'}
          borderLeftStyle={'solid'}
        />
      </Flex>
    </Flex>
  );
};

export default Discover;
