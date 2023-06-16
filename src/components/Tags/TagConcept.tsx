import { Tag, TagLabel } from '@chakra-ui/react';

type TagConceptProps = {
  concepts: any[];
};

export default function TagConcept({ concepts }: TagConceptProps) {
  return (
    <>
      {concepts &&
        concepts?.map((item: any, id: number) => (
          <Tag key={id} gap={1} bg={'gray.100'}>
            <TagLabel display="flex">{item}</TagLabel>
          </Tag>
        ))}
    </>
  );
}
