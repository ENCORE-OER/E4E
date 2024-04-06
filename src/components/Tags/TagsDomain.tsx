import { HStack, Tag, Text } from '@chakra-ui/react';
import TagGenAI from './TagGenAI';

type TagsDomainProps = {
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  showTagGenAI: boolean;
  mb?: string | number;
};

export default function TagsDomain({
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  showTagGenAI,
  mb,
}: TagsDomainProps) {
  return (
    <HStack w="100%" mb={mb} justifyContent='flex-start'>
      {showTagDigital && (
        <Tag bg="digital_light.200" borderRadius="3">
          <Text variant="label_tag_digital">Digital</Text>
        </Tag>
      )}
      {showTagEntrepreneurial && (
        <Tag bg="entrepreneurial_light.200" borderRadius="3">
          <Text variant="label_tag_entrepreneurial">Entrepreneurial</Text>
        </Tag>
      )}
      {showTagGreen && (
        <Tag bg="green_light.200" borderRadius="3">
          <Text variant="label_tag_green">Green</Text>
        </Tag>
      )}
      {showTagGenAI && <TagGenAI />}

    </HStack>
  );
}
