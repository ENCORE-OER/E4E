import { Icon, IconProps } from '@chakra-ui/react';
import { BsDiagram3Fill } from 'react-icons/bs';

export default function IconDiagram({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={BsDiagram3Fill}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
