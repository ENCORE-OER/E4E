import { Icon, IconProps } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';

export default function IconPlus({ ...rest }: IconProps) {
  return (
    <Icon {...rest} as={FaPlus} fontSize={'x-large'} fontWeight={'bold'} />
  );
}
