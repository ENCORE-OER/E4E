import { Icon, IconProps } from '@chakra-ui/react';
import { FaDisplay } from 'react-icons/fa6';

export default function IconDisplay({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={FaDisplay}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
