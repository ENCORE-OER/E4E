import { Icon, IconProps } from '@chakra-ui/react';
import { GiRoundTable } from 'react-icons/gi';

export default function IconDiagram({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={GiRoundTable}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
