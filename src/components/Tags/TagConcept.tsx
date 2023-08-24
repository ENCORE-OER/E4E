import { Tag, TagLabel } from '@chakra-ui/react';

type TagConceptProps = {
  concepts: string[];
};

export default function TagConcept({ concepts }: TagConceptProps) {
  return (
    <>
      {concepts &&
        concepts?.map((label: string, id: number) => (
          <Tag key={id} bg={'gray.100'}>
            <TagLabel display="flex">{label}</TagLabel>
          </Tag>
        ))}
    </>
  );
}
