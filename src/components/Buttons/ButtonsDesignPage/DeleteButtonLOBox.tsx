import { Button, Text, Tooltip } from '@chakra-ui/react';
import IconDelete from '../../Icons/IconDelete/IconDelete';

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
      <Button
        //bg={isEditClicked ? 'accent.200' : 'secondary'}
        variant="link"
        color="red.700"
        //px="30px"
        display="flex"
        // borderRadius={isSmallerScreen ? 'xl' : undefined}
        border={'none'}
        onClick={handleDeleteClick}
        rightIcon={<IconDelete />}
        // _hover={{ bg: undefined }}
        px={isSmallerScreen ? 0 : undefined}
        // _hover={isSmallerScreen ? { bg: 'accent.900' } : undefined}
        w="fit-content"
      >
        <Text textDecoration="underline">
          {isSmallerScreen ? '' : 'Delete'}
        </Text>
      </Button>
    </Tooltip>
  );
}
