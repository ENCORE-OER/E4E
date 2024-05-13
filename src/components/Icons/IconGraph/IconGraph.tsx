import { Icon, IconProps } from '@chakra-ui/react';
import { SlGraph } from 'react-icons/sl';

export default function IconGraph({ ...rest }: IconProps) {
  return (
    <Icon {...rest} as={SlGraph} fontSize={'x-large'} fontWeight={'bold'} />
  );
}
