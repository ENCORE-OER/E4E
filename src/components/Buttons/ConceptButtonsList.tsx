import { Flex } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import ConceptButton from './ConceptButton';

type ConceptButtonsListProps = {
  concepts: string[];
  conceptSelectedIndex: number;
  setConceptSelectedIndex: Dispatch<SetStateAction<number>>;
};

export default function ConceptButtonsList({
  concepts,
  setConceptSelectedIndex,
  conceptSelectedIndex,
}: ConceptButtonsListProps) {
  return (
    <Flex gap={5} pb="5">
      {concepts?.map((item: string, index: number) => (
        <ConceptButton
          item={item}
          key={index}
          index={index}
          setConceptSelectedIndex={setConceptSelectedIndex}
          isSelected={conceptSelectedIndex === index}
        />
      ))}
    </Flex>
  );
}
