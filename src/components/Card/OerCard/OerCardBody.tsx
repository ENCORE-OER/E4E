import { Box, CardBody, Flex, Text } from '@chakra-ui/react';

type OerCardBodyProps = {
  pyCardBody?: string;
  noOfLinesText?: number;
  description: string;
  minHCardBody?: string;
};

export default function OerCardBody({
  pyCardBody,
  description,
  noOfLinesText,
  minHCardBody,
}: OerCardBodyProps) {

  // const isScreenSmaller = useIsSmallerScreen();

  return (
    <CardBody py={pyCardBody || '1.5'} minH={minHCardBody || '0px'} display="flex" flexDirection={"column"} overflow="hidden" flex="1" w="100%">
      <Flex justifyContent="flex-start" w="100%">
        <Text noOfLines={noOfLinesText || 2} variant="description_card">
          {`${description}`}
        </Text>
      </Flex>
      {/* Add an object to fill the entire row to have the cards of the same dimensions */}
      {/* {!isScreenSmaller && */}
      <Box visibility="hidden" whiteSpace="nowrap">
        {description.padEnd(100, 'X')}
      </Box>
    </CardBody>
  );
}
