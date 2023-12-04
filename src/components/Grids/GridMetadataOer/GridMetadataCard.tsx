import { Box, Flex, Text } from '@chakra-ui/react';
import { IconBezierCurve } from '../../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../../public/Icons/svgToIcons/iconThumbsUp';

type GridMetadataCardProps = {
  gap: number;
  lastUpdate: string;
  used: number;
  likes: number;
  qualityScore: number;
};

export default function GridMetadataCard({
  gap,
  lastUpdate,
  used,
  likes,
  qualityScore,
}: GridMetadataCardProps) {
  return (
    <Flex w="100%" justifyContent="flex-end" gap={gap} position="sticky">
      <Box display="flex" gap={1}>
        <IconCalendarCheck />
        <Text variant="label_dinamic_data_card">{lastUpdate}</Text>
      </Box>
      <Box display="flex" gap={1}>
        <IconBezierCurve />
        <Text variant="label_dinamic_data_card">{used}</Text>
      </Box>
      <Box display="flex" gap={1}>
        <IconThumbsUp />
        <Text variant="label_dinamic_data_card">{likes}</Text>
      </Box>
      <Box display="flex" gap={1}>
        <IconMedal />
        <Text variant="label_dinamic_data_card">{qualityScore}</Text>
      </Box>
    </Flex>
  );
}
