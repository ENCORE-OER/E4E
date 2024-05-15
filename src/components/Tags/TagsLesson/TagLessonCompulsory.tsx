import { Checkbox, Tag, TagLabel } from '@chakra-ui/react';

type TagLessonTypeProps = {
  isChecked: boolean;
};

export default function TagLessonCompulsory({ isChecked }: TagLessonTypeProps) {
  return (
    <Tag bg={'none'} border="none" w="fit-content" gap={1}>
      <Checkbox isChecked={isChecked} colorScheme="yellow" fontSize="x-large" />
      <TagLabel display="flex" w="fit-content">
        Compulsory
      </TagLabel>
    </Tag>
  );
}
