import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { MultiValue } from 'react-select';
import { OerItemToDeleteProps } from '../../pages/resources';
import icon_infocircle from '../../public/Icons/icon_infocircle.svg';
import {
  CollectionProps,
  OerConceptInfo,
  OerInCollectionProps,
  OerProps,
} from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import AddResourcesButton from '../Buttons/AddResourcesButton';
import DownloadButton from '../Buttons/DownloadButton';
import ResourceCardsList from '../Card/OerCard/ResourceCardsList';
import DeleteAlertDialog from '../Modals/DeleteAlertDialog';
import SelectConcepts from '../Selects/SelectConcepts';
import OerCardsSorting from '../Sorting/OerCardsSorting';

interface CollectionViewProps extends BoxProps {
  collections: CollectionProps[];
  collectionIndex: number;
  oersById: OerProps[];
  setOersById: Dispatch<SetStateAction<OerProps[]>>;
  viewChanged: boolean;
  setViewChanged: Dispatch<SetStateAction<boolean>>;
  handleDeleteResource: (
    collectionIndex: number,
    idOer: number
  ) => Promise<void>;
  isNewDataLoaded?: boolean;
  setIsNewDataLoaded?: Dispatch<SetStateAction<boolean>>;
  isDeleteAlertDialogOpen: boolean;
  onCloseDeleteAlertDialog: () => void;
  handleDeleteButtonClick: (
    collectionIndex: number,
    idOer: number
  ) => void;
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

  const label_tooltip =
    'Here you will find all the concepts covered by the OERs in this collection. Select the concepts that interest you and start building new learning paths';


  const extractUniqueConcepts = (collection: CollectionProps) => {
    // extracting concepts only for the selected collection

    const uniqueConceptsSet = new Set<OerConceptInfo>();

    collection.oers?.forEach((oer: OerInCollectionProps) => {
      oer.concepts?.forEach((concept: OerConceptInfo) => {
        uniqueConceptsSet.add(concept);
      });
    });

    setUniqueConcepts(Array.from(uniqueConceptsSet));
  };


  const handleConceptsChange = (
    selectedOptions: MultiValue<OerConceptInfo>
    //actionMeta: ActionMeta<OerConceptInfo>
  ) => {
    //setSelectedConcepts(selectedOptions.map((option) => option));

    //recall the context function to store concept selected
    setSelectedConceptsForCollection(
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

  useEffect(() => {
    extractUniqueConcepts(collections[collectionIndex]);
    //console.log("I'm extracting unique concepts after deleting a resource");
  }, [collections])

  // I have to decide where to put this useEffect. Here or in resources.tsx
  useEffect(() => {

    if (collectionIndex >= 0 && oersById?.length > 0) {

      // add a conditional variable to be sure that the rendering of the cards will be after oers are loaded
      if (setIsNewDataLoaded !== undefined) {
        setIsNewDataLoaded(true);
        //console.log("I'm triggering isNewDataLoaded to true");
      }

      // I have to update the conceptsSelected array of the collection with the concepts of the oers that are in the collection after deleting a resource
      const remainingConcepts = collections[collectionIndex]?.conceptsSelected?.filter((concept: OerConceptInfo) => {
        return oersById?.some((oer: OerProps) =>
          oer.concepts?.map((oerConcept: OerConceptInfo) => oerConcept.id).includes(concept.id)
        );
      });

      setSelectedConceptsForCollection(collections[collectionIndex]?.id, remainingConcepts);
    }

  }, [oersById]);

  return (
    <Box {...rest}>
      <Box w="550px">
        <Flex w="100%" mb="3">
          <Icon as={FcFolder} w="30px" h="30px" mr="3" />
          <Heading fontSize="22px" fontWeight="semibold" overflow={'hidden'}>
            {collections[collectionIndex]?.name}
          </Heading>
          <Spacer />
          <DownloadButton
            data={collections[collectionIndex]}
            fileName={collections[collectionIndex].name}
          />
        </Flex>
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
              oersById={oersById}
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

      <Box
        px={5}
        flex="1"
        display="flex"
        flexDirection="column"
        h="full"
      //justifyContent="center"
      >
        <Flex gap={1}>
          <Tooltip
            hasArrow
            placement="top"
            label={label_tooltip}
            aria-label={label_tooltip}
            //ml="1px"
            bg="white"
            color="primary"
            p={2}
          >
            <span>
              <Image src={icon_infocircle} alt="infocircle" />
            </span>
          </Tooltip>
          <Box>
            <Heading fontSize="18px" fontWeight="semibold" mb="2">
              Choose the key concepts you wish to incorporate into the learning
              path.
            </Heading>
            <Text fontWeight="light" color="grey">
              {`${collections[collectionIndex]?.conceptsSelected?.length} concepts selected`}
            </Text>
          </Box>
        </Flex>
        <Box w="full" p={3} h="full">
          {hydrated && (
            <SelectConcepts
              collectionLength={collections[collectionIndex]?.oers?.length}
              conceptsSelected={collections[collectionIndex]?.conceptsSelected}
              handleConceptsChange={handleConceptsChange}
              uniqueConcepts={uniqueConcepts}
            />
          )}
        </Box>
      </Box>

      <DeleteAlertDialog
        isOpen={isDeleteAlertDialogOpen}
        onClose={onCloseDeleteAlertDialog}
        onConfirm={() => {
          if (OerItemToDelete) {
            handleDeleteResource(
              OerItemToDelete.collectionIndex,
              OerItemToDelete.oer_id,
            );
            setOerItemToDelete(null);
          }
          onCloseDeleteAlertDialog();
        }}
        item_name={OerItemToDelete ? OerItemToDelete.oer_title : ''}
        modalText={`You have selected one or more concepts referred to this Oer.
      If you delete it, the concepts could be removed.\n
      Are you sure you want to delete`}
      />
    </Box>
  );
}
