import { Box, BoxProps, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { OerItemToDeleteProps } from '../../../pages/resources';
import {
  CollectionProps,
  OerConceptInfo,
  OerInCollectionProps,
  OerProps,
} from '../../../types/encoreElements';
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
  oersById: OerProps[];
  setOersById: Dispatch<SetStateAction<OerProps[]>>;
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
  handleDeleteButtonClick: (collectionIndex: number, idOer: number) => void;
  OerItemToDelete: OerItemToDeleteProps | null;
  setOerItemToDelete: Dispatch<SetStateAction<OerItemToDeleteProps | null>>;
  setSelectedConceptsForCollection: (
    collectionId: number,
    concepts: OerConceptInfo[]
  ) => Promise<void>;
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
  setIsNewDataLoaded,
  setSelectedConceptsForCollection,
  // handle deleting a resource
  isDeleteAlertDialogOpen,
  onCloseDeleteAlertDialog,
  handleDeleteButtonClick,
  OerItemToDelete,
  setOerItemToDelete,
  ...rest
}: CollectionViewProps) {
  const hydrated = useHasHydrated();
  const [uniqueConcepts, setUniqueConcepts] = useState<OerConceptInfo[]>([]);

  const extractUniqueConcepts = (collection: CollectionProps) => {
    // extracting concepts only for the selected collection

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

  const handleConceptsChange = async (
    selectedOptions: MultiValue<OerConceptInfo>
    //actionMeta: ActionMeta<OerConceptInfo>
  ) => {
    //setSelectedConcepts(selectedOptions.map((option) => option));

    //recall the context function to store concept selected
    await setSelectedConceptsForCollection(
      collections[collectionIndex]?.id,
      selectedOptions?.map((option: OerConceptInfo) => option)
    );
  };

  useEffect(() => {
    //alert("CollectionView");

    setViewChanged(true); // to trigger the OerCardsSorting useEffect. Read also comment in resource.tsx
    //console.log("I'm triggering viewChanged to true");
    /*if (setIsNewDataLoaded) {
      setIsNewDataLoaded(true);
    }*/
    extractUniqueConcepts(collections[collectionIndex]);
    //console.log("I'm extracting unique concepts after collectionIndex change");
    //console.log("COLLECTION INDEX: " + collectionIndex);
    //console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds());

    // "collections" is a dependency because we need to extract the unique concepts for the selected collection
    // But in this way we also reset the sorting of the OERs.
  }, [collectionIndex]);

  // I have to decide where to put this useEffect. Here or in resources.tsx
  useEffect(() => {
    if (collectionIndex >= 0 && oersById?.length >= 0) {
      // with 'oersById?.length > 0' it doesn't trigger the update of the conceptsSelected array of the collection after deleting the last resource
      // add a conditional variable to be sure that the rendering of the cards will be after oers are loaded
      if (setIsNewDataLoaded !== undefined) {
        setIsNewDataLoaded(true);
        //console.log("I'm triggering isNewDataLoaded to true");
      }

      // I have to update the conceptsSelected array of the collection with the concepts of the oers that are in the collection after deleting a resource
      const remainingConcepts = collections[
        collectionIndex
      ]?.conceptsSelected?.filter((concept: OerConceptInfo) => {
        return oersById?.some(
          (oer: OerProps) =>
            oer.concepts
              ?.map((oerConcept: OerConceptInfo) => oerConcept.id)
              .includes(concept.id)
        );
      });

      setSelectedConceptsForCollection(
        collections[collectionIndex]?.id,
        remainingConcepts
      );
    }
  }, [oersById]);

  useEffect(() => {
    // console.log(collections[collectionIndex]?.oers?.length);
    // console.log(collections[collectionIndex]?.conceptsSelected);
    extractUniqueConcepts(collections[collectionIndex]);
    // console.log("I'm extracting unique concepts after deleting a resource");
  }, [collections]);

  return (
    <Box {...rest}>
      <Box w="550px">
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
          >{`${collections[collectionIndex]?.oers.length} resources`}</Text>
          <Flex flex="1" w="full" justifyContent="flex-end">
            <OerCardsSorting
              filtered={oersById}
              setFiltered={setOersById}
              viewChanged={viewChanged}
              setViewChanged={setViewChanged}
            />
          </Flex>
        </HStack>
        <VStack>
          {hydrated && isNewDataLoaded && (
            <ResourceCardsList
              oers={oersById}
              //collection={collections[collectionIndex]}
              isNormalSizeCard={true}
              itemsPerPage={5}
              collectionColor={collections[collectionIndex]?.color}
              isResourcePage={true}
              // deleteResourceFromCollection={deleteResourceFromCollection}
              handleDeleteButtonClick={handleDeleteButtonClick}
              collectionIndex={collectionIndex}
            />
          )}
          <Flex justifyContent="center" padding="5">
            <AddResourcesButton
              text="Add Resources ..."
              pathname="/"
              variant="primary"
            />
          </Flex>
        </VStack>
      </Box>

      <ConceptsCollectionView
        handleConceptsChange={handleConceptsChange}
        uniqueConcepts={uniqueConcepts}
        conceptsSeletedLength={
          collections[collectionIndex]?.conceptsSelected?.length
        }
        conceptsSelected={collections[collectionIndex]?.conceptsSelected}
        oersLength={collections[collectionIndex]?.oers?.length}
        label_tooltip="Here you will find all the concepts covered by the OERs in this collection. Select the concepts that interest you and start building new learning paths"
      />

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
