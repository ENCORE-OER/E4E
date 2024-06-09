import { Icon, IconProps } from '@chakra-ui/react';
import { BsFileEarmarkSpreadsheetFill } from 'react-icons/bs';

export default function IconSpreadsheet({ ...rest }: IconProps) {
  return (
    <Icon
      {...rest}
      as={BsFileEarmarkSpreadsheetFill}
      fontSize={'x-large'}
      // fontWeight={'bold'}
    />
  );
}
