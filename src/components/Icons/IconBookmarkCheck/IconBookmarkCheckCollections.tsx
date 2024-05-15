import { Flex, Tooltip } from '@chakra-ui/react';
import { IconBookmarkCheck } from '../../../public/Icons/svgToIcons/iconBookmarkCheck';

type IconBookmarkCheckProps = {
  collectionName: string | undefined;
  collectionColor: string | undefined;
};

export default function IconBookmarkCheckCollections({
  collectionColor,
  collectionName,
}: IconBookmarkCheckProps) {
  return (
    <Tooltip
      aria-label={collectionName}
      label={collectionName}
      hasArrow
      placement="bottom"
      bg="gray.100"
      color="primary"
      fontSize={'md'}
      p={2}
    >
      {/* Without <Flex> the tooltip doesn't work with react-icons */}
      <Flex>
        <IconBookmarkCheck
          //key={index}
          colorBookMark={collectionColor}
          size="25px"
        />
      </Flex>
    </Tooltip>
  );
}
