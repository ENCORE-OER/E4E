import { Tooltip } from '@chakra-ui/react';
import IconDelete from '../../../Icons/IconDelete/IconDelete';
import UnderlinedButton from './UnderlinedButton';

type DeleteButtonLOBoxProps = {
  handleDeleteClick: () => void;
  isSmallerScreen: boolean | undefined;
  label_tooltip?: string;
};

export default function DeleteButtonLOBox({
  handleDeleteClick,
  isSmallerScreen,
  label_tooltip,
}: DeleteButtonLOBoxProps) {
  return (
    <Tooltip
      hasArrow
      placement="top"
      label={isSmallerScreen ? label_tooltip : undefined}
      aria-label={label_tooltip}
      //ml="1px"
      bg="white"
      color="primary"
      p={2}
      fontSize={'sm'}
      borderRadius={5}
    >
      <UnderlinedButton
        handleClick={handleDeleteClick}
        nameButton={isSmallerScreen ? '' : 'Delete'}
        rightIcon={<IconDelete />}
        isSmallerScreen={isSmallerScreen}
        color="red.700"
      />
    </Tooltip>
  );
}
