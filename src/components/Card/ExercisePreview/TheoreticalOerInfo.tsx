import {
  Box,
  Card,
  CardBody,
  //CardHeader,
  Heading,
  Stack,
  //StackDivider,
  Text,
} from '@chakra-ui/react';
import { OerProps } from '../../../types/encoreElements';

type TheoreticalOerInfoProps = {
  oerData: OerProps;
};

export default function TheoreticalOerInfo({
  oerData,
}: TheoreticalOerInfoProps) {
  return (
    <>
      <Card variant="outline">
        <CardBody>
          <Stack spacing="6">
            <Box>
              <Heading size="sm">Title</Heading>
              <Text pt="2" fontSize="sm">
                {oerData.title}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">Description</Heading>
              <Text pt="2" fontSize="sm">
                {oerData.description}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">Source</Heading>
              <Text pt="2" fontSize="sm">
                {oerData.oer_url[0]?.url}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
