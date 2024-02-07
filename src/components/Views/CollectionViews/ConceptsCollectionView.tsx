import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import { MultiValue } from 'react-select';
import icon_infocircle from '../../../public/Icons/icon_infocircle.svg';
import { OerConceptInfo } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import SelectConcepts from '../../Selects/SelectConcepts';

type ConceptsCollectionViewProps = {
  uniqueConcepts: OerConceptInfo[];
  handleConceptsChange: (selectedOptions: MultiValue<OerConceptInfo>) => void;
  conceptsSelectedLength: number;
  conceptsSelected: OerConceptInfo[];
  oersLength: number;
  label_tooltip: string;
};

export default function ConceptsCollectionView({
  uniqueConcepts,
  handleConceptsChange,
  conceptsSelectedLength,
  conceptsSelected,
  oersLength,
  label_tooltip,
}: ConceptsCollectionViewProps) {
  const hydrated = useHasHydrated();

  //const label_tooltip =
  //'Here you will find all the concepts covered by the OERs in this collection. Select the concepts that interest you and start building new learning paths';

  return (
    <Box
      px={5}
      flex="1"
      display="flex"
      flexDirection="column"
      //h="full"
      //w="full"
      //minW="150px"
      bg="background"
    //justifyContent="center"
    >
      <Flex gap={1} bg="background">
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
          <Heading fontSize="18px" fontWeight="semibold" pb="2">
            Choose the key concepts you wish to incorporate into the learning
            path.
          </Heading>
          <Text fontWeight="light" color="grey">
            {conceptsSelectedLength === 1
              ? `${conceptsSelectedLength} concept selected`
              : `${conceptsSelectedLength} concepts selected`}
          </Text>
        </Box>
      </Flex>
      <Box minW="250px" p={3} h="full" bg="background">
        {hydrated && (
          <SelectConcepts
            collectionLength={oersLength}
            conceptsSelected={conceptsSelected}
            handleConceptsChange={handleConceptsChange}
            uniqueConcepts={uniqueConcepts}
          />
        )}
      </Box>
    </Box>
  );
}
