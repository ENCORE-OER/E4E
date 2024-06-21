import { Icon, IconProps } from '@chakra-ui/react';
import { IoDocumentTextSharp } from 'react-icons/io5';

export default function IconDocument({ fontSize, ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={IoDocumentTextSharp}
      fontSize={fontSize || 'x-large'}
    // fontWeight={'bold'}
    />
  );
}
