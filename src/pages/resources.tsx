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

import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { useCollectionsContext } from '../Contexts/CollectionsContext/CollectionsContext';

import { LuFolderPlus } from 'react-icons/lu';
import CollectionModal from '../components/Modals/CollectionModals';
import CollectionNavItem from '../components/NavItems/CollectionNavItem';
import CollectionView from '../components/Views/CollectionViews/CollectionView';
import { APIV2 } from '../data/api';
import {
  CollectionProps,
  OerConceptInfo,
  OerInCollectionProps,
  OerProps,
} from '../types/encoreElements';
import { CustomToast } from '../utils/Toast/CustomToast';
import { useHasHydrated } from '../utils/utils';

type DiscoverPageProps = {
  accessToken: string | undefined;
};

export interface OerItemToDeleteProps {
  collectionIndex: number;
  oer_id: number;
  oer_title: string;
}

const Home = (props: DiscoverPageProps) => {
  const router = useRouter();
  const { user } = useUser();
  const {
    collections,
    deleteCollection,
    deleteResourceFromCollection,
    setSelectedConceptsForCollection,
    addCollection, // for InfoCardModal
    addResource, // for InfoCardModal
  } = useCollectionsContext();
  const collectionRef = useRef<HTMLDivElement>(null);

  const [oersById, setOersById] = useState<OerProps[]>([]);
  const hydrated = useHasHydrated(); // used to avoid hydration failed
  const { addToast } = CustomToast();

  // handle the click on the collection
  const [collectionClicked, setCollectionClicked] = useState<boolean>(false);
  const [collectionIndex, setCollectionIndex] = useState<number>(-1);
  const [viewChanged, setViewChanged] = useState<boolean>(false); // used to force the re-render of the CollectionView component when I trigger oerSortingMenu
  //const [prevCollectionIndex, setPrevCollectionIndex] = useState<number>(-1); // handle in CollectionNavItem
  const { isOpen } = useDisclosure();

  // abortController to abort the fetch request when I switch collection to fast
  const abortController = new AbortController();
  // used to know if the data are loaded
  const [isNewDataLoaded, setIsNewDataLoaded] = useState<boolean>(false);

  // for loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /*const handleAddCollection = () => {
    const nameCollection = 'Food';
    addCollection(nameCollection);
  };*/

  const [isNewCollectionModalOpen, setNewCollectionModalOpen] =
    useState<boolean>(false);

  const handleOpenNewCollectionModal = () => {
    setNewCollectionModalOpen(true);
  };

  const handleCloseCollectionModal = () => {
    setNewCollectionModalOpen(false);
  };

  const getDataOerById = async (id_oer?: number, signal?: AbortSignal) => {
    const api = new APIV2(props.accessToken);

    if (id_oer) {
      try {
        const oer = await api.getOerById(id_oer, signal);
        return oer[0];
      } catch (error) {
        throw error;
      }
    }
  };

  // ------------------ handle deleting of a Oer ------------------
  // handle deleting oer
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] =
    useState<boolean>(false);
  const [OerItemToDelete, setOerItemToDelete] =
    useState<OerItemToDeleteProps | null>(null);

  const onCloseDeleteAlertDialog = () => {
    setIsDeleteAlertDialogOpen(false);
  };

  /*const handleDeleteOer = (
    collectionIndex: number,
    idOer: number,
  ) => {
    deleteResourceFromCollection(collectionIndex, idOer);
  };*/

  const onOpenDeleteAlertDialog = (
    collectionIndex: number,
    oer_id: number,
    oer_title: string
  ) => {
    setIsDeleteAlertDialogOpen(true);
    setOerItemToDelete({ collectionIndex, oer_id, oer_title });
  };

  const handleDeleteResource = async (
    collectionIndex: number,
    idOer: number
  ) => {
    try {
      await deleteResourceFromCollection(collectionIndex, idOer);
      console.log(
        `delete resource ${idOer} from collection ${collectionIndex}`
      );
      /*while (!hydrated) {
        console.log('hydrated: ' + hydrated);
      }*/
      setOersById((prevOers) => prevOers.filter((oer) => oer.id !== idOer));
      //console.log("I'm triggering oersById deleting a resource");
    } catch (error) {
      addToast({
        message: `${error}`,
        type: 'error',
      });
    }
  };

  const handleDeleteButtonClick = (collectionIndex: number, idOer: number) => {
    console.log('Delete button clicked');
    const hasResourceAtLeastOneConceptSelected = oersById
      .find((oer: OerProps) => oer.id === idOer)
      ?.concepts?.some((oerConcept: OerConceptInfo) => {
        return collections[collectionIndex]?.conceptsSelected?.some(
          (concept: OerConceptInfo) => concept.id === oerConcept.id
        );
      });
    const oer_title = oersById.find((oer: OerProps) => oer.id === idOer)?.title;

    if (
      collections[collectionIndex]?.conceptsSelected?.length > 0 &&
      hasResourceAtLeastOneConceptSelected &&
      oer_title
    ) {
      onOpenDeleteAlertDialog(collectionIndex, idOer, oer_title);
    } else {
      handleDeleteResource(collectionIndex, idOer);
    }
  };

  // --------------------------------------------------------------

  // recover all the oers of a collection
  useEffect(() => {
    //alert("Resources")

    if (collections?.length > 0) {
      try {
        //setViewChanged(true); // set to true in CollectionView 'Cause from this page we don't trigger the OerCardsSorting useEffect.
        //console.log("--- Collection index: " + collectionIndex + " --- " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds());
        setIsNewDataLoaded(false);
        setIsLoading(true);
        //console.log("I'm triggering isNewDataLoaded to false");
        const fetchOerData = async () => {
          if (collections[collectionIndex]?.oers) {
            // check if the obj is undefined before to access in it
            const oerData = await Promise.all(
              collections[collectionIndex]?.oers?.map(
                async (oer: OerInCollectionProps) => {
                  console.log(oer);
                  const oerFound = await getDataOerById(
                    oer?.id,
                    abortController.signal
                  );
                  return oerFound;
                }
              )
            );
            setOersById(oerData);
            //console.log("I'm triggering oersById");

            console.log('End fetchOerData()');
          }
        };

        fetchOerData();

        return () => {
          abortController.abort();
        };
        //console.log(oersById);
      } catch (error) {
        addToast({
          message: `${error}`,
          type: 'error',
        });
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
                isNewDataLoaded={isNewDataLoaded}
                setIsNewDataLoaded={setIsNewDataLoaded}
                setSelectedConceptsForCollection={
                  setSelectedConceptsForCollection
                }
                // handle deleting of a Oer with alert dialog
                handleDeleteResource={handleDeleteResource}
                isDeleteAlertDialogOpen={isDeleteAlertDialogOpen}
                onCloseDeleteAlertDialog={onCloseDeleteAlertDialog}
                handleDeleteButtonClick={handleDeleteButtonClick}
                OerItemToDelete={OerItemToDelete}
                setOerItemToDelete={setOerItemToDelete}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
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
          collections={collections}
          addCollection={addCollection}
          addResource={addResource}
        />
      )}
    </Flex>
  );
};

export default Home;
