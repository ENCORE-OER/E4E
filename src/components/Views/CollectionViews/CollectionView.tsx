import { Box, BoxProps, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { MultiValue } from 'react-select';
import { OerItemToDeleteProps } from '../../../pages/resources';
import {
  CollectionProps,
  OerConceptInfo,
  OerInCollectionProps,
  OerProps,
} from '../../../types/encoreElements';
import { OerFreeSearchProps } from '../../../types/encoreElements/oer/OerFreeSearch';
import { useHasHydrated } from '../../../utils/utils';
import AddResourcesButton from '../../Buttons/AddResourcesButton';
import ResourceCardsList from '../../Card/OerCard/ResourceCardsList';
import DeleteOerAlertDialog from '../../Modals/DeleteAlertDialog/DeleteOerAlertDialog';
import OerCardsSorting from '../../Sorting/OerCardsSorting';
import ConceptsCollectionView from './ConceptsCollectionView';
import HeaderCollectionView from './HeaderCollectionView';

interface CollectionViewProps extends BoxProps {
  collections: CollectionProps[];
  collectionIndex: number;
  oersById: (OerProps | undefined | OerFreeSearchProps)[];
  setOersById: Dispatch<
    SetStateAction<(OerProps | undefined | OerFreeSearchProps)[]>
  >;
  viewChanged: boolean;
  setViewChanged: Dispatch<SetStateAction<boolean>>;
  isNewDataLoaded?: boolean;
  setIsNewDataLoaded?: Dispatch<SetStateAction<boolean>>;
  //--------------------------------------
  // handle deleting a resource
  handleDeleteResource: (
    collectionIndex: number,
    idOer: number
  ) => Promise<void>;
  isDeleteAlertDialogOpen: boolean;
  onCloseDeleteAlertDialog: () => void;
  handleDeleteButtonClick: (
    collectionIndex: number,
    idOer: number | undefined
  ) => void;
  OerItemToDelete: OerItemToDeleteProps | null;
  setOerItemToDelete: Dispatch<SetStateAction<OerItemToDeleteProps | null>>;
  setSelectedConceptsForCollection: (
    collectionId: number,
    concepts: OerConceptInfo[]
  ) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isDeletingResource: boolean;
  setIsDeletingResource: Dispatch<SetStateAction<boolean>>;
  isSmallerScreen?: boolean;
}

export default function CollectionView({
  collections,
  collectionIndex,
  oersById,
  setOersById,
  viewChanged,
  setViewChanged,
  handleDeleteResource,
  isNewDataLoaded,
  //setIsNewDataLoaded,
  setSelectedConceptsForCollection,
  // handle deleting a resource
  isDeleteAlertDialogOpen,
  onCloseDeleteAlertDialog,
  handleDeleteButtonClick,
  OerItemToDelete,
  setOerItemToDelete,
  //--------
  isLoading,
  setIsLoading,
  isDeletingResource,
  setIsDeletingResource,
  isSmallerScreen,
  ...rest
}: CollectionViewProps) {
  const hydrated = useHasHydrated();
  const isFirstRender = useRef<number>(0); // used to avoid the useEffect to be triggered at the first render
  const [uniqueConcepts, setUniqueConcepts] = useState<OerConceptInfo[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>('search_rank'); // used for the sorting of the resources
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAscending, setAscending] = useState<boolean>(true);

  const extractUniqueConcepts = (collection: CollectionProps) => {
    // extracting concepts only for the selected collection

    console.log("I'm extracting unique concepts");

    const uniqueConceptsSet = new Map<number, OerConceptInfo>();

    collection.oers?.forEach((oer: OerInCollectionProps) => {
      oer.concepts?.forEach((concept: OerConceptInfo) => {
        uniqueConceptsSet.set(concept.id, concept);
      });
    });

    const uniqueConceptsArray = Array.from(uniqueConceptsSet.values());

    setUniqueConcepts(
      uniqueConceptsArray.sort((a: OerConceptInfo, b: OerConceptInfo) =>
        a.label.localeCompare(b.label)
      )
    );
  };

  const handleConceptsChange = (
    selectedOptions: MultiValue<OerConceptInfo>
    //actionMeta: ActionMeta<OerConceptInfo>
  ) => {
    //setSelectedConcepts(selectedOptions.map((option) => option));

    //recall the context function to store concept selected
    if (selectedOptions !== collections[collectionIndex]?.conceptsSelected) {
      setSelectedConceptsForCollection(
        collections[collectionIndex]?.id,
        selectedOptions?.map((option: OerConceptInfo) => option)
      );
    }
  };

  const handleSortingChange = (sortingName: string) => {
    setSelectedSorting(sortingName);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemSortingClick = (sortingName: string) => {
    if (sortingName === selectedSorting) {
      setAscending(!isAscending);
    } else {
      handleSortingChange(sortingName);
      setAscending(true);
    }
  };

  useEffect(() => {
    //alert("CollectionView");
    if (collectionIndex > -1) {
      console.log('Use effect of CollectionIndex');

      setViewChanged(true); // to trigger the OerCardsSorting useEffect. Read also comment in resource.tsx

      extractUniqueConcepts(collections[collectionIndex]);
    }

    // But in this way we also reset the sorting of the OERs.
  }, [collectionIndex]);

  // In this useEffect don't recall setViewChanged(true) because it will trigger the OerCardsSorting useEffect and we don't want reload the sorting
  useEffect(() => {
    if (isDeletingResource) {
      //alert("CollectionView: I'm extracting unique concepts after deleting a resource");
      extractUniqueConcepts(collections[collectionIndex]);
      setIsDeletingResource(false);
    } // "collections" is a dependency because we need to extract the unique concepts for the selected collection
  }, [collections]);

  // I have to decide where to put this useEffect. Here or in resources.tsx
  // useEffect(() => {
  //   console.log("oersById: " + oersById);
  //   if (setIsNewDataLoaded !== undefined && oersById?.length > 0) {
  //     setIsNewDataLoaded(true);
  //     console.log("I'm triggering isNewDataLoaded to true");
  //   }
  // }, [oersById]);

  useEffect(() => {
    if (isFirstRender.current < 1) {
      console.log('First rendering');
      isFirstRender.current++;
    }
    try {
      // I have to update the conceptsSelected array of the collection with the concepts of the oers that are in the collection after deleting a resource
      const updatedConceptsSelected = () => {
        if (collections[collectionIndex]?.conceptsSelected?.length > 0) {
          const remainingConcepts = collections[
            collectionIndex
          ]?.conceptsSelected?.filter((concept: OerConceptInfo) => {
            return oersById?.some(
              (oer: OerProps | OerFreeSearchProps | undefined) =>
                oer?.concepts
                  ?.map((oerConcept: OerConceptInfo) => oerConcept.id)
                  .includes(concept.id)
            );
          });

          if (remainingConcepts.length > 0) {
            remainingConcepts?.forEach((concept: OerConceptInfo) => {
              console.log('Remaining concepts: ' + concept.label);
            });
          } else console.log('No remaining concepts');

          setSelectedConceptsForCollection(
            collections[collectionIndex]?.id,
            remainingConcepts
          );
        }
      };

      // with 'oersById?.length > 0' it doesn't trigger the update of the conceptsSelected array of the collection after deleting the last resource
      // add a conditional variable to be sure that the rendering of the cards will be after oers are loaded
      if (collectionIndex >= 0 && isNewDataLoaded && isDeletingResource) {
        updatedConceptsSelected();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [oersById]);

  // useEffect(() => {
  //   // console.log(collections[collectionIndex]?.oers?.length);
  //   // console.log(collections[collectionIndex]?.conceptsSelected);
  //   extractUniqueConcepts(collections[collectionIndex]);
  //   // console.log("I'm extracting unique concepts after deleting a resource");
  // }, [collections]);

  // to reset pagination when the collection is changed in 'Your resources' page
  useEffect(() => {
    if (currentPage !== 1) {
      console.log('Setting current page to 1');
      setCurrentPage(1);
    }
  }, [viewChanged, isAscending]);

  return (
    <Box {...rest}>
      <Flex bg="background" direction={isSmallerScreen ? 'column' : 'row'} flexWrap={'wrap'} overflowY="auto">
        <Box>
          <HeaderCollectionView
            collectionName={collections[collectionIndex]?.name}
            data={collections[collectionIndex]}
            fileName={collections[collectionIndex]?.name}
          />
          <HStack pb="3">
            <Text
              fontWeight="light"
              fontSize="small"
              color="grey"
            >{`${collections[collectionIndex]?.oers?.length} resources`}</Text>
            <Flex flex="1" w="full" justifyContent="flex-end">
              <OerCardsSorting
                filtered={oersById}
                setFiltered={setOersById}
                viewChanged={viewChanged}
                setViewChanged={setViewChanged}
                selectedSorting={selectedSorting}
                setSelectedSorting={setSelectedSorting}
                handleSortingChange={handleSortingChange}
                isAscending={isAscending}
                setAscending={setAscending}
                handleItemSortingClick={handleItemSortingClick}
              //setIsLoading={setIsLoading}
              />
            </Flex>
          </HStack>
          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          )}
          {!isLoading && hydrated && isNewDataLoaded && (
            <VStack>
              <ResourceCardsList
                oers={oersById}
                isNormalSizeCard={true}
                itemsPerPage={5}
                collectionsColor={[collections[collectionIndex]?.color]}
                isResourcePage={true}
                handleDeleteButtonClick={handleDeleteButtonClick}
                collectionIndex={collectionIndex}
                oersLength={oersById?.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                isSmallerScreen={isSmallerScreen}
              />
              <Flex justifyContent="center" padding="5">
                <AddResourcesButton
                  text="Add Resources ..."
                  pathname="/"
                  variant="primary"
                />
              </Flex>
            </VStack>
          )}
        </Box>

        {hydrated && (
          <ConceptsCollectionView
            handleConceptsChange={handleConceptsChange}
            uniqueConcepts={uniqueConcepts}
            conceptsSelectedLength={
              collections[collectionIndex]?.conceptsSelected?.length
            }
            conceptsSelected={
              collectionIndex > -1
                ? collections[collectionIndex]?.conceptsSelected
                : []
            }
            oersLength={collections[collectionIndex]?.oers?.length}
            label_tooltip="Here you will find all the concepts covered by the OERs in this collection. Select the concepts that interest you and start building new learning paths"
          />
        )}
      </Flex>

      <DeleteOerAlertDialog
        handleDeleteResource={handleDeleteResource}
        isDeleteAlertDialogOpen={isDeleteAlertDialogOpen}
        onCloseDeleteAlertDialog={onCloseDeleteAlertDialog}
        OerItemToDelete={OerItemToDelete}
        setOerItemToDelete={setOerItemToDelete}
      />
    </Box>
  );
}
