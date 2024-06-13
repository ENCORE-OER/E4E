import { Button, Flex, Icon, Tag, TagLabel, Tooltip } from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { OerInCollectionProps } from '../../../types/encoreElements';

export type TagSelectedResourceProps = {
  label: string;
  IconTag: React.ElementType;
  oer?: OerInCollectionProps;
};

export default function TagSelectedResource({
  label,
  IconTag,
  oer,
}: TagSelectedResourceProps) {
  const { removeSelectedResourceAddContent: removeSelectedResource } =
    useLearningPathDesignContext();

  const handleClick = () => {
    if (oer) {
      removeSelectedResource(oer);
    }
  };

  return (
    <Tag
      bg="white"
      border="1px solid lightgrey"
      w="fit-content"
      gap={1}
      borderRadius={20}
    >
      {/* <Text variant="label_tag_genAI">{labelTag}</Text> */}
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
        <Flex direction="row" align="center">
          <Icon as={IconTag} />
          <TagLabel w="fit-content" maxW="100px" noOfLines={1}>
            {label}
          </TagLabel>
          <Button size={'sm'} p={0} variant="ghost" onClick={handleClick}>
            <MdOutlineCancel fontSize={'x-large'} color="grey" />
          </Button>
        </Flex>
      </Tooltip>
    </Tag>
  );
}
