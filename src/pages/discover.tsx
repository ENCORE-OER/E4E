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
import SingleResourceCard from '../components/Card/SingleResourceCard';
import DrawerCard from '../components/Drawers/DrawerCard';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';
import { APIV2 } from '../data/api';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

import { DiscoveryContext } from '../Contexts/discoveryContext';

const Discover = (props: DiscoverPageProps) => {
  // const [respSearchOers, setRespSearchOers] = useState<any[]>([]);
  const [oerById, setOerById] = useState<any[]>([]);

  const [domain] = useState<any[]>([]); // to save each type of domain of the resources

  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const [filtered, setFiltered] = useState<any>([]);
  const [byResourceType, setByResourceType] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const searchOERs = async (
    skills: string | string[],
    andOption: string,
    orOption: string
    //domainIds?: string[],
    //resourceTypeIds?: string[]
  ) => {
    //here we search the OERS using the query parameters

    const isArray = Array.isArray(skills);

    const api = new APIV2(props.accessToken);

    //case 1 - only one skill
    if (!isArray) {
      const oers = await api.searhOERbySkillNoPages([skills]);
      //setRespSearchOers(oers);
      setFiltered(oers);
    }

    //case 2 - more than one skill we check if all skills must be used or at least one
    else if (andOption === 'true') {
      const oers = await api.getOersInAND(skills);
      // setRespSearchOers(oers);
      setFiltered(oers);
    } else if (orOption === 'true') {
      const oers = await api.getOersInOR(skills);
      //setRespSearchOers(oers);
      setFiltered(oers);
    } else if (orOption === 'false' && andOption === 'false') {
      const oers = await api.getOersInOR(skills);
      // setRespSearchOers(oers);
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

  useEffect(() => {
    if (router.query.skills != undefined) {
      const skills = router.query.skills as string[];
      const andOption = router.query.andOption as string;
      const orOption = router.query.orOption as string;
      setIsLoading(true);

      searchOERs(skills, andOption, orOption);
    }
  }, [router.query]);

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
                <Text fontWeight="light" color="grey">
                  {`${filtered?.length} resources`}
                </Text>
              </HStack>

              {isLoading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              )}

              {filtered && (
                <VStack>
                  {filtered?.map((oer: any) => (
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
                          oer.skills?.flatMap(
                            (skill: any) =>
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
                setOERs={setFiltered}
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
    </Flex>
  );
};

export default Discover;
