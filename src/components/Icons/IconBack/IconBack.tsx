import { Icon, IconProps } from '@chakra-ui/react';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function IconBack({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={IoArrowBackOutline}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
