import { Icon, IconProps } from '@chakra-ui/react';
import { BsStars } from 'react-icons/bs';

export default function IconGenerateAI({ ...rest }: IconProps) {
  return (
    <Icon {...rest} as={BsStars} fontSize={'x-large'} fontWeight={'bold'} />
  );
}
