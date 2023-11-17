import { Box, Flex, Text } from '@chakra-ui/react';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';

type GridMetadataCardProps = {
  gap: number;
  lastUpdate: string;
  used: number;
  liked: number;
  qualityScore: number;
};

export default function GridMetadataCard({
  gap,
  lastUpdate,
  used,
  liked,
  qualityScore,
}: GridMetadataCardProps) {
  return (
    <Flex w="100%" justifyContent="flex-end" gap={gap} position="sticky">
      <Box display="flex" gap={1}>
        <IconCalendarCheck />
        <Text variant="label_dinamic_data_card">{lastUpdate || 'unknown'}</Text>
      </Box>
      <Box display="flex" gap={1}>
        <IconBezierCurve />
        <Text variant="label_dinamic_data_card">{used || 0}</Text>
      </Box>
      <Box display="flex" gap={1}>
        <IconThumbsUp />
        <Text variant="label_dinamic_data_card">{liked || 0}</Text>
      </Box>
      <Box display="flex" gap={1}>
        <IconMedal />
        <Text variant="label_dinamic_data_card">{qualityScore || 0}</Text>
      </Box>
    </Flex>
  );
}
