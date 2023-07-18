import { HStack, Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { IconVideo } from '../../public/Icons/svgToIcons/iconVideo';

type TagResourceTypeProps = {
  resourceType: string[];
};

export default function TagResourceType({
  resourceType,
}: TagResourceTypeProps) {
  return (
    <>
      <HStack noOfLines={1} gap={0.5} w="100%">
        {resourceType &&
          resourceType.map((item: any, id: number) => (
            <Tag
              gap={1}
              borderRadius="200px"
              px="10px"
              py="2px"
              bg="white"
              borderColor="secondary"
              border="1px"
              key={id}
            >
              <TagLeftIcon as={IconVideo} />
              <Text variant="label_tag_resType" noOfLines={1}>
                {item}
              </Text>
            </Tag>
          ))}
      </HStack>
    </>
  );
}
