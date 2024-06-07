import { Icon, IconProps } from '@chakra-ui/react';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';

export default function IconAnalytics({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={TbDeviceDesktopAnalytics}
      fontSize={'x-large'}
      // fontWeight={'bold'}
    />
  );
}
