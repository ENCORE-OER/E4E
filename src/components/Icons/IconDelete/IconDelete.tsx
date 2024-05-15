import { Icon, IconProps } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

// interface IconDeleteProps extends IconProps {

// }

export default function IconDelete({ ...rest }: IconProps) {
  return <Icon {...rest} as={MdDelete} fontSize="x-large" />;
}
