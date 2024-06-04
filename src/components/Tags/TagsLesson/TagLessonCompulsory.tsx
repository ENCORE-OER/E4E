import { Checkbox, Tag, TagLabel, TagProps } from '@chakra-ui/react';

type TagLessonTypeProps = {
  isChecked: boolean;
  isDisabled?: boolean;
} & TagProps;

export default function TagLessonCompulsory({
  isChecked,
  isDisabled,
  ...rest
}: TagLessonTypeProps) {
  return (
    <Tag bg={'none'} border="none" w="fit-content" gap={1} {...rest}>
      <Checkbox
        isChecked={isChecked}
        isDisabled={isDisabled}
        colorScheme="yellow"
        fontSize="x-large"
      />
      <TagLabel display="flex" w="fit-content">
        Compulsory
      </TagLabel>
    </Tag>
  );
}
