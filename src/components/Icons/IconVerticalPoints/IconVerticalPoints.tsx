import { Icon, IconProps } from '@chakra-ui/react';
import { FaEllipsisVertical } from 'react-icons/fa6';

interface IconVerticalPointsProps extends IconProps {
  handleClick?: () => void;
}

export default function IconVerticalPoints({
  handleClick,
}: IconVerticalPointsProps) {
  return (
    <Icon
      as={FaEllipsisVertical}
      onClick={() => (handleClick ? handleClick() : null)}
      fontWeight="bold"
      fontSize="large"
    ></Icon>
  );
}
