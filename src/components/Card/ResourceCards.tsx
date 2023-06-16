import { Box, VStack } from '@chakra-ui/react';
import SingleResourceCard from './SingleResourceCard';

type ResourceCardsProps = {
  oers: any[];
};

export default function ResourceCards({ oers }: ResourceCardsProps) {
  return (
    <>
      <Box>
        <VStack spacing={4}>
          {oers?.map((resource: any) => (
            <SingleResourceCard key={resource.idOer} {...resource} />
          ))}
        </VStack>
      </Box>
    </>
  );
}
