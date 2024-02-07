import { Box, CardFooter, Flex } from '@chakra-ui/react';
import GridMetadataCard from '../../Grids/GridMetadataOer/GridMetadataCard';
import TagResourceType from '../../Tags/TagReourceType';

type OerCardFooterProps = {
  resourceType: string[];
  lastUpdate: string;
  used: number;
  liked: number;
  gapGrid?: number;
  qualityScore: number;
  maxResTypeTags?: number;
};

export default function OerCardFooter({
  resourceType,
  lastUpdate,
  used,
  liked,
  gapGrid,
  qualityScore,
  maxResTypeTags,
}: OerCardFooterProps) {
  return (
    <CardFooter pt="0">
      <Box w="100%">
        <GridMetadataCard
          gap={gapGrid || 3}
          lastUpdate={lastUpdate}
          used={used}
          likes={liked}
          qualityScore={qualityScore}
        />

        <Flex gap={0.5}>
          <TagResourceType
            resourceType={resourceType}
            maxTags={maxResTypeTags || 2}
          />
        </Flex>
      </Box>
    </CardFooter>
  );

  {
    /*<CardFooter pt="0">
      <Flex justifyContent="flex-start" flexWrap={'nowrap'} w="50%">
        <TagResourceType resourceType={resourceType} />
      </Flex>
      <Flex w="50%">
        <GridMetadataCard
          gap={gapGrid || 3}
          lastUpdate={lastUpdate}
          used={used}
          liked={liked}
          qualityScore={qualityScore}
        />
      </Flex>
  </CardFooter>*/
  }
}
