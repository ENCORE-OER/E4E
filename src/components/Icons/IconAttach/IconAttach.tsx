import { Icon, IconProps } from '@chakra-ui/react';
import { MdNoteAdd } from 'react-icons/md';

export default function IconAttach({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={MdNoteAdd}
      fontSize={'x-large'}
      //   fontWeight={'bold'}
    />
  );
}
