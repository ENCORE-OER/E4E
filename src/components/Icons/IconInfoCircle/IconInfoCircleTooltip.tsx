import { Flex, Tooltip } from '@chakra-ui/react';
// import { IconInfoCircle } from '../../../public/Icons/svgToIcons/iconInfoCircle';
import IconInfoCircle from './IconInfoCircle';

interface IconInfoCircleProps {
  label_tooltip: string;
}

export default function IconInfoCircleTooltip({
  label_tooltip,
}: IconInfoCircleProps) {
  return (
    <Tooltip
      hasArrow
      placement="top"
      label={label_tooltip}
      aria-label={label_tooltip}
      //ml="1px"
      bg="white"
      color="primary"
      p={2}
      fontSize={'sm'}
      borderRadius={5}
    >
      {/* <Image src={icon_infocircle} alt="infocircle" /> */}
      <Flex>
        <IconInfoCircle /> {/* light grey */}
      </Flex>
    </Tooltip>
  );
}
