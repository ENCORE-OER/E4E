import { Icon, IconProps } from '@chakra-ui/react';
import { FaPersonChalkboard } from 'react-icons/fa6';

export default function IconFrontalLecture({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={FaPersonChalkboard}
      fontSize={'x-large'}
    //   fontWeight={'bold'}
    />
  );
}
