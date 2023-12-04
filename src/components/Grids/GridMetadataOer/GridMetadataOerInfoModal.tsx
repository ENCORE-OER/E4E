import { Box, Flex, HStack, Text } from '@chakra-ui/react';
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

export default function GridMetadataOerInfoModal({
    gap,
    lastUpdate,
    used,
    likes,
    qualityScore,
}: GridMetadataCardProps) {
    return (
        <Flex w="100%" mb="5" gap={gap || 0}>
            <Box flex="1" display="flex">
                <Box>
                    <Text variant="label_drawer">Last Update</Text>
                    <HStack>
                        <IconCalendarCheck />
                        <Text>{lastUpdate}</Text>
                    </HStack>
                </Box>
            </Box>
            <Box display="flex" flex="1">
                <Box>
                    <Text variant="label_drawer">Used</Text>
                    <HStack>
                        <IconBezierCurve />
                        <Text>{used}</Text>
                    </HStack>
                </Box>
            </Box>
            <Box display="flex" flex="1">
                <Box>
                    <Text variant="label_drawer">Liked</Text>
                    <HStack>
                        <IconThumbsUp />
                        <Text>{likes}</Text>
                    </HStack>
                </Box>
            </Box>
            <Box display="flex" flex="1">
                <Box>
                    <Text variant="label_drawer">Quality Score</Text>
                    <HStack>
                        <IconMedal />
                        <Text>{qualityScore}</Text>
                    </HStack>
                </Box>
            </Box>
        </Flex>
    );
}
