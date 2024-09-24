import { Icon, IconProps } from '@chakra-ui/react';
import { FaListUl } from 'react-icons/fa';

export default function IconList({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={FaListUl}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
