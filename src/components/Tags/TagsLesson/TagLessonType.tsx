import { Tag, TagLabel } from '@chakra-ui/react';

type TagLessonTypeProps = {
  labelTag: string;
};

export default function TagLessonType({ labelTag }: TagLessonTypeProps) {
  return (
    <Tag bg={'blue.100'} borderRadius="8px" w="fit-content" px={3}>
      {/* <Text variant="label_tag_genAI">{labelTag}</Text> */}
      <TagLabel display="flex" w="fit-content">
        {labelTag}
      </TagLabel>
    </Tag>
  );
}
