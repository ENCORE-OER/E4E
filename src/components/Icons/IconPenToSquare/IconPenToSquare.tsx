import { Icon, IconProps } from '@chakra-ui/react';
import { FaPenToSquare } from 'react-icons/fa6';

export default function IconPenToSquare({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={FaPenToSquare}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
