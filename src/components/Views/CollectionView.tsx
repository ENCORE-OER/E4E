import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import Select, { MultiValue } from 'react-select';
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
import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';

interface CollectionViewProps extends BoxProps {
  collections: CollectionProps[];
  collectionIndex: number;
  oersById: OerProps[];
}

export default function CollectionView({
  collections,
  collectionIndex,
  oersById,
  ...rest
}: CollectionViewProps) {
  const hydrated = useHasHydrated();
  const [uniqueConcepts, setUniqueConcepts] = useState<OerConceptInfo[]>([]);

  const { setSelectedConceptsForCollection } = useCollectionsContext();

  const label_tooltip =
    'Here you will find all the concepts covered by the OERs in this collection. Select the concepts that interest you and start building new learning paths';

  const extractUniqueConcepts = (collection: CollectionProps) => {
    // exttracting concepts only for the selected collection

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

    //recall the context funtion to store concept selected
    setSelectedConceptsForCollection(
      collections[collectionIndex].id,
      selectedOptions.map((option) => option)
    );
  };

  useEffect(() => {
    extractUniqueConcepts(collections[collectionIndex]);
  }, [collectionIndex]);

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
        <Text
          fontWeight="light"
          fontSize="small"
          color="grey"
          mb="3"
        >{`${collections[collectionIndex]?.oers.length} resources`}</Text>
        <VStack>
          <ResourceCardsList
            oers={oersById}
            isNormalSizeCard={true}
            itemsPerPage={5}
            collectionColor={collections[collectionIndex]?.color}
          />
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
              Select concepts that you want use for the creation of the learning
              paths.
            </Heading>
            <Text fontWeight="light" color="grey">
              {`${collections[collectionIndex]?.conceptsSelected?.length} resources selected`}
            </Text>
          </Box>
        </Flex>
        <Box w="full" p={3} h="full">
          {hydrated && (
            <Select
              minMenuHeight={10000}
              isMulti
              isDisabled={
                !collections[collectionIndex]?.oers.length ||
                collections[collectionIndex]?.oers.length === 0
              }
              options={uniqueConcepts}
              value={collections[collectionIndex].conceptsSelected}
              onChange={handleConceptsChange}
              getOptionLabel={(option) => option.label} // Specifica come ottenere la label
              getOptionValue={(option) => option.id.toString()} // Specifica come ottenere il valore
              placeholder="Select Concepts"
              menuPortalTarget={document.body} // Portale separato per il menu
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: '5px',
                  //minHeight: '30px',
                  //height: '30px',
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                menu: (base) => ({
                  ...base,
                  maxHeight: 'none',
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: '550px', // here to extend optionsList height
                }),
                option: (provided) => ({
                  ...provided,
                  //padding: '10px', // imposta l'altezza delle opzioni qui
                  borderRadius: '5px',
                }),
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
