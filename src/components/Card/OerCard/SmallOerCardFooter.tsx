import { Box, CardFooter, Flex } from '@chakra-ui/react';
import GridMetadataOer from '../../Grids/GridMetadataOer';
import TagResourceType from '../../Tags/TagReourceType';

type SmallOerCardFooterProps = {
  resourceType: string[];
  lastUpdate: string;
  used: number;
  likes: number;
  qualityScore: number;
  gapGrid?: number;
};

export default function SmallOerCardFooter({
  resourceType,
  lastUpdate,
  used,
  likes,
  gapGrid,
  qualityScore,
}: SmallOerCardFooterProps) {
  return (
    <CardFooter pt="0">
      <Box w="100%">
        <GridMetadataOer
          gap={gapGrid || 3}
          lastUpdate={lastUpdate}
          used={used}
          likes={likes}
          qualityScore={qualityScore}
          isCardInfoModal={false}
        />

        <Flex>
          <TagResourceType maxTags={2} resourceType={resourceType} />
        </Flex>
      </Box>
    </CardFooter>
  );
}
