import { Flex, FlexProps, Text } from '@chakra-ui/react';
import IconInfoCircle from '../Icons/IconInfoCircle/IconInfoCircle';

type InfoTextBoxProps = {
  textInfo: string;
  isSmallerScreen?: boolean;
} & FlexProps;

export default function InfoTextBox({
  textInfo,
  isSmallerScreen,
  ...rest
}: InfoTextBoxProps) {
  return (
    <Flex w={isSmallerScreen ? '100%' : '65%'} align="center" gap={3} {...rest}>
      <IconInfoCircle fontSize={'x-large'} />
      <Text fontSize="small">{textInfo}</Text>
    </Flex>
  );
}
