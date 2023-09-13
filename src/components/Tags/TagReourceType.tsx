import { Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { IconVideo } from '../../public/Icons/svgToIcons/iconVideo';

type TagResourceTypeProps = {
  resourceType: string[];
  maxTags?: number;
};

export default function TagResourceType({
  resourceType,
  maxTags,
}: TagResourceTypeProps) {
  return (
    <>
      {resourceType &&
        resourceType.slice(0, maxTags ? maxTags : resourceType.length)
          .map((name: string, id: number) => (
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
              <Text variant="label_tag_resType">
                {name}
              </Text>
            </Tag>
          ))}
    </>
  );
}
