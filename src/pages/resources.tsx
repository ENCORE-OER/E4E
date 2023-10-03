import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useCollectionsContext } from '../components/CollectionsContext/CollectionsContext';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';

import { LuFolderPlus } from 'react-icons/lu';
import CollectionModal from '../components/Modals/CollectionModals';
import CollectionNavItem from '../components/NavItems/CollectionNavItem';
import CollectionView from '../components/Views/CollectionView';
import { APIV2 } from '../data/api';
import {
  CollectionProps,
  OerInCollectionProps,
  OerProps,
} from '../types/encoreElements';
import { useHasHydrated } from '../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

const Home = (props: DiscoverPageProps) => {
  const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
  const { user } = useUser();
  const { collections, deleteCollection } = useCollectionsContext();
  const collectionRef = useRef<HTMLDivElement>(null);

  const [oersById, setOersById] = useState<OerProps[]>([]);
  const hydrated = useHasHydrated(); // used to avoid hydration failed

  // handle the click on the collection
  const [collectionClicked, setCollectionClicked] = useState<boolean>(false);
  const [collectionIndex, setCollectionIndex] = useState<number>(-1);
  const [viewChanged, setViewChanged] = useState<boolean>(false); // used to force the re-render of the CollectionView component
  //const [prevCollectionIndex, setPrevCollectionIndex] = useState<number>(-1); // handle in CollectionNavItem
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

  const getDataOerById = async (id_oer?: number) => {
    const api = new APIV2(props.accessToken);

    if (id_oer) {
      try {
        const oer = await api.getOerById(id_oer);
        return oer[0];
      } catch (error) {
        throw error;
      }
    }
  };

  // recover all the oers of a collection
  useEffect(() => {
    if (hydrated && collections?.length > 0) {
      setViewChanged(true);
      try {
        const fetchOerData = async () => {
          if (collections[collectionIndex]?.oers) {
            // check if the obj is undefined before to access in it
            const oerData = await Promise.all(
              collections[collectionIndex]?.oers?.map(
                async (oer: OerInCollectionProps) => {
                  console.log(oer);
                  const oerFound = await getDataOerById(oer?.id);
                  return oerFound;
                }
              )
            );
            setOersById(oerData);
          }
        };

        fetchOerData();
        //console.log(oersById);
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
            w="300px"
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
                    <CollectionNavItem
                      key={index}
                      index={index}
                      collection={collection}
                      collectionRef={collectionRef}
                      collectionClicked={collectionClicked}
                      setCollectionClicked={setCollectionClicked}
                      collectionIndex={collectionIndex}
                      setCollectionIndex={setCollectionIndex}
                      deleteCollection={deleteCollection}

                    >
                      {collection.name}
                    </CollectionNavItem>
                  )
                )}
            </Box>
          </Box>
          <Box p="25px" flex="1" h="full">
            {hydrated && collectionClicked && (
              <CollectionView
                viewChanged={viewChanged}
                setViewChanged={setViewChanged}
                collectionIndex={collectionIndex}
                collections={collections}
                oersById={oersById}
                setOersById={setOersById}
                minW={'550px'}
                display="flex"
              />
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
