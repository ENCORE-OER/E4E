import { Flex } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { CustomToast } from '../../../../../utils/Toast/CustomToast';
import UnderlinedButton from '../UnderlinedButton';

type SaveLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function SaveLessonPlanButton({
  isDisabled,
}: SaveLessonPlanButtonProps) {
  const { isEditLessonPlanClicked, editRowIndex, handleSaveLessonPlanClick } = useLearningPathDesignContext();
  const { addToast } = CustomToast();

  const handleClick = () => {
    handleSaveLessonPlanClick();

    addToast({
      message: "Lesson Plan succesfully saved",
      type: "success"
    })
  }

  return (
    <Flex p={1} _hover={{ bg: 'gray.200' }}>
      <UnderlinedButton
        handleClick={handleClick}
        nameButton="Save"
        rightIcon={<FaSave />}
        color="primary"
        fontWeight="normal"
        isDisabled={(!isEditLessonPlanClicked && editRowIndex === null) || isDisabled}
        _hover={{ bg: 'gray.200' }}
      />
    </Flex>
  );
}
