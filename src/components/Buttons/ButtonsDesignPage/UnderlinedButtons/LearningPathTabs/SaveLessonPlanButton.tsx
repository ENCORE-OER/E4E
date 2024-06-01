import { FaSave } from 'react-icons/fa';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import UnderlinedButton from '../UnderlinedButton';

type SaveLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function SaveLessonPlanButton({
  isDisabled,
}: SaveLessonPlanButtonProps) {
  const { isEditLessonPlanClicked } = useLearningPathDesignContext();
  return (
    <UnderlinedButton
      handleClick={() => console.log('Save')}
      nameButton="Save"
      rightIcon={<FaSave />}
      color="primary"
      fontWeight="normal"
      isDisabled={isDisabled || isEditLessonPlanClicked}
    />
  );
}
