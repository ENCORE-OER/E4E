import IconExport from '../../../../Icons/IconExport/IconExport';
import UnderlinedButton from '../UnderlinedButton';

type ExportLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function ExportLessonPlanButton({
  isDisabled,
}: ExportLessonPlanButtonProps) {
  return (
    <UnderlinedButton
      handleClick={() => console.log('Export')}
      nameButton="Export"
      rightIcon={<IconExport />}
      color="primary"
      fontWeight="normal"
      isDisabled={isDisabled}
    />
  );
}
