import { Button } from '@chakra-ui/react';

type EditButtonLearningObjectiveBoxProps = {
  isEditClicked: boolean;
  handleEditClick: () => void;
};

export default function EditButtonLearningObjectiveBox({
  isEditClicked,
  handleEditClick,
}: EditButtonLearningObjectiveBoxProps) {
  return (
    <Button
      bg={isEditClicked ? 'accent.200' : 'secondary'}
      px="30px"
      display="flex"
      borderRadius={'xl'}
      onClick={handleEditClick}
    >
      {isEditClicked ? 'Confirm' : 'Edit'}
    </Button>
  );
}
