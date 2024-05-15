import { CheckIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import IconEdit from '../../Icons/IconEdit/IconEdit';
import UnderlinedButton from './UnderlinedButton';

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
      <UnderlinedButton
        handleClick={handleEditClick}
        isSmallerScreen={isSmallerScreen}
        nameButton={isSmallerScreen ? '' : isEditClicked ? 'Confirm' : 'Edit'}
        rightIcon={isEditClicked ? <CheckIcon /> : <IconEdit />}
      />
    </Tooltip>
  );
}
