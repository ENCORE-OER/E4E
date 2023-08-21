import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useCollectionsContext } from '../components/CollectionsContext/CollectionsContext';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';

import { DeleteIcon } from '@chakra-ui/icons';
import { FcFolder } from 'react-icons/fc';
import { LuFolderPlus } from 'react-icons/lu';
import DownloadButton from '../components/Buttons/DownloadButton';
import ResourceCardsList from '../components/Card/OerCard/ResourceCards';
import CollectionModal from '../components/Modals/CollectionModals';
import { APIV2 } from '../data/api';
import { CollectionProps } from '../types/encoreElements';
import { useHasHydrated } from '../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { collections, deleteCollection } = useCollectionsContext();
  const collectionRef = useRef<HTMLDivElement>(null);

  const [oersById, setOersById] = useState<any[]>([]);
  const hydrated = useHasHydrated(); // used to avoid hydration failed
  /*const [description, setDescription] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [idOer, setIdOer] = useState<any>();
  const [authors, setAuthors] = useState<any[]>([]);
  const [resourceType, setResourceType] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<any>();
  const [domain, setDomain] = useState<any[]>([]);
  let countRes = 0;

  const nameCollection = 'Drink';
  const [idCollection, setIdCollection] = useState<any>(0);*/

  // handle the click on the collection
  const [collectionClicked, setCollectionClicked] = useState<boolean>(false);
  const [collectionIndex, setCollectionIndex] = useState<number>(-1);
  const [prevCollectionIndex, setPrevCollectionIndex] = useState<number>(-1);
  const { isOpen } = useDisclosure();

  /*const handleAddCollection = () => {
    const nameCollection = 'Food';
    addCollection(nameCollection);
  };*/

  const [isNewCollectionModalOpen, setNewCollectionModalOpen] =
    useState<boolean>(false);

  const handleOpenNewCollectionModal = () => {
    setNewCollectionModalOpen(true);
    //console.log('eccolo: ' + isNewCollectionModalOpen);
  };

  const handleCloseCollectionModal = () => {
    setNewCollectionModalOpen(false);
  };

  // handle which collection is clicked to show the right data
  const handleCollectionClick = () => {
    //console.log('1: ' + collectionClicked);
    //console.log('1 index: ' + collectionIndex);
    //console.log('1 prev index: ' + prevCollectionIndex);

    if (!collectionClicked) {
      setCollectionClicked(true);
    } else if (collectionClicked && collectionIndex !== prevCollectionIndex) {
      setCollectionClicked(true);
    }

    setPrevCollectionIndex(collectionIndex);

    //console.log('2: ' + collectionClicked);
    //console.log('2 index: ' + collectionIndex);
    //console.log('2 prev index: ' + prevCollectionIndex);
  };

  const handleDeleteCollection = (idColl: number, nameColl: string) => {
    if (collectionClicked) {
      setCollectionClicked(false);
    }
    deleteCollection(idColl, nameColl);
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

  // recover all the oers of a collection
  useEffect(() => {
    if (hydrated && collections?.length > 0) {
      try {
        const fetchOerData = async () => {
          if (collections[collectionIndex]?.oers) {
            // check if the obj is undefined before to access in it
            const oerData = await Promise.all(
              collections[collectionIndex]?.oers?.map(async (oer: any) => {
                const oerFound = await getDataOerById(oer.idOer);
                return oerFound;
              })
            );
            setOersById(oerData);
          }
        };

        fetchOerData();

        console.log(oersById);
      } catch (error) {
        throw error;
      }
    }
  }, [collectionIndex]);

  return (
    <Flex w="100%" h="100%">
      <Navbar user={user} pageName="Your resources" />
      <SideBar pagePath={router.pathname} />

      <Box
        ml="200px"
        py="115px"
        pl="40px"
        w="full"
        minH="100vh"
        bg="background"
      >
        <Flex
          w="100%"
          justifyContent="left"
          //justify="space-between"
        >
          <Heading>Your resources</Heading>
        </Flex>

        <Flex w="full" minH="full" my="30px" gap={3}>
          <Box
            borderRight="2px"
            borderRightColor="secondary"
            w="25%"
            p="25px"
            minH="full"
          >
            <HStack mb="3">
              <Heading fontSize="25px">Collections</Heading>
              <Spacer />
              <Button
                variant="ghost"
                _hover={{ bg: 'backgound' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenNewCollectionModal();
                }}
              >
                <Icon as={LuFolderPlus} w="30px" h="30px" />
              </Button>
            </HStack>
            <Box>
              {hydrated &&
                collections?.map(
                  (collection: CollectionProps, index: number) => (
                    <HStack
                      ref={collectionRef}
                      key={collection.id}
                      mb="3"
                      w="100%"
                      position="relative"
                      //overflow="hidden"
                    >
                      <Flex
                        w="100%"
                        _hover={{ bg: 'gray.200' }}
                        onClick={(e) => {
                          e.preventDefault();
                          setCollectionIndex(index);
                          handleCollectionClick();
                        }}
                        cursor={'pointer'}
                      >
                        <Icon as={FcFolder} w="30px" h="30px" mr="3" />
                        <Heading
                          fontSize="22px"
                          fontWeight="semibold"
                          noOfLines={1}
                          //overflow={"hidden"}
                          w={'65%'}
                        >
                          {collection.name}
                        </Heading>
                      </Flex>

                      <Button
                        variant="ghost"
                        _hover={{ bg: 'background' }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteCollection(
                            collection.id,
                            collection.name
                          );
                        }}
                        position="absolute"
                        right={'0px'}
                      >
                        <DeleteIcon />
                      </Button>
                    </HStack>
                  )
                )}
            </Box>
          </Box>
          <Box
            p="25px"
            //borderLeft="2px"
            //borderLeftColor="secondary"
            h="full"
          >
            {hydrated && collectionClicked && (
              <Box minW="550px">
                <Flex w="100%" mb="3">
                  <Icon as={FcFolder} w="30px" h="30px" mr="3" />
                  <Heading
                    fontSize="22px"
                    fontWeight="semibold"
                    overflow={'hidden'}
                  >
                    {collections[collectionIndex].name}
                  </Heading>
                  <Spacer />
                  <DownloadButton
                    data={collections[collectionIndex]}
                    fileName={collections[collectionIndex].name}
                  />
                </Flex>
                <Text
                  fontWeight="light"
                  fontSize="small"
                  color="grey"
                  mb="3"
                >{`${collections[collectionIndex]?.oers.length} resources`}</Text>
                <ResourceCardsList oers={oersById} isNormalSizeCard={true} />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>

      {isNewCollectionModalOpen && (
        <CollectionModal
          isOpen={isOpen}
          onClose={handleCloseCollectionModal}
          isNewCollection={true}
          isFromFolderButton={true}
        />
      )}
    </Flex>
  );
};

export default Home;
