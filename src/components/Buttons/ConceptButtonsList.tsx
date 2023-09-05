import { Flex } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { CollectionProps, OerConceptInfo } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import ConceptButton from './ConceptButton';

type ConceptButtonsListProps = {
  collections: CollectionProps[];
  conceptSelectedIndex: number;
  setConceptSelectedIndex: Dispatch<SetStateAction<number>>;
  collectionIndex: number;
};

export default function ConceptButtonsList({
  collections,
  setConceptSelectedIndex,
  conceptSelectedIndex,
  collectionIndex,
}: ConceptButtonsListProps) {
  const hydrated = useHasHydrated();

  useEffect(() => {
    console.log('collection index in ConceptButtonList: ' + collectionIndex);
  }, [collectionIndex]);

  return (
    <Flex
      gap={3}
      //pb="5"
      flexWrap={'wrap'}
    >
      {hydrated &&
        collections[collectionIndex]?.conceptsSelected.map(
          (concept: OerConceptInfo, index: number) => (
            <ConceptButton
              item={concept.label}
              key={index}
              index={index}
              setConceptSelectedIndex={setConceptSelectedIndex}
              isSelected={conceptSelectedIndex === index}
            />
          )
        )}
    </Flex>
  );
}
