import { Box, CardFooter, Flex } from '@chakra-ui/react';
import GridMetadataCard from '../../Grids/GridMetadataCard';
import TagResourceType from '../../Tags/TagReourceType';

type SmallOerCardFooterProps = {
  resourceType: string[];
  lastUpdate: string;
  used: number;
  liked: number;
  qualityScore: number;
  gapGrid?: number;
};

export default function SmallOerCardFooter({
  resourceType,
  lastUpdate,
  used,
  liked,
  gapGrid,
  qualityScore,
}: SmallOerCardFooterProps) {
  return (
    <CardFooter pt="0">
      <Box w="100%">
        <GridMetadataCard
          gap={gapGrid || 3}
          lastUpdate={lastUpdate}
          used={used}
          liked={liked}
          qualityScore={qualityScore}
        />

        <Flex>
          <TagResourceType resourceType={resourceType} />
        </Flex>
      </Box>
    </CardFooter>
  );
}
