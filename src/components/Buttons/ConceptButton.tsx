import { Button, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type ConceptButtonsProps = {
  index: number;
  item: string;
  isSelected: boolean;
  setConceptSelectedIndex: Dispatch<SetStateAction<number>>;
};

export default function ConceptButton({
  setConceptSelectedIndex,
  isSelected,
  item,
  index,
}: ConceptButtonsProps) {
  return (
    <Button
      key={index}
      variant="concept"
      bg={isSelected ? 'accent.900' : 'white'}
      borderColor={isSelected ? 'accent.900' : 'secondary'}
      _hover={{ borderColor: 'accent.900' }}
      onClick={(e: any) => {
        e.preventDefault();
        if (!isSelected) {
          setConceptSelectedIndex(index);
        } else {
          setConceptSelectedIndex(-1);
        }
      }}
    >
      <Text fontSize="15px" fontWeight="semibold">
        {item}
      </Text>
    </Button>
  );
}
