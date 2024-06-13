import { Tag, TagLabel, Tooltip } from '@chakra-ui/react';

type TagContentProps = {
  label: string;
};

export default function TagContent({ label }: TagContentProps) {
  return (
    <Tag
      // colorScheme='#FFCC49'
      bg="#FFCC49"
      // border="1px solid lightgrey"
      w="fit-content"
      gap={1}
      borderRadius={5}
    >
      <Tooltip
        hasArrow
        placement="top"
        label={label}
        aria-label={label}
        //ml="1px"
        bg="white"
        color="primary"
        p={2}
        fontSize={'sm'}
        borderRadius={5}
        cursor="pointer"
      >
        <TagLabel w="fit-content" maxW="100px" noOfLines={1}>
          {label}
        </TagLabel>
      </Tooltip>
    </Tag>
  );
}
