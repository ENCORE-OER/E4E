import { HStack, Tag, Text } from '@chakra-ui/react';

type TagsDomainProps = {
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  mb?: any;
};

export default function TagsDomain({
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  mb,
}: TagsDomainProps) {
  return (
    <>
      <HStack w="100%" mb={mb}>
        <div>
          {showTagDigital && (
            <Tag bg="digital_light.200" borderRadius="3">
              <Text variant="label_tag_digital">Digital</Text>
            </Tag>
          )}
        </div>
        <div>
          {showTagEntrepreneurial && (
            <Tag bg="entrepreneurial_light.200" borderRadius="3">
              <Text variant="label_tag_entrepreneurial">Entrepreneurial</Text>
            </Tag>
          )}
        </div>
        <div>
          {showTagGreen && (
            <Tag bg="green_light.200" borderRadius="3">
              <Text variant="label_tag_green">Green</Text>
            </Tag>
          )}
        </div>
      </HStack>
    </>
  );
}
