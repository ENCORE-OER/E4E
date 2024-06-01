import { Icon, IconProps } from '@chakra-ui/react';
import { FaArrowRotateLeft } from 'react-icons/fa6';

// interface IconRegenerateProps extends IconProps {

// }

export default function IconRegenerate({ ...rest }: IconProps) {
  return <Icon {...rest} as={FaArrowRotateLeft} fontSize="x-large" />;
}
