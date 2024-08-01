import { Tag, Text } from '@chakra-ui/react';

export default function TagGenAI() {
  return (
    <Tag
      borderRadius="5"
      borderStyle="solid"
      border="2px"
      borderColor={'genAI_dark'}
      px="1"
      py="0"
      bg="white"
      size="sm"
    >
      <Text variant="label_tag_genAI" p="0">
        GenAI
      </Text>
    </Tag>
  );
}
