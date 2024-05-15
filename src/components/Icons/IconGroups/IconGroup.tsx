import { Icon, IconProps } from '@chakra-ui/react';
import { MdGroups } from 'react-icons/md';

export default function IconGroup({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={MdGroups}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
