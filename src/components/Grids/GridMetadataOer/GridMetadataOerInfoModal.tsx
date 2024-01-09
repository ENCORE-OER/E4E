import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { IconBezierCurve } from '../../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../../public/Icons/svgToIcons/iconThumbsUp';

import { transparentize } from 'polished';

type GridMetadataCardProps = {
  gap: number;
  lastUpdate: string;
  used: number;
  likes: number;
  qualityScore: number;
  // setLikeOER: () => Promise<void>;
  // reduceLikeOER: () => Promise<void>;
  // getLikes: () => Promise<number>;
  toggleLikeOER?: () => Promise<void>;
  setUpdateLikeOER?: React.Dispatch<React.SetStateAction<boolean>>;
  isOERSaved?: boolean;
  isOERLiked?: boolean;
};

export default function GridMetadataOerInfoModal({
  gap,
  lastUpdate,
  used,
  likes,
  qualityScore,
  // setLikeOER,
  // reduceLikeOER,
  // getLikes,
  toggleLikeOER,
  setUpdateLikeOER,
  isOERSaved,
  isOERLiked,
}: GridMetadataCardProps) {
  //const [isLiked, setIsLiked] = useState(false);

  // TODO: create a context to save the like on the browser cache to know if a user has liked an OER. This because we have not a login system yet.

  // useEffect(() => {
  //   // const checkIfLiked = async () => {
  //   //   const likes = await getLikes();
  //   //   setIsLiked(likes > 0);
  //   // }

  //   // checkIfLiked();

  //   if (likes > 0) {
  //     setIsLiked(true);
  //   }

  // }, [])

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
          <HStack
            cursor={isOERSaved ? 'pointer' : ''}
            onClick={async () => {
              if (isOERSaved && toggleLikeOER && setUpdateLikeOER) {
                await toggleLikeOER();
                setUpdateLikeOER(true);
              }
            }}
          >
            {isOERLiked && (
              <IconThumbsUp
                fill={transparentize(0.8, '#FFCC49')}
                stroke="#FFCC49"
              />
            )}
            {!isOERLiked && <IconThumbsUp />}
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
