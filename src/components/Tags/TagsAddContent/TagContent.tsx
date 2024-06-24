import { Tag, TagLabel, Tooltip } from '@chakra-ui/react';

type TagContentProps = {
  label: string;
  bg: string;
  handleClick?: () => void;
};

export default function TagContent({ label, bg, handleClick }: TagContentProps) {
  return (
    <Tag
      // colorScheme='#FFCC49'
      bg={bg}
      // border="1px solid lightgrey"
      w="fit-content"
      gap={1}
      borderRadius={5}
      onClick={(e) => {
        e.preventDefault();
        if (handleClick)
          handleClick();
      }}
      cursor={handleClick ? 'pointer' : 'default'}
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
