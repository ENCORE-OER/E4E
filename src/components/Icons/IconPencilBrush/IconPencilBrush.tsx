import { Icon, IconProps } from '@chakra-ui/react';
import { GiPencilBrush } from 'react-icons/gi';

export default function IconPencilBrush({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={GiPencilBrush}
      fontSize={'x-large'}
      // fontWeight={'bold'}
    />
  );
}
