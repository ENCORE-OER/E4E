import { CardBody, Flex, Text } from '@chakra-ui/react';

type OerCardBodyProps = {
  pyCardBody?: string;
  noOfLinesText?: number;
  description: string;
};

export default function OerCardBody({
  pyCardBody,
  description,
  noOfLinesText,
}: OerCardBodyProps) {
  return (
    <CardBody py={pyCardBody || '1.5'} minH="55px">
      <Flex justifyContent="flex-start">
        <Text noOfLines={noOfLinesText || 2} variant="description_card">
          {description}
        </Text>
      </Flex>
    </CardBody>
  );
}
