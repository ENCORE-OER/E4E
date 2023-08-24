import { Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { IconVideo } from '../../public/Icons/svgToIcons/iconVideo';

type TagResourceTypeProps = {
  resourceType: string[];
};

export default function TagResourceType({
  resourceType,
}: TagResourceTypeProps) {
  return (
    <>
      {resourceType &&
        resourceType.map((name: string, id: number) => (
          <Tag
            key={id}
            gap={1}
            borderRadius="200px"
            px="10px"
            py="2px"
            bg="white"
            borderColor="secondary"
            border="1px"
            display="flex"
          >
            <TagLeftIcon as={IconVideo} />
            <Text variant="label_tag_resType" noOfLines={1}>
              {name}
            </Text>
          </Tag>
        ))}
    </>
  );
}
