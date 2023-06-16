import { Box, Flex, Text } from '@chakra-ui/react';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';

type DinamicDataProps = {
  lastUpdate: string;
};

export default function DinamicData({ lastUpdate }: DinamicDataProps) {
  return (
    <>
      <Flex w="100%" justifyContent="right" gap={3}>
        <Box display="flex" gap={1}>
          <IconCalendarCheck />
          <Text variant="label_dinamic_data_card">{lastUpdate}</Text>
        </Box>
        <Box display="flex" gap={1}>
          <IconBezierCurve />
          <Text variant="label_dinamic_data_card">2</Text>
        </Box>
        <Box display="flex" gap={1}>
          <IconThumbsUp />
          <Text variant="label_dinamic_data_card">54</Text>
        </Box>
        <Box display="flex" gap={1}>
          <IconMedal />
          <Text variant="label_dinamic_data_card">9</Text>
        </Box>
      </Flex>
    </>
  );
}
