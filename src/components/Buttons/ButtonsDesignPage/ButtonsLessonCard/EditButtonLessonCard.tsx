import IconEdit from '../../../Icons/IconEdit/IconEdit';
import UnderlinedButton from '../UnderlinedButtons/UnderlinedButton';

type EditButtonLessonCardProps = {
  isEditClicked: boolean;
  handleEditClick: () => void;
  isSmallerScreen?: boolean | undefined;
  isDisabled?: boolean;
};

export default function EditButtonLessonCard({
  isEditClicked,
  handleEditClick,
  isSmallerScreen,
  isDisabled,
}: EditButtonLessonCardProps) {
  return (
    <UnderlinedButton
      handleClick={handleEditClick}
      isSmallerScreen={isSmallerScreen}
      nameButton={isSmallerScreen ? '' : 'Edit'}
      rightIcon={<IconEdit color="grey" />}
      color="grey"
      fontWeight="normal"
      isDisabled={isDisabled || isEditClicked}
    />
  );
}
