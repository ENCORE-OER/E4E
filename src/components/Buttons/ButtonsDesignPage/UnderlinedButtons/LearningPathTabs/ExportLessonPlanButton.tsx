import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import IconExport from '../../../../Icons/IconExport/IconExport';
import UnderlinedButton from '../UnderlinedButton';

type ExportLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function ExportLessonPlanButton({
  isDisabled,
}: ExportLessonPlanButtonProps) {
  const { isEditLessonPlanClicked } = useLearningPathDesignContext();
  return (
    <UnderlinedButton
      handleClick={() => console.log('Export')}
      nameButton="Export"
      rightIcon={<IconExport />}
      color="primary"
      fontWeight="normal"
      isDisabled={isDisabled || isEditLessonPlanClicked}
    />
  );
}
