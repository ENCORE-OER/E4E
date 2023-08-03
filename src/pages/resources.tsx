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
import ResourceCards from '../components/Card/ResourceCards';
import AddCollectionModal from '../components/Modals/AddCollectionModal';
import { APIV2 } from '../data/api';
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
  const [collectionIndex, setCollectionIndex] = useState<number>(0);
  const [prevCollectionIndex, setPrevCollectionIndex] = useState<number>(-1);
  const { isOpen } = useDisclosure();

  /*const handleAddCollection = () => {
    const nameCollection = 'Food';
    addCollection(nameCollection);
  };*/

  const [isAddCollectionModalOpen, setAddCollectionModalOpen] =
    useState<boolean>(false);

  const handleOpenAddCollectionModal = () => {
    setAddCollectionModalOpen(true);
    console.log('eccolo: ' + isAddCollectionModalOpen);
  };

  const handleCloseCollectionModal = () => {
    setAddCollectionModalOpen(false);
  };

  // handle which collection is clicked to show the right data
  const handleCollectionClick = () => {
    console.log('1: ' + collectionClicked);
    console.log('1 index: ' + collectionIndex);
    console.log('1 prev index: ' + prevCollectionIndex);

    if (!collectionClicked) {
      setCollectionClicked(true);
    } else if (collectionClicked && collectionIndex !== prevCollectionIndex) {
      setCollectionClicked(true);
    }

    setPrevCollectionIndex(collectionIndex);

    console.log('2: ' + collectionClicked);
    console.log('2 index: ' + collectionIndex);
    console.log('2 prev index: ' + prevCollectionIndex);
  };

  const handleDeleteCollection = (idCol: number) => {
    if (collectionClicked) {
      setCollectionClicked(false);
    }
    deleteCollection(idCol);
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
    if (collections?.length > 0) {
      try {
        const fetchOerData = async () => {
          const oerData = await Promise.all(
            collections[collectionIndex]?.oers?.map(async (oer: any) => {
              const oerFound = await getDataOerById(oer.idOer);
              return oerFound;
            })
          );
          setOersById(oerData);
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

      <Box ml="200px" py="115px" pl="40px" w="full" h="100vh" bg="background">
        <Flex
          w="100%"
          justifyContent="left"
          //justify="space-between"
        >
          <Heading>Your resources</Heading>
        </Flex>

        <Flex w="full" h="full" my="30px" gap={3}>
          <Box
            borderRight="2px"
            borderRightColor="secondary"
            w="22%"
            p="25px"
            h="full"
          >
            <HStack mb="3">
              <Heading fontSize="25px">Collections</Heading>
              <Spacer />
              <Button
                variant="ghost"
                _hover={{ bg: 'backgound' }}
                onClick={(e) => {
                  e.preventDefault();
                  /*const id = Math.random();
                  addCollection(id, nameCollection);
                  console.log('id collection: ' + id);
                  //setIdCollection(idCollection + 1);*/
                  handleOpenAddCollectionModal();
                }}
              >
                <Icon as={LuFolderPlus} w="30px" h="30px" />
              </Button>
            </HStack>
            <Box>
              {hydrated &&
                collections?.map((collection: any, index: number) => (
                  <HStack
                    ref={collectionRef}
                    key={collection.id}
                    mb="3"
                    w="100%"
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
                      >
                        {collection.name}
                      </Heading>
                    </Flex>
                    <Spacer />
                    <Button
                      variant="ghost"
                      _hover={{ bg: 'background' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCollection(collection.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </HStack>
                ))}
            </Box>
          </Box>

          <Box p="25px">
            {collectionClicked && (
              <Box minW="550px">
                <HStack w="100%" mb="3">
                  <Icon as={FcFolder} w="30px" h="30px" mr="3" />
                  <Heading fontSize="22px" fontWeight="semibold">
                    {collections[collectionIndex].name}
                  </Heading>
                  <Spacer />
                  <DownloadButton
                    data={collections[collectionIndex]}
                    fileName={collections[collectionIndex].name}
                  />
                </HStack>
                <Text
                  fontWeight="light"
                  fontSize="small"
                  color="grey"
                  mb="3"
                >{`${collections[collectionIndex].oers.length} resources`}</Text>
                <ResourceCards oers={oersById} isNormalSizeCard={true} />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>

      {isAddCollectionModalOpen && (
        <AddCollectionModal
          isOpen={isOpen}
          onClose={handleCloseCollectionModal}
        />
      )}
    </Flex>
  );
};

export default Home;
