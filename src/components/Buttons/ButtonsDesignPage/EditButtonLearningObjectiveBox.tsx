import { CheckIcon } from '@chakra-ui/icons';
import { Button, Tooltip } from '@chakra-ui/react';
import IconEdit from '../../Icons/IconEdit/IconEdit';

type EditButtonLearningObjectiveBoxProps = {
  isEditClicked: boolean;
  handleEditClick: () => void;
  isSmallerScreen: boolean | undefined;
  label_tooltip?: string;
};

export default function EditButtonLearningObjectiveBox({
  isEditClicked,
  handleEditClick,
  isSmallerScreen,
  label_tooltip,
}: EditButtonLearningObjectiveBoxProps) {
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
        bg={'secondary'}
        color="primary"
        //px="30px"
        display="flex"
        borderRadius={'xl'}
        onClick={handleEditClick}
        px={isSmallerScreen ? 0 : undefined}
        rightIcon={isEditClicked ? <CheckIcon /> : <IconEdit />}
        w="fit-content"
      >
        {isSmallerScreen ? '' : isEditClicked ? 'Confirm' : 'Edit'}
      </Button>
    </Tooltip>
  );
}
