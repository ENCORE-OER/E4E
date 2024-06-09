import { Icon, IconProps } from '@chakra-ui/react';
import { IoDocumentTextSharp } from 'react-icons/io5';

export default function IconDocument({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={IoDocumentTextSharp}
      fontSize={'x-large'}
      // fontWeight={'bold'}
    />
  );
}
