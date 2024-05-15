import { Icon, IconProps } from '@chakra-ui/react';
import { PiExport } from 'react-icons/pi';

export default function IconExport({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={PiExport}
      fontSize={'x-large'}
      fontWeight={'bold'}
      transform="rotate(90deg)"
    />
  );
}
