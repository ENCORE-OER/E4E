import { Icon, IconProps } from '@chakra-ui/react';
import { RiDraggable } from 'react-icons/ri';

// interface IconDeleteProps extends IconProps {

// }

export default function IconDrag({ ...rest }: IconProps) {
  return <Icon {...rest} as={RiDraggable} fontSize="x-large" />;
}
