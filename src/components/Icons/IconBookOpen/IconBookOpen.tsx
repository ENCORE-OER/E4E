import { Icon, IconProps } from '@chakra-ui/react';
import { PiBookOpenTextBold } from 'react-icons/pi';

export default function IconBookOpen({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={PiBookOpenTextBold}
      fontSize={'x-large'}
    //   fontWeight={'bold'}
    />
  );
}
