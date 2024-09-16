import { Icon, IconProps } from '@chakra-ui/react';
import { FaPhotoVideo } from 'react-icons/fa';

export default function IconVideo({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={FaPhotoVideo}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
