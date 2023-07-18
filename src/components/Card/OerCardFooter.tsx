import { CardFooter, Flex } from '@chakra-ui/react';
import GridMetadataCard from '../Grids/GridMetadataCard';
import TagResourceType from '../Tags/TagReourceType';

type OerCardFooterProps = {
  resourceType: string[];
  lastUpdate: string;
  used: number;
  liked: number;
  gapGrid?: number;
};

export default function OerCardFooter({
  resourceType,
  lastUpdate,
  used,
  liked,
  gapGrid,
}: OerCardFooterProps) {
  return (
    <CardFooter pt="0">
      <Flex justifyContent="flex-start">
        <TagResourceType resourceType={resourceType} />
      </Flex>
      <GridMetadataCard
        gap={gapGrid || 3}
        lastUpdate={lastUpdate}
        used={used}
        liked={liked}
      />
    </CardFooter>
  );
}
