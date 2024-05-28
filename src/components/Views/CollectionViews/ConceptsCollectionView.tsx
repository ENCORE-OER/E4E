import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { MultiValue } from 'react-select';
import { OerConceptInfo } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import IconInfoCircleTooltip from '../../Icons/IconInfoCircle/IconInfoCircleTooltip';
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
        <IconInfoCircleTooltip label_tooltip={label_tooltip} />
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
