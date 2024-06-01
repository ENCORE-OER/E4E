import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import IconUpload from '../../../../Icons/IconUpload/IconUpload';
import UnderlinedButton from '../UnderlinedButton';

type PublishLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function PublishLessonPlanButton({
  isDisabled,
}: PublishLessonPlanButtonProps) {
  const { isEditLessonPlanClicked } = useLearningPathDesignContext();
  return (
    <UnderlinedButton
      handleClick={() => console.log('Publish')}
      nameButton="Publish"
      rightIcon={<IconUpload />}
      color="primary"
      fontWeight="normal"
      isDisabled={isDisabled || isEditLessonPlanClicked}
    />
  );
}
